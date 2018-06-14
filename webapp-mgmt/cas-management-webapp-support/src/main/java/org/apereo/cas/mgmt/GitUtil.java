package org.apereo.cas.mgmt;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.services.web.beans.Commit;
import org.apereo.cas.mgmt.services.web.beans.History;
import org.eclipse.jgit.api.CreateBranchCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullResult;
import org.eclipse.jgit.api.ResetCommand;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.diff.DiffAlgorithm;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.diff.EditList;
import org.eclipse.jgit.diff.RawText;
import org.eclipse.jgit.diff.RawTextComparator;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.ObjectReader;
import org.eclipse.jgit.lib.PersonIdent;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.merge.MergeStrategy;
import org.eclipse.jgit.notes.Note;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevObject;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.transport.FetchResult;
import org.eclipse.jgit.transport.RefSpec;
import org.eclipse.jgit.treewalk.CanonicalTreeParser;
import org.eclipse.jgit.treewalk.FileTreeIterator;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.treewalk.filter.TreeFilter;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * Utility class used to help with manipulating git repositories.
 *
 * @author Travis Schmidt
 * @since 5.2
 */
@Slf4j
public class GitUtil implements AutoCloseable {

    /**
     * Constant representing length of Object ID to return.
     */
    public static final int NAME_LENGTH = 40;

    private final Git git;

    public GitUtil() {
        this(FileUtils.getTempDirectory(), true);
    }

    @SneakyThrows
    public GitUtil(final File path, final boolean mustExist) {
        this.git = new Git(new FileRepositoryBuilder()
            .setGitDir(path)
            .setMustExist(mustExist)
            .readEnvironment()
            .findGitDir()
            .build());
    }

    /**
     * Returns Commit objects for the last n commits.
     *
     * @param n - number of commits to return
     * @return - List of Commit objects
     * @throws Exception - failed.
     */
    public Stream<RevCommit> getLastNCommits(final int n) throws Exception {
        return StreamSupport.stream(git.log().setMaxCount(n).call().spliterator(), false);
    }

    /**
     * Returns a list of Commits representing all changes since the last time the repo was
     * published.
     *
     * @return - List of Commit objects
     * @throws Exception - failed
     */
    public List<Commit> getUnpublishedCommits() throws Exception {
        final List<Commit> commits = StreamSupport.stream(git.log().addRange(getPublished().getPeeledObjectId(), git.getRepository().resolve("HEAD"))
            .call().spliterator(), false).map(c -> new Commit(c.abbreviate(NAME_LENGTH).name(), c.getFullMessage(), null))
            .collect(Collectors.toList());
        Collections.reverse(commits);
        return commits;
    }

    /**
     * Creates a branch with the passed name and commit id from wich to start the branch.
     *
     * @param branchName - The name of the new branch to create.
     * @param startPoint - The commit from which to start the branch.
     * @throws Exception - failed.
     */
    public void createBranch(final String branchName, final String startPoint) throws Exception {
        git.checkout()
            .setCreateBranch(true)
            .setName(branchName)
            .setUpstreamMode(CreateBranchCommand.SetupUpstreamMode.TRACK)
            .setStartPoint(startPoint)
            .call();
    }

    /**
     * Cherry picks a single commit to be merge in the current branch.
     *
     * @param commit - RevCommit to be included.
     * @throws Exception - failed.
     */
    public void cherryPickCommit(final RevCommit commit) throws Exception {
        git.cherryPick().include(commit).setNoCommit(true).call();
    }

    /**
     * Creates a branch in the remote repository from which the the current git repository was cloned.
     * The branch is created from the commit passed and given the name that is passed in.
     *
     * @param commit     - RevCommit that is to be pushed.
     * @param submitName - The name of the remote branch to be created.
     * @throws Exception - failed.
     */
    public void createPullRequest(final RevCommit commit, final String submitName) throws Exception {
        markAsSubmitted(commit);
        git.push()
            .setRemote("origin")
            .setPushAll()
            .setForce(true)
            .setRefSpecs(new RefSpec("HEAD:refs/heads/" + submitName))
            .call();
    }

    /**
     * Commits all working changes to the repository with the passed commit message.
     *
     * @param user - CasUserProfile of the logged in user.
     * @param msg  - Commit message.
     * @return - RevCommit of the new commit.
     * @throws Exception - failed.
     */
    public RevCommit commit(final CasUserProfile user, final String msg) throws Exception {
        return git.commit()
            .setAll(true)
            .setCommitter(getCommitterId(user))
            .setMessage(msg)
            .call();
    }

    /**
     * Method to commit a single file into the repository.
     *
     * @param user - logged in user
     * @param file - file to commit
     * @param msg  - commit message
     * @return - RevCommit
     * @throws Exception - failed
     */
    public RevCommit commitSingleFile(final CasUserProfile user, final String file, final String msg) throws Exception {
        git.add().addFilepattern(file).call();
        return git.commit()
            .setCommitter(getCommitterId(user))
            .setMessage(msg)
            .call();
    }

    /**
     * Checks out the passed ref to be the current branch of the repository.
     *
     * @param ref - String representing a commit in the repository.
     * @throws Exception - failed.
     */
    public void checkout(final String ref) throws Exception {
        git.checkout()
            .setName(ref)
            .call();
    }

    /**
     * Checks out a single file from a commit in the repository and adds it to the working dir.
     *
     * @param path - Full path to the file.
     * @param ref  - String representing a commit in the repository.
     * @throws Exception - failed.
     */
    public void checkout(final String path, final String ref) throws Exception {
        git.checkout()
            .setStartPoint(ref)
            .addPath(path)
            .call();
    }

    /**
     * Adds unversioned files to be tracked by the repository.
     *
     * @throws Exception - failed.
     */
    public void addWorkingChanges() throws Exception {
        final Status status = git.status().call();
        status.getUntracked()
            .forEach(f -> addFile(f));
    }

    /**
     * Scans the working dir for active changes and returns a list of differences.
     *
     * @return - List of DiffEntry.
     * @throws Exception - failed.
     */
    public List<DiffEntry> scanWorkingDiffs() throws Exception {
        final FileTreeIterator workTreeIterator = new FileTreeIterator(git.getRepository());
        final CanonicalTreeParser oldTreeIter = new CanonicalTreeParser();
        final ObjectReader reader = git.getRepository().newObjectReader();
        oldTreeIter.reset(reader, git.getRepository().resolve("HEAD^{tree}"));
        final DiffFormatter formatter = new DiffFormatter(new ByteArrayOutputStream());
        formatter.setRepository(git.getRepository());
        final List<DiffEntry> diffs = formatter.scan(oldTreeIter, workTreeIterator);
        return diffs;
    }

    /**
     * Returns the content of the file as a String that is represented by the passed object Id
     * as a string.
     *
     * @param id - String representing Id of the object
     * @return - Contents of the object as String.
     * @throws Exception - failed.
     */
    public String readFromWorkingTree(final String id) throws Exception {
        return readFormWorkingTree(ObjectId.fromString(id));
    }

    /**
     * Returns the content of the file as a String that is represented by the passed object id.
     *
     * @param id - ObjectId of the file in the repository
     * @return - Contents of the object as String.
     * @throws Exception - failed.
     */
    public String readFormWorkingTree(final ObjectId id) throws Exception {
        final FileTreeIterator workTreeIterator = new FileTreeIterator(git.getRepository());
        while (!workTreeIterator.eof() && !workTreeIterator.getEntryObjectId().equals(id)) {
            workTreeIterator.next(1);
        }
        return IOUtils.toString(workTreeIterator.openEntryStream(), Charset.defaultCharset());
    }

    /**
     * Returns a RawText representation of a file in the passed repository.  Used in creating diffs.
     *
     * @param repo - The repository to pull the change.
     * @param path - The path to the file.
     * @return - RawText representation of the file.
     * @throws Exception - failed.
     */
    public RawText raw(final Repository repo, final String path) throws Exception {
        final File file = new File(repo.getWorkTree().getAbsolutePath() + '/' + path);
        return new RawText(FileUtils.readFileToByteArray(file));
    }

    /**
     * Returns the file as a String form the repository indexed by the passed String
     * representing its ObjectId.
     *
     * @param id - String id of a file in the repository.
     * @return - File returned as String.
     * @throws Exception - failed.
     */
    public String readObject(final String id) throws Exception {
        return readObject(ObjectId.fromString(id));
    }

    /**
     * Returns the file as a String form the repository indexed by its ObjectId.
     *
     * @param id - ObjectID of the file.
     * @return - File returned as String.
     * @throws Exception - failed.
     */
    @SuppressWarnings("DefaultCharset")
    public String readObject(final ObjectId id) throws Exception {
        final ObjectReader reader = git.getRepository().newObjectReader();
        if (reader.has(id)) {
            return new String(reader.open(id).getBytes());
        } else {
            return readFormWorkingTree(id);
        }
    }

    /**
     * Merges the branch represented by the passed branchId in the current branch.
     *
     * @param branchId - String representation of an ObjectId
     * @throws Exception - failed.
     */
    public void merge(final String branchId) throws Exception {
        git.merge()
            .setCommit(true)
            .include(ObjectId.fromString(branchId))
            .call();
    }

    /**
     * Returns a RevCommit object looked up from the passed string id.
     *
     * @param id - String representing an ObjectID for a RevCommit.
     * @return - RevCommit
     * @throws Exception - failed.
     */
    public RevCommit getCommit(final String id) throws Exception {
        return new RevWalk(git.getRepository())
            .parseCommit(ObjectId.fromString(id));
    }

    /**
     * Appends a note to a commit that already has notes.
     *
     * @param com - RevObject representing the commit to add the note to.
     * @param msg - The note to append.
     * @throws Exception - failed.
     */
    public void appendNote(final RevObject com, final String msg) throws Exception {
        final Note note = note(com);
        final StringBuilder buffer = new StringBuilder();
        if (note != null) {
            final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            git.getRepository().open(note.getData()).copyTo(bytes);
            buffer.append(bytes.toString().concat("\n\n"));
        }
        buffer.append(msg);
        addNote(com, buffer.toString());
        git.close();
    }

    /**
     * Creates a note to a commit.
     *
     * @param com  - the RevObject fo the commit
     * @param note - the note text.
     * @throws Exception - failed.
     */
    public void addNote(final RevObject com, final String note) throws Exception {
        git.notesAdd()
            .setObjectId(com)
            .setMessage(note)
            .call();
    }

    /**
     * Returns the note attached to the commit with the passed id.
     *
     * @param id - String representing a commit id.
     * @return - Note attached to commit.
     * @throws Exception - failed.
     */
    public Note note(final String id) throws Exception {
        return note(getCommit(id));
    }

    /**
     * Returns the Note attached to the passed commit.
     *
     * @param com - RevObject of the commit.
     * @return - Returns Note from the commit.
     * @throws Exception - failed.
     */
    public Note note(final RevObject com) throws Exception {
        return git.notesShow()
            .setObjectId(com)
            .call();
    }

    /**
     * Returns the history of a file in the repository.
     *
     * @param path - the file path
     * @return - List of History objects
     * @throws Exception - failed.
     */
    public List<History> history(final String path) throws Exception {
        return logs(path)
            .map(r -> createHistory(r, path))
            .filter(h -> h != null)
            .collect(Collectors.toList());
    }

    /**
     * Returns the logs for a file in the repository.
     *
     * @param path - The file path.
     * @return - Stream of RevCommits the file is in.
     * @throws Exception - failed.
     */
    public Stream<RevCommit> logs(final String path) throws Exception {
        return StreamSupport.stream(git.log().addPath(path).call().spliterator(), false);
    }

    /**
     * Checks out a file into the working directory.
     *
     * @param path - The file path.
     * @throws Exception - failed.
     */
    public void checkoutFile(final String path) throws Exception {
        git.checkout()
            .addPath(path)
            .call();
    }

    /**
     * Returns the logs for a specified commit.
     *
     * @param com - The commit to retrieive logs for.
     * @return - Stream of RevCommits contained in the passed commit.
     * @throws Exception - failed.
     */
    public Stream<RevCommit> commitLogs(final RevCommit com) throws Exception {
        return StreamSupport.stream(git.log().add(com).call().spliterator(), false);
    }

    /**
     * Peforms a hard reset on the repository to the passed commit.
     *
     * @param reset - the RevCommit to reset the repository to.
     * @throws Exception - failed.
     */
    public void reset(final RevCommit reset) throws Exception {
        git.reset()
            .setRef(reset.abbreviate(NAME_LENGTH).name())
            .setMode(ResetCommand.ResetType.HARD)
            .call();
    }

    /**
     * Creates a History object for the passed file in the passed commit.
     *
     * @param r    - The commit to pull the History from.
     * @param path - The file path.
     * @return - History of the path for the passed commit.
     */
    public History createHistory(final RevCommit r, final String path) {
        try {
            final TreeWalk treeWalk = historyWalk(r, path);
            if (treeWalk.next()) {
                final History history = new History();
                history.setId(treeWalk.getObjectId(0).abbreviate(NAME_LENGTH).name());
                history.setCommit(r.abbreviate(NAME_LENGTH).name());
                history.setPath(treeWalk.getPathString());
                history.setMessage(r.getFullMessage());
                history.setTime(new Date(r.getCommitTime() * 1000L).toString());
                history.setCommitter(r.getCommitterIdent().getName());
                return history;
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    /**
     * Returns a TreeWalk object for the passed commit and file path.
     *
     * @param r    - The commit to start the walk from.
     * @param path - The file path.
     * @return - TreeWalk
     * @throws Exception - failed.
     */
    public TreeWalk historyWalk(final RevCommit r, final String path) throws Exception {
        final TreeWalk treeWalk = new TreeWalk(git.getRepository());
        treeWalk.addTree(r.getTree());
        treeWalk.setFilter(new HistoryTreeFilter(path));
        return treeWalk;
    }

    /**
     * Method adds an untracked file to the git index.
     *
     * @param file - the file.
     */
    @SneakyThrows
    public void addFile(final String file) {
        git.add().addFilepattern(file).call();
    }

    /**
     * Marks a commit as being submitted for a pull request.
     *
     * @param c - The RevObject of the commit to mark as submitted.
     * @throws Exception -failed.
     */
    public void markAsSubmitted(final RevObject c) throws Exception {
        appendNote(c, "SUBMITTED on " + new Date().toString() + "\n    ");
    }

    /**
     * Returns a the Note of a commit as a String.
     *
     * @param com - The RevObkect of the commit to pull the note from.
     * @return - Returns the note text as a String.
     * @throws Exception -failed.
     */
    public String noteText(final RevObject com) throws Exception {
        final Note note = note(com);
        if (note != null) {
            final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
            git.getRepository().open(note.getData()).copyTo(bytes);
            return bytes.toString();
        }
        return "";
    }

    /**
     * Creates a Person Identity to add to the commit.
     *
     * @param user - CasUserProfile of the logged in user.
     * @return - PersonIden object to be added to a commit.
     */
    public static PersonIdent getCommitterId(final CasUserProfile user) {
        final String email = user.getEmail() != null ? user.getEmail() : "mgmt@cas.com";
        return new PersonIdent(user.getId(), email);
    }

    /**
     * Method will tag the current HEAD commit has being the latest published.
     */
    @SneakyThrows
    public void setPublished() {
        git.tagDelete().setTags("published").call();
        git.tag().setName("published").call();
    }

    /**
     * Method returns the Ref to the commit witht the published tag.
     *
     * @return - Ref of the published commit
     */
    public Ref getPublished() {
        try {
            final Ref ref = git.tagList().call().get(0);
            return git.getRepository().peel(ref);
        } catch (final Exception e) {
            return null;
        }
    }

    /**
     * Class used to define a TreeFilter to only pull history for a single path.
     */
    @RequiredArgsConstructor
    public static class HistoryTreeFilter extends TreeFilter {
        private final String path;

        @Override
        public boolean include(final TreeWalk treeWalk) {
            final List<String> pathSplit = Splitter.on("-").splitToList(path);
            final List<String> treePathSplit = Splitter.on("-").splitToList(treeWalk.getPathString());
            return pathSplit.get(pathSplit.size() - 1).equals(treePathSplit.get(treePathSplit.size() - 1));
        }

        @Override
        public boolean shouldBeRecursive() {
            return false;
        }

        @Override
        public TreeFilter clone() {
            return null;
        }

    }

    /**
     * Closes the git repository.
     */
    @Override
    public void close() {
        git.close();
    }

    /**
     * Method to determine if there is not wrapped repository.
     *
     * @return - true if no git repository is present.
     */
    public boolean isNull() {
        return git == null;
    }

    /**
     * Returns a new ObjectReader for the repository.
     *
     * @return - ObjectReader.
     */
    public ObjectReader objectReader() {
        return git.getRepository().newObjectReader();
    }

    /**
     * Returns the root path of the repository.
     *
     * @return -String representing the root directory.
     */
    public String repoPath() {
        return git.getRepository().getDirectory().getParent().toString();
    }

    /**
     * Returns a stream of Branches that are contained in the repository.
     *
     * @return - Stream of Branch Refs
     * @throws Exception - failed.
     */
    public Stream<Ref> branches() throws Exception {
        return git.branchList().call().stream();
    }

    /**
     * Returns the repository wrapped by this utility.
     *
     * @return - Git repository.
     */
    public Git getGit() {
        return git;
    }

    /**
     * Pulls the text form a Note object and writes it to the passes Outputstream.
     *
     * @param note   - The Note contained in the repository to read.
     * @param output - The stream to ouput the note text.
     * @throws Exception - failed.
     */
    public void writeNote(final Note note, final OutputStream output) throws Exception {
        git.getRepository().open(note.getData()).copyTo(output);
    }

    /**
     * Pulls changes form the default remote repository into the wrapped repository.
     *
     * @throws Exception - failed.
     */
    public void pull() throws Exception {
        git.pull().call();
    }

    /**
     * Fetches changed form the default remote repository into the wrapped repository.
     *
     * @throws Exception - failed.
     */
    public void fetch() throws Exception {
        git.fetch().call();
    }

    /**
     * Returns a BranchMap for the commit passed as a Ref.
     *
     * @param r - Ref commit to generate the BranchMap for.
     * @return - BranchMap.
     */
    public BranchMap mapBranches(final Ref r) {
        try {
            final RevWalk revWalk = new RevWalk(git.getRepository());
            return new BranchMap(this, r, revWalk.parseCommit(git.getRepository().resolve(r.getName())));
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    /**
     * Returns a list fo differences between the last two commits in a branch.
     *
     * @param branch - The branch to check for differences against.
     * @return - List of DiffEntry.
     * @throws Exception - failed.
     */
    public List<DiffEntry> getDiffs(final String branch) throws Exception {
        final CanonicalTreeParser oldTreeIter = new CanonicalTreeParser();
        final ObjectReader reader = git.getRepository().newObjectReader();
        oldTreeIter.reset(reader, git.getRepository().resolve(branch + "~1^{tree}"));
        final CanonicalTreeParser newTreeIter = new CanonicalTreeParser();
        newTreeIter.reset(reader, git.getRepository().resolve(branch + "^{tree}"));
        return git.diff().setOldTree(oldTreeIter).setNewTree(newTreeIter).call();
    }

    /**
     * Returns a list fo differences between the last two commits in a branch.
     *
     * @param branch - The branch to check for differences against.
     * @return - List of DiffEntry.
     * @throws Exception - failed.
     */
    public List<DiffEntry> getDiffsToRevert(final String branch) throws Exception {
        final CanonicalTreeParser oldTreeIter = new CanonicalTreeParser();
        final ObjectReader reader = git.getRepository().newObjectReader();
        oldTreeIter.reset(reader, git.getRepository().resolve(branch + "^{tree}"));
        final CanonicalTreeParser newTreeIter = new CanonicalTreeParser();
        newTreeIter.reset(reader, git.getRepository().resolve(branch + "~1^{tree}"));
        return git.diff().setOldTree(oldTreeIter).setNewTree(newTreeIter).call();
    }

    /**
     * Overloaded method to return a formatted diff by using two ObjectIds.
     *
     * @param oldId - ObjectId.
     * @param newId - ObectId.
     * @return - Formatted diff in a byte[].
     * @throws Exception -failed.
     */
    public byte[] getFormatter(final ObjectId oldId, final ObjectId newId) throws Exception {
        return getFormatter(rawText(oldId), rawText(newId));
    }

    /**
     * Overloaded method to return a formatted diff by using a RawText and an ObjectId.
     *
     * @param oldText - RawText.
     * @param newId   - ObjectId.
     * @return - Formatted diff in a byte[].
     * @throws Exception -failed.
     */
    public byte[] getFormatter(final RawText oldText, final ObjectId newId) throws Exception {
        return getFormatter(oldText, rawText(newId));
    }

    /**
     * Overloaded method to return a formatted diff by using a RawText and an ObjectId.
     *
     * @param oldId   - ObjectId.
     * @param newText - RawText.
     * @return - Formatted diff in a byte[].
     * @throws Exception - failed.
     */
    public byte[] getFormatter(final ObjectId oldId, final RawText newText) throws Exception {
        return getFormatter(rawText(oldId), newText);
    }

    /**
     * Compares the RawText of two files and creates a formateted diff to return.
     *
     * @param oldText - RawText.
     * @param newText - RawText.
     * @return - Formatted diff in a byte[].
     * @throws Exception -failed.
     */
    public byte[] getFormatter(final RawText oldText, final RawText newText) throws Exception {
        final DiffAlgorithm diffAlgorithm = DiffAlgorithm.getAlgorithm(
            git.getRepository().getConfig().getEnum("diff",
                null, "algorithm", DiffAlgorithm.SupportedAlgorithm.HISTOGRAM));
        final EditList editList = diffAlgorithm.diff(RawTextComparator.DEFAULT, oldText, newText);
        final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        final DiffFormatter df = new DiffFormatter(bytes);
        df.setRepository(git.getRepository());
        df.format(editList, oldText, newText);
        df.flush();
        return bytes.toByteArray();
    }

    /**
     * Returns the RawText of file specified by ObjectId.
     *
     * @param id - ObjectId of a file.
     * @return - RawText.
     * @throws Exception - failed.
     */
    @SuppressWarnings("DefaultCharset")
    public RawText rawText(final ObjectId id) throws Exception {
        if (objectReader().has(id)) {
            return new RawText(objectReader().open(id).getBytes());
        } else {
            return new RawText(readFormWorkingTree(id).getBytes());
        }
    }

    /**
     * Returns the RawText of a file specified by its path.
     *
     * @param path - File path.
     * @return - RawText.
     * @throws Exception - failed.
     */
    public RawText rawText(final String path) throws Exception {
        final File file = new File(git.getRepository().getWorkTree().getAbsolutePath() + '/' + path);
        return new RawText(FileUtils.readFileToByteArray(file));
    }

    /**
     * Returns the last commit before the commit that was submitted as a pull request.
     *
     * @param branchName - Name given to the branch when submitted.
     * @return - RevCommit of the previous commit.
     * @throws Exception - failed.
     */
    public RevCommit findCommitBeforeSubmit(final String branchName) throws Exception {
        final RevCommit com = findSubmitCommit(branchName);
        final RevCommit before = commitLogs(com).skip(1).findFirst().get();
        return before;
    }

    /**
     * Returns the commit used to submit the pull request.
     *
     * @param branchName - Name given to the branch when submitted.
     * @return - RevCommit used to submit the pull request.
     * @throws Exception - failed.
     */
    public RevCommit findSubmitCommit(final String branchName) throws Exception {
        return git.branchList().call().stream()
            .map(r -> mapBranches(r))
            .filter(r -> r.getRef().getName().contains(Iterables.get(Splitter.on('_').split(branchName), 1)))
            .findFirst().get().revCommit;
    }

    /**
     * Marks a pull request as being reverted by the person who submitted it.
     *
     * @param branch - Ref of the branch to revert.
     * @param user   - CasUserProfile of the logged in user.
     * @throws Exception - failed.
     */
    public void markAsReverted(final String branch, final CasUserProfile user) throws Exception {
        final RevWalk revWalk = new RevWalk(git.getRepository());
        final RevCommit com = revWalk.parseCommit(git.getRepository().resolve(branch));
        final String msg = "REVERTED by " + user.getId() + " on " + new Date().toString() + "\n    ";
        appendNote(com, msg);
    }

    /**
     * Rebases the wrapped repository to the remote it was created form.
     *
     * @return self
     */
    public GitUtil rebase() {
        try {
            if (checkMaster()) {
                attemptRebase().stream().forEach(this::resolveConflict);
            }
        } catch (final Exception e) {
            LOGGER.error("Error Rebasing git ", e);
        } finally {
            git.close();
        }
        return this;
    }

    private boolean checkMaster() throws Exception {
        final FetchResult fr = git.fetch().setDryRun(true).call();
        git.close();
        return !fr.getTrackingRefUpdates().isEmpty();
    }

    private Collection<String> attemptRebase() throws Exception {
        final Collection<String> conflicts = new HashSet<>();
        createStashIfNeeded();
        final PullResult pr = git.pull().setStrategy(MergeStrategy.RESOLVE).setRebase(true).call();
        if (pr.getRebaseResult().getConflicts() != null) {
            conflicts.addAll(pr.getRebaseResult().getConflicts());
        }
        conflicts.addAll(applyStashIfNeeded());
        return conflicts;
    }

    private void resolveConflict(final String path) {
        try {
            git.reset().addPath(path).call();
            git.checkout().addPath(path).call();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private void createStashIfNeeded() throws Exception {
        if (!git.status().call().isClean()) {
            git.stashCreate().call();
        }
    }

    private Collection<String> applyStashIfNeeded() throws Exception {
        if (!git.stashList().call().isEmpty()) {
            try {
                git.stashApply().call();
            } catch (final Exception e) {
                final Set<String> conflicts = git.status().call().getConflicting();
                git.close();
                return conflicts;
            }
        }
        return new HashSet<>();
    }

    /**
     * Method determines if a branch has been rejected by an admin.
     *
     * @param com - RevObject of the commit.
     * @return - trues if commit is marked as rejected.
     */
    public boolean isRejected(final RevObject com) {
        try {
            return noteText(com).contains("REJECTED");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return false;
    }

    /**
     * Method determines if a branch has been rejected by an admin.
     *
     * @param com - RevObject of the commit.
     * @return - true if the commit is marked as reverted.
     */
    public boolean isReverted(final RevObject com) {
        try {
            return noteText(com).contains("REVERTED");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return false;
    }

    /**
     * Method determines if a branch has been accepted by an admin.
     *
     * @param com - RevObject of the commit.
     * @return - true if the commit is marked as accpeted.
     */
    public boolean isAccepted(final RevObject com) {
        try {
            return noteText(com).contains("ACCEPTED");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return false;
    }

    /**
     * Checks if the repository contains any deleted files in working directory that have not been committed.
     *
     * @return - Stream of DiffEntry
     * @throws Exception - failed.
     */
    public Stream<DiffEntry> checkForDeletes() throws Exception {
        final FileTreeIterator workTreeIterator = new FileTreeIterator(git.getRepository());
        final CanonicalTreeParser oldTreeIter = new CanonicalTreeParser();
        final ObjectReader reader = git.getRepository().newObjectReader();
        oldTreeIter.reset(reader, git.getRepository().resolve("HEAD^{tree}"));
        final DiffFormatter formatter = new DiffFormatter(new ByteArrayOutputStream());
        formatter.setRepository(git.getRepository());
        return formatter.scan(oldTreeIter, workTreeIterator).stream()
            .filter(d -> d.getChangeType() == DiffEntry.ChangeType.DELETE);
    }

    /**
     * This methods moves the file when it has been renamed.
     *
     * @param oldName - the old name
     * @param newName - the new mame
     * @throws Exception - failed.
     */
    public void move(final String oldName, final String newName) throws Exception {
        Files.move(Paths.get(repoPath() + '/' + oldName),
            Paths.get(repoPath() + '/' + newName));
        git.add().addFilepattern(newName).call();
        git.rm().addFilepattern(oldName).call();
    }

    /**
     * Object used to represent the history of a branch.
     */
    @RequiredArgsConstructor
    @Getter
    @Setter
    public static class BranchMap {
        private Ref ref;
        private RevCommit revCommit;
        private final GitUtil git;

        public BranchMap(final GitUtil git, final Ref ref, final RevCommit revCommit) {
            this(git);
            this.ref = ref;
            this.revCommit = revCommit;
        }

        public String getName() {
            return ref.getName();
        }

        public String getFullMessage() {
            return revCommit.getFullMessage();
        }

        public String getCommitter() {
            return revCommit.getCommitterIdent().getName();
        }

        public int getCommitTime() {
            return revCommit.getCommitTime();
        }

        public String getId() {
            return revCommit.abbreviate(NAME_LENGTH).name();
        }

        public boolean isAccepted() {
            return git.isAccepted(revCommit);
        }

        public boolean isRejected() {
            return git.isRejected(revCommit);
        }

        public boolean isReverted() {
            return git.isReverted(revCommit);
        }
    }
}
