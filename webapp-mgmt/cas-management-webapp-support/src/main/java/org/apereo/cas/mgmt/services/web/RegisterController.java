package org.apereo.cas.mgmt.services.web;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.services.AbstractRegisteredService;
import org.apereo.cas.services.DefaultRegisteredServiceExpirationPolicy;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.RegisteredServiceContact;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.joda.time.LocalDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

/**
 * Class will handle requests from the register endpoint.
 *
 * @author Travis Schmidt
 */
@Controller
public class RegisterController {

    private static final String STATUS = "status";

    final private CasUserProfileFactory casUserProfileFactory;
    final private ManagerFactory managerFactory;
    final private ServicesManager published;
    final private CasConfigurationProperties casProperties;

    public RegisterController(final CasUserProfileFactory casUserProfileFactory,
                              final ManagerFactory managerFactory,
                              final ServicesManager published,
                              final CasConfigurationProperties casProperties) {
        this.casUserProfileFactory = casUserProfileFactory;
        this.managerFactory = managerFactory;
        this.published = published;
        this.casProperties = casProperties;
    }

    /**
     * Mapped method to return the register.html.
     *
     * @param response - HttpServletResponse
     * @return - ModelAndView
     */
    @GetMapping("/register.html")
    public ModelAndView manage(final HttpServletResponse response) {
        final Map<String, Object> model = new HashMap<>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        return new ModelAndView("register", model);
    }

    /**
     * Mapped method that accepts a submitted service by end user and adds is to Submissions queue.
     *
     * @param response - the response
     * @param request - the request
     * @param service - the Service to be submitted
     * @return - status
     * @throws Exception - failed
     */
    @PostMapping(value="submit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> submit(final HttpServletResponse response,
                                         final HttpServletRequest request,
                                         @RequestBody final RegisteredService service) throws Exception {
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final Path path = Paths.get(casProperties.getMgmt().getSubmitDir() + "/submit-"+new Date().getTime()+".json");
        serializer.to(Files.newOutputStream(path), service);
        return new ResponseEntity<>("Service submitted", HttpStatus.OK);
    }

    /**
     * Mapped method to handle updating a service submitted by a user.
     *
     * @param response - the response
     * @param request - the request
     * @param service - the Service to update
     * @return - status
     * @throws Exception - failed
     */
    @PostMapping(value="registerSave", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerSave(final HttpServletResponse response,
                                               final HttpServletRequest request,
                                               @RequestBody final RegisteredService service) throws Exception {
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final Path path = Paths.get(casProperties.getMgmt().getSubmitDir() + "/edit-" + service.getId() + ".json");
        serializer.to(Files.newOutputStream(path), service);
        return new ResponseEntity<>("Service Saved", HttpStatus.OK);
    }

    /**
     * Mapped method to return a list of services where the logged on user is currently a contact.
     *
     * @param response - the response
     * @param request - the request
     * @return - List of RegisteredServiceItems
     * @throws Exception - failed
     */
    @GetMapping("getRegisterServices")
    public ResponseEntity<List<RegisteredServiceItem>> getRegisterServices(final HttpServletResponse response,
                                                                           final HttpServletRequest request) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        final String email = casUserProfile.getEmail();
        final GitServicesManager manager = managerFactory.master();
        final List<RegisteredServiceItem> svcs = manager.getAllServices().stream()
                .filter(s -> s.getContacts().stream()
                        .anyMatch(c -> email.equals(c.getEmail())))
                .map(s -> manager.createServiceItem(s))
                .collect(toList());
        return new ResponseEntity<>(svcs, HttpStatus.OK);
    }

    /**
     * Mapped method that returns the RegisteredService by the passed Id form the master repo.
     *
     * @param response - the response
     * @param request - the request
     * @param id - assigned id of the service
     * @return - the requested RegisteredService
     * @throws Exception - failed
     */
    @GetMapping("getRegisterService")
    public ResponseEntity<RegisteredService> getRegisterService(final HttpServletResponse response,
                                                                final HttpServletRequest request,
                                                                @RequestParam final String id) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        final String email = casUserProfile.getEmail();
        final GitServicesManager manager = managerFactory.master();
        final RegisteredService svc = manager.findServiceBy(Long.parseLong(id));
        checkOwner(svc.getContacts(), email);
        return new ResponseEntity<>(svc, HttpStatus.OK);
    }

    /**
     * Mapped method to handle renewal of a service by the end user.
     *
     * @param response - the response
     * @param request - the request
     * @param id - the assigned id of the server
     * @return - status of the renewal
     * @throws Exception - failed
     */
    @GetMapping("renew")
    public ResponseEntity<String> renew(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        @RequestParam final String id) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        final String email = casUserProfile.getEmail();
        final GitServicesManager manager = managerFactory.master();
        final AbstractRegisteredService svc = (AbstractRegisteredService)manager.findServiceBy(Long.parseLong(id));
        checkOwner(svc.getContacts(), email);
        checkForLocalChange(manager, svc);
        setNewExpire(svc);
        manager.save(svc);
        manager.getGit().commitSingleFile(casUserProfile,
                "service-"+svc.getId()+".json",
                "Renewal of " + svc.getName());
        publishRenewal(manager, svc);
        return new ResponseEntity<>("Renewed", HttpStatus.OK);
    }

    private void checkOwner(List<RegisteredServiceContact> contacts, String email) throws Exception {
        final boolean owner = contacts.stream().filter(c -> email.equals(c.getEmail())).findAny().isPresent();
        if (!owner) {
            throw new IllegalAccessException("You do not own this service.");
        }
    }

    private void checkForLocalChange(GitServicesManager manager, RegisteredService svc) throws Exception {
        if (manager.getGit().scanWorkingDiffs().stream()
                .anyMatch(s -> s.getNewPath().split("-")[1].equals(svc.getId()))){
            throw new Exception("Unable to renew at this time");
        }
    }

    private void setNewExpire(RegisteredService svc) {
        final LocalDate exp = LocalDate.parse(svc.getExpirationPolicy().getExpirationDate()).plusYears(1);
        ((DefaultRegisteredServiceExpirationPolicy)svc.getExpirationPolicy()).setExpirationDate(exp.toString());
    }

    private void publishRenewal(final GitServicesManager manager, final RegisteredService svc) throws Exception {
        if (manager.getGit().getUnpublishedCommits().size() == 1) {
            published.save(svc);
            manager.getGit().setPublished();
            if (casProperties.getMgmt().getSyncScript() != null) {
                final int status = Runtime.getRuntime().exec(casProperties.getMgmt().getSyncScript()).waitFor();
                if (status > 0) {
                    throw new Exception("Services Sync Failed");
                }
            }
        }
    }
}
