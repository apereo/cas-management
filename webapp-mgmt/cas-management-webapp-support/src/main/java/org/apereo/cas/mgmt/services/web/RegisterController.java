package org.apereo.cas.mgmt.services.web;

import org.apereo.cas.config.CasCoreWebConfiguration;
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
import org.springframework.dao.PermissionDeniedDataAccessException;
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
import java.io.File;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

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
     * Mapped method to return the manage.html.
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

    @PostMapping(value="submit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> submit(final HttpServletResponse response,
                                         final HttpServletRequest request,
                                         @RequestBody final RegisteredService service) throws Exception {
        DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        serializer.to(Files.newOutputStream(Paths.get("/ucd/local/cas-mgmt-5.2/submitted/submit-"+new Date().getTime()+".json")), service);
        return new ResponseEntity<>("Service submitted", HttpStatus.OK);
    }

    @PostMapping(value="registerSave", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerSave(final HttpServletResponse response,
                                         final HttpServletRequest request,
                                         @RequestBody final RegisteredService service) throws Exception {
        DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        serializer.to(Files.newOutputStream(Paths.get("/ucd/local/cas-mgmt-5.2/submitted/edit-" + service.getId() + ".json")), service);
        return new ResponseEntity<>("Service Saved", HttpStatus.OK);
    }

    @GetMapping("getRegisterServices")
    public ResponseEntity<List<RegisteredServiceItem>> getRegisterServices(final HttpServletResponse response,
                                                                           final HttpServletRequest request) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        final String email = casUserProfile.getEmail();
        final GitServicesManager manager = managerFactory.master();
        final List<RegisteredServiceItem> svcs = manager.getAllServices().stream()
                .filter(s -> s.getContacts().stream()
                        .filter(c -> email.equals(c.getEmail())).findAny().isPresent())
                .map(s -> manager.createServiceItem(s))
                .collect(toList());
        return new ResponseEntity<>(svcs, HttpStatus.OK);
    }

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

    @GetMapping("renew")
    public ResponseEntity<String> renew(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        @RequestParam final String id) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        final String email = casUserProfile.getEmail();
        final GitServicesManager manager = managerFactory.master();
        final AbstractRegisteredService svc = (AbstractRegisteredService)manager.findServiceBy(Long.parseLong(id));
        checkOwner(svc.getContacts(), email);
        LocalDate exp = LocalDate.parse(svc.getExpirationPolicy().getExpirationDate()).plusYears(1);
        ((DefaultRegisteredServiceExpirationPolicy)svc.getExpirationPolicy()).setExpirationDate(exp.toString());
        manager.save(svc);
        manager.getGit().commitSingleFile(casUserProfile,
                "service-"+svc.getId()+".json",
                "Renewal of " + svc.getName());
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
        return new ResponseEntity<>("Renewed", HttpStatus.OK);
    }

    private void checkOwner(List<RegisteredServiceContact> contacts, String email) throws Exception {
        final boolean owner = contacts.stream().filter(c -> email.equals(c.getEmail())).findAny().isPresent();
        if (!owner) {
            throw new IllegalAccessException("You do not own this service.");
        }
    }
}
