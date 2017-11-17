package org.apereo.cas.mgmt.services.web;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.web.beans.BranchActionData;
import org.apereo.cas.mgmt.services.web.beans.BranchData;
import org.apereo.cas.mgmt.services.web.beans.CNote;
import org.apereo.cas.mgmt.services.web.beans.Change;
import org.apereo.cas.mgmt.services.web.beans.Commit;
import org.apereo.cas.mgmt.services.web.beans.Diff;
import org.apereo.cas.mgmt.services.web.beans.History;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.notes.Note;
import org.eclipse.jgit.revwalk.RevCommit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Controller the provides endpoints for using the Git workflow.
 *
 * @author Travis Schmidt
 * @since 5.2
 */
@Controller("publish")
public class ServiceRepsositoryController {

    private static final Pattern DOAMIN_PATTERN = Pattern.compile("^https?://([^:/]+)");

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private ServicesManager servicesManager;

    private RepositoryFactory repositoryFactory;

    private CasUserProfileFactory casUserProfileFactory;

    private final ManagerFactory managerFactory;

    public ServiceRepsositoryController(
            final RepositoryFactory repositoryFactory,
            final ManagerFactory managerFactory,
            final CasUserProfileFactory casUserProfileFactory) {
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
        this.casUserProfileFactory = casUserProfileFactory;
    }

    /**
     * Method commits all modified and untracked work in the working tree.
     *
     * @param response - HttpServletResponse.
     * @param request  - HttpServletRequest.
     * @param msg      - Commit msg entered by the user.
     * @return - ResponseEntity
     * @throws Exception - failed.
     */
    @GetMapping(value = "/commit")
    public ResponseEntity<String> commit(final HttpServletResponse response, final HttpServletRequest request,
                                         @RequestParam final String msg) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        final GitUtil git = repositoryFactory.from(user);
        if (git.isNull()) {
            throw new Exception("No changes to commit");
        }
        git.addWorkingChanges();
        git.commit(user, msg);
        git.close();
        return new ResponseEntity<String>("Changes committed", HttpStatus.OK);
    }

    /**
     * Method will pull the services-repo to the published-repo and then execute the script to sync with all CAS nodes.
     *
     * @param response - HttpServletResponse.
     * @param request  - HttpServletRequest.
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "/publish")
    public ResponseEntity<String> publish(final HttpServletResponse response, final HttpServletRequest request) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }
        final GitUtil git = repositoryFactory.masterRepository();
        git.getUnpublishedCommits().forEach(commit -> {
            try {
                git.getDiffs(commit.getId()).forEach(l -> {
                    final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
                    if (l.getChangeType() == DiffEntry.ChangeType.DELETE) {
                        try {
                            this.servicesManager.delete(ser.from(git.readObject(l.getOldId().toObjectId())).getId());
                        } catch (final Exception e) {
                        }
                    } else {
                        try {
                            this.servicesManager.save(ser.from(git.readObject(l.getNewId().toObjectId())));
                        } catch (final Exception e) {
                        }
                    }
                });
            } catch (final Exception e) {
            }
        });
        git.setPublished();
        runSyncScript();
        return new ResponseEntity<>("Services published", HttpStatus.OK);
    }

    /**
     * If a syncScript is configured it will be executed.
     *
     * @throws Exception - failed.
     */
    private void runSyncScript() throws Exception {
        if (casProperties.getMgmt().getSyncScript() != null) {
            final int status = Runtime.getRuntime().exec(casProperties.getMgmt().getSyncScript()).waitFor();
            if (status > 0) {
                throw new Exception("Services Sync Failed");
            }
        }
    }

    /**
     * Method returns a list of commits that have not been published to CAS Servers.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return ResponseEntity
     * @throws Exception - failed.
     */
    @GetMapping(value = "/commitList")
    public ResponseEntity<List<Commit>> commits(final HttpServletRequest request,
                                                final HttpServletResponse response) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }

        final int behind = getPublishBehindCount();
        final GitUtil git = repositoryFactory.masterRepository();
        final List<Commit> commits = git.getLastNCommits(behind);
        git.close();
        return new ResponseEntity<List<Commit>>(commits, HttpStatus.OK);
    }

    /**
     * Returns the number of commits the published-repo is behind.
     *
     * @return - count of commits behind.
     * @throws Exception - failed.
     */
    private int getPublishBehindCount() throws Exception {
        final GitUtil git = repositoryFactory.masterRepository();
        return git.getGit().getRepository().resolve("HEAD").equals(git.getPublished().getPeeledObjectId()) ? 0 : 1;
    }

    /**
     * Method commits the working dir of the user and creates a submit branch that is made into a pull request.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param msg      - message from user
     * @return ResponseEntity
     * @throws Exception - failed.
     */
    @PostMapping(value = "/submit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> submitPull(final HttpServletResponse response,
                                             final HttpServletRequest request,
                                             final @RequestBody String msg) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        final GitUtil git = repositoryFactory.from(user);
        if (git.isNull()) {
            throw new Exception("No changes to submit");
        }
        final long timestamp = new Date().getTime();
        final String branchName = "submit-" + timestamp;
        final String submitName = user.getId() + "_" + timestamp;

        git.addWorkingChanges();
        final RevCommit commit = git.commit(user, msg);
        git.createBranch(branchName, "origin/master");
        git.cherryPickCommit(commit);
        git.commit(user, msg);
        git.createPullRequest(commit, submitName);
        git.checkout("master");
        //mailUtil.sendSubmitMessage(submitName,createDiffs(submitName),user);
        git.close();

        return new ResponseEntity<>("Request Submitted", HttpStatus.OK);
    }

    /**
     * Returns a list of Diffs of what is committed in services-repo to what is committed
     * in the passed ref.
     *
     * @param ref - Commit Ref
     * @return - List of Diff
     * @throws Exception - failed.
     */
    private List<Diff> createDiffs(final String ref) throws Exception {
        return repositoryFactory.masterRepository().getDiffs("refs/heads/" + ref).stream()
                .map(this::createDiff)
                .collect(Collectors.toList());
    }

    /**
     * Method returns a list of changes to the client of work that has not been committed to the repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @return ResponseEntity
     * @throws Exception - failed.
     */
    @GetMapping(value = "/untracked")
    public ResponseEntity<List<Change>> untracked(final HttpServletResponse response,
                                                  final HttpServletRequest request) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        if (git.isNull()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        final List<Change> changes = git.scanWorkingDiffs().stream()
                .map(d -> createChange(d, git))
                .collect(Collectors.toList());
        return new ResponseEntity<>(changes, HttpStatus.OK);
    }

    /**
     * Method that returns to the client a count of how many commits the published repo is behind the services-repo.
     *
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "/unpublished")
    public ResponseEntity<Integer> unpublished() throws Exception {
        return new ResponseEntity<>(getPublishBehindCount(), HttpStatus.OK);
    }

    /**
     * Method will create a list of branches that have been submitted by users to be merged into the services-repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpsServletRequest
     * @param options  - List of Branch statuses filter the returned branches by
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @PostMapping(value = "/pullRequests", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BranchData>> branches(final HttpServletResponse response,
                                                     final HttpServletRequest request,
                                                     final @RequestBody boolean[] options) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }
        final GitUtil git = repositoryFactory.masterRepository();
        final List<BranchData> names = git.branches()
                .map(git::mapBranches)
                .filter(r -> filterPulls(r, options))
                .map(r -> createBranch(r))
                .collect(Collectors.toList());

        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    /**
     * Method will filter refs to only the statuses on Options.
     *
     * @param r       - BranchMap
     * @param options - 0:Submitted, 1:Accepted, 2:Rejected
     * @return - true of the pull should be included
     */
    private boolean filterPulls(final GitUtil.BranchMap r, final boolean[] options) {
        if (r.getName().equals("refs/heads/master")) {
            return false;
        }
        if (r.isAccepted()) {
            return options[1];
        }
        if (r.isRejected()) {
            return options[2];
        }
        return options[0];
    }

    /**
     * Method will create and return a list of branches that have been submitted as pull request by users.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "/submitRequests")
    public ResponseEntity<List<BranchData>> submits(final HttpServletRequest request,
                                                    final HttpServletResponse response) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        final GitUtil git = repositoryFactory.masterRepository();

        final List<BranchData> names = git.branches()
                .filter(r -> r.getName().contains("/" + user.getId() + "_"))
                .map(git::mapBranches)
                .map(r -> createBranch(r))
                .collect(Collectors.toList());
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    /**
     * Method that will create a list of Diff objects to be returned to the client detailing the changes between the
     * submitted branch and the current state of the services-repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param branch   - name of branch submitted
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "/changes")
    public ResponseEntity<List<Diff>> changes(final HttpServletResponse response,
                                              final HttpServletRequest request,
                                              @RequestParam("branch") final String branch) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

        final GitUtil git = repositoryFactory.masterRepository();
        final List<Diff> changes = git.getDiffs(branch).stream()
                .map(this::createDiff)
                .collect(Collectors.toList());
        git.close();
        return new ResponseEntity<>(changes, HttpStatus.OK);
    }

    /**
     * Method returns a String representation in diff format for the changes between the submitted file and what is
     * currently in the services-repo.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param ids      - Array of ids to compare
     * @throws Exception - failed
     */
    @PostMapping(value = "/viewDiff", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void viewDiff(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @RequestBody String[] ids) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        final ObjectId oldId = ObjectId.fromString(ids[0]);
        final ObjectId newId = ObjectId.fromString(ids[1]);
        response.getOutputStream().write(git.getFormatter(oldId, newId));
    }

    /**
     * Method returns a RegisteredService instance of the the submitted service that it can be viewed in the
     * online form before being accepted by an admin.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param id       - id of service
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "/viewChange")
    public ResponseEntity<RegisteredService> viewChange(final HttpServletResponse response,
                                                        final HttpServletRequest request,
                                                        final @RequestParam String id) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        return new ResponseEntity<>(new DefaultRegisteredServiceJsonSerializer().from(git.readObject(id)), HttpStatus.OK);
    }

    /**
     * Method will return a previous version of a service in HJson.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id - String representing file in git repo
     * @return - String representing service version in HJson
     * @throws Exception - failed
     */
    @GetMapping("/viewJSON")
    public ResponseEntity<String> viewJSON(final HttpServletRequest request,
                                           final HttpServletResponse response,
                                           final @RequestParam String id) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        return new ResponseEntity<String>(git.readObject(id), HttpStatus.OK);
    }

    /**
     * Method will return a previous version of the services in Yaml.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id - String representing id of the file in git repo
     * @return - String representing the verison of the service in Yaml
     * @throws Exception - failed
     */
    @GetMapping("/viewYaml")
    public ResponseEntity<String> viewYaml(final HttpServletRequest request,
                                           final HttpServletResponse response,
                                           final @RequestParam String id) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        final DefaultRegisteredServiceJsonSerializer jsonSerializer = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService service = jsonSerializer.from(git.readObject(id));
        final RegisteredServiceYamlSerializer yamlSerializer = new RegisteredServiceYamlSerializer();
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        yamlSerializer.to(output, service);
        return new ResponseEntity<String>(output.toString(), HttpStatus.OK);
    }


    /**
     * Method will merge the submitted pull request into the services-repo.
     *
     * @param request   - HttpServletRequest
     * @param response  - HttpServletResponse
     * @param acception - BranchActionData
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @PostMapping(value = "/acceptBranch", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> acceptChange(final HttpServletRequest request,
                                               final HttpServletResponse response,
                                               final @RequestBody BranchActionData acception) throws Exception {
        final BranchData branch = acception.getBranch();
        final String text = acception.getNote();
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

        final GitUtil git = repositoryFactory.masterRepository();
        git.merge(branch.getId());
        final RevCommit com = git.getCommit(branch.getId());
        final String msg = "ACCEPTED by " + user.getId() + " on " + new Date().toString() + "\n    "
                + text.replaceAll("\\n", "\n    ");
        git.appendNote(com, msg);
        //mailUtil.sendAcceptMessage(branch.getName().split("/")[2], com.getCommitterIdent().getEmailAddress());
        return new ResponseEntity<>("Branch Merged", HttpStatus.OK);
    }

    /**
     * Method will mark the submitted pull request as being rejected by an admin.
     *
     * @param request   - HttpServletRequest
     * @param response  - HttpServletResponse
     * @param rejection - BranchActionData
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @PostMapping(value = "/rejectBranch", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> rejectChange(final HttpServletRequest request,
                                               final HttpServletResponse response,
                                               final @RequestBody BranchActionData rejection) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

        final BranchData branch = rejection.getBranch();
        final String text = rejection.getNote();
        final GitUtil git = repositoryFactory.masterRepository();
        final RevCommit com = git.getCommit(branch.getId());
        final String msg = "REJECTED by " + user.getId() + " on " + new Date().toString() + "\n    "
                + text.replaceAll("\\n", "\n    ");
        git.appendNote(com, msg);
        //mailUtil.sendRejectMessage(branch.getName().split("/")[2], text, com.getCommitterIdent().getEmailAddress());
        return new ResponseEntity<String>("Branch Rejected", HttpStatus.OK);
    }

    /**
     * Method will return all notes that have been added to a submit request.
     *
     * @param response - HttpServletResponse
     * @param id       - id of note
     * @throws Exception - failed
     */
    @GetMapping(value = "/notes")
    public void getNotes(final HttpServletResponse response, final @RequestParam String id) throws Exception {
        final GitUtil git = repositoryFactory.masterRepository();

        final Note note = git.note(id);
        if (note != null) {
            git.writeNote(note, response.getOutputStream());
        }
        git.close();
    }

    /**
     * Method will add the supplied note from the client to the submit request in the repo.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param cnote    - CNote
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @PostMapping(value = "/addNote", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNote(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          final @RequestBody CNote cnote) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }
        final GitUtil git = repositoryFactory.masterRepository();
        final RevCommit com = git.getCommit(cnote.getId());
        final String msg = user.getId() + " - " + new Date().toString() + " : \n    "
                + cnote.getText().replaceAll("\\n", "\n    ");
        git.appendNote(com, msg);
        return new ResponseEntity<>("Note Added", HttpStatus.OK);
    }

    /**
     * Method will return a complete history of commits for a given file.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of file
     * @return - Lost of History
     * @throws Exception - failed
     */
    @GetMapping(value = "/history")
    public ResponseEntity<List<History>> history(final HttpServletRequest request,
                                                 final HttpServletResponse response,
                                                 final @RequestParam String path) throws Exception {
        GitUtil git = repositoryFactory.from(request, response);
        if (git.isNull()) {
            git = repositoryFactory.masterRepository();
        }

        final List<History> history = git.history(path);
        git.close();
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    /**
     * Method will revert a file by checking it out and overwritting the working dir.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of the file
     * @return status
     * @throws Exception - failed
     */
    @GetMapping(value = "/revert")
    public ResponseEntity<String> revert(final HttpServletRequest request,
                                         final HttpServletResponse response,
                                         final @RequestParam String path) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        if (git.isNull()) {
            throw new Exception("No changes to revert");
        }

        git.checkoutFile(path);
        git.close();
        return new ResponseEntity<>("File Reverted", HttpStatus.OK);
    }

    /**
     * Method will restore a deleted file to the working dir.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of the file
     * @return - status message
     * @throws Exception - failed
     */
    @GetMapping(value = "/revertDelete")
    public ResponseEntity<String> revertDelete(final HttpServletRequest request,
                                               final HttpServletResponse response,
                                               final @RequestParam String path) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        final GitUtil git = repositoryFactory.from(user);
        if (git.isNull()) {
            throw new Exception("No changes to revert");
        }
        final ServicesManager manager = managerFactory.from(request, user);
        insertService(git, path, manager);
        git.checkoutFile(path);
        return new ResponseEntity<>("File Reverted", HttpStatus.OK);
    }

    /**
     * Method will checkout a file from a specific commit.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - Id of the commit to checkout the file from
     * @param path     - path of the file
     * @return - status message
     * @throws Exception - failed
     */
    @GetMapping(value = "/checkout")
    public ResponseEntity<String> checkout(final HttpServletRequest request,
                                           final HttpServletResponse response,
                                           final @RequestParam String id,
                                           final @RequestParam String path) throws Exception {
        final GitUtil git = repositoryFactory.from(request, response);
        git.checkout(path, id);
        git.getGit().reset().addPath(path).call();
        git.close();
        return new ResponseEntity<>("File Checked Out", HttpStatus.OK);
    }

    /**
     * Restores a service into the service from at its original location.
     *
     * @param git     - GitUtil
     * @param path    - path of the file
     * @param manager - ServicesManager
     * @throws Exception - failed
     */
    private void insertService(final GitUtil git, final String path, final ServicesManager manager) throws Exception {
        final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService svc = ser.from(git.readObject(git.history(path).get(0).getId()));
        final String domain = getDomain(svc.getServiceId());
        //from.insertService(domain,svc.getEvaluationOrder());
    }

    /**
     * Method will revert a submitted pull request from a user's repository if it has been rejected by an admin.
     *
     * @param request    - HttpServletRequest
     * @param response   - HttpServletResponse
     * @param branchName - Name of the pull requet
     * @return - status message
     * @throws Exception - failed
     */
    @GetMapping(value = "/revertSubmit")
    public ResponseEntity<String> revertSubmit(final HttpServletRequest request,
                                               final HttpServletResponse response,
                                               final @RequestParam String branchName) throws Exception {
        final CasUserProfile user = casUserProfileFactory.from(request, response);
        final GitUtil git = repositoryFactory.from(user);
        if (git.isNull()) {
            throw new Exception("No changes to revert");
        }

        git.reset(git.findCommitBeforeSubmit(branchName));
        git.close();
        repositoryFactory.masterRepository().markAsReverted(branchName, user);
        return new ResponseEntity<>("Submit reverted", HttpStatus.OK);
    }

    /**
     * Method creates a branch object to be returned to the client.
     *
     * @param r - BranchMap
     * @return - BranchData
     */
    private BranchData createBranch(final GitUtil.BranchMap r) {
        final BranchData branch = new BranchData();
        branch.setName(r.getName());
        branch.setMsg(r.getFullMessage());
        branch.setCommitter(r.getCommitter());
        branch.setTime(r.getCommitTime());
        branch.setAccepted(r.isAccepted());
        branch.setId(r.getId());
        branch.setRejected(r.isRejected());
        branch.setReverted(r.isReverted());
        return branch;
    }

    /**
     * Factory method used to create a Change object to be returned to the client.
     *
     * @param entry - DiffEntry
     * @param git   - GitUtil
     * @return - Change
     */
    private Change createChange(final DiffEntry entry, final GitUtil git) {
        try {
            if (entry.getChangeType() == DiffEntry.ChangeType.DELETE) {
                return createDeleteChange(git, entry);
            } else {
                return createModifyChange(git, entry);
            }
        } catch (final Exception e) {
        }
        return null;
    }

    /**
     * Creates a change for a delete file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change.
     * @return - Change
     * @throws Exception - failed
     */
    private Change createDeleteChange(final GitUtil git, final DiffEntry entry) throws Exception {
        final String json = git.readObject(entry.getOldId().toObjectId());
        final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService svc = ser.from(json);
        return new Change(String.valueOf(svc.getId()),
                entry.getOldPath(),
                DiffEntry.ChangeType.DELETE.toString(),
                svc.getName(),
                ObjectId.toString(entry.getOldId().toObjectId()),
                null);
    }

    /**
     * Creates a change for a modified file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change
     * @return - Change
     * @throws Exception - failed
     */
    private Change createModifyChange(final GitUtil git, final DiffEntry entry) throws Exception {
        final String file = git.repoPath() + "/" + entry.getNewPath();
        final String json = new String(Files.readAllBytes(Paths.get(file)));
        final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService svc = ser.from(json);
        return new Change(String.valueOf(svc.getId()),
                entry.getNewPath(),
                entry.getChangeType().toString(),
                svc.getName(),
                ObjectId.toString(entry.getOldId().toObjectId()),
                ObjectId.toString(entry.getNewId().toObjectId()));
    }

    /**
     * Method creates a diff object to be returned to the client.
     *
     * @param d - DiffEntry
     * @return - Diff
     */
    private Diff createDiff(final DiffEntry d) {
        return new Diff(d.getNewPath(),
                d.getOldId().toObjectId(),
                d.getNewId().toObjectId(),
                d.getChangeType().toString());
    }

    /**
     * Pulls the domain for the service url.
     *
     * @param service - Service url string
     * @return - domain extracted
     */
    private String getDomain(final String service) {
        final Matcher match = DOAMIN_PATTERN.matcher(service.toLowerCase());
        return match.lookingAt() && !match.group(1).contains("*") ? match.group(1) : "default";
    }
}
