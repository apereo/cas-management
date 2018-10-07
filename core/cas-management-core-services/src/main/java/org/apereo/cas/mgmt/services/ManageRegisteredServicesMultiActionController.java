package org.apereo.cas.mgmt.services;

import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.authentication.principal.ServiceFactory;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.beans.AppConfig;
import org.apereo.cas.mgmt.beans.FormData;
import org.apereo.cas.mgmt.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.CasVersion;
import org.apereo.cas.util.RegexUtils;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * MultiActionController to handle the deletion of RegisteredServices as well as
 * displaying them on the Manage Services page.
 *
 * @author Scott Battaglia
 * @since 3.1
 */
@Controller("manageRegisteredServicesMultiActionController")
@Slf4j
public class ManageRegisteredServicesMultiActionController extends AbstractManagementController {

    private static final String STATUS = "status";

    private final FormDataFactory formDataFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final Service defaultService;
    private final ManagerFactory managerFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CasConfigurationProperties casProperties;

    /**
     * Instantiates a new manage registered services multi action controller.
     *
     * @param servicesManager              the services manager
     * @param formDataFactory              the form data factory
     * @param webApplicationServiceFactory the web application service factory
     * @param defaultServiceUrl            the default service url
     * @param managementProperties         the cas properties
     * @param casUserProfileFactory        the cas user profile factory
     * @param managerFactory               the manager factory
     * @param casProperties                the cas properties
     */
    public ManageRegisteredServicesMultiActionController(
        final ServicesManager servicesManager,
        final FormDataFactory formDataFactory,
        final ServiceFactory<WebApplicationService> webApplicationServiceFactory,
        final String defaultServiceUrl,
        final CasManagementConfigurationProperties managementProperties,
        final CasUserProfileFactory casUserProfileFactory,
        final ManagerFactory managerFactory,
        final CasConfigurationProperties casProperties) {
        super(servicesManager);
        this.formDataFactory = formDataFactory;
        this.defaultService = webApplicationServiceFactory.createService(defaultServiceUrl);
        this.managementProperties = managementProperties;
        this.casUserProfileFactory = casUserProfileFactory;
        this.managerFactory = managerFactory;
        this.casProperties = casProperties;
    }

    /**
     * Mapped method to return the manage.html.
     *
     * @return - ModelAndView
     */
    @GetMapping("/manage.html")
    public ModelAndView manage() {
        ensureDefaultServiceExists();
        val model = new HashMap<String, Object>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        model.put("defaultServiceUrl", this.defaultService.getId());
        return new ModelAndView("manage", model);
    }

    /**
     * Ensure default service exists.
     */
    private void ensureDefaultServiceExists() {
        this.servicesManager.load();
        val c = this.servicesManager.getAllServices();
        if (c == null) {
            throw new IllegalStateException("Services cannot be empty");
        }

        if (!this.servicesManager.matchesExistingService(this.defaultService)) {
            LOGGER.debug("Default service [{}] does not exist. Creating...", this.defaultService);
            val svc = new RegexRegisteredService();
            svc.setServiceId('^' + this.defaultService.getId());
            svc.setName("Services Management Web Application");
            svc.setDescription(svc.getName());
            this.servicesManager.save(svc);
            this.servicesManager.load();
        }
    }

    /**
     * Authorization failure handling. Simply returns the view name.
     *
     * @return the view name.
     */
    @GetMapping(value = "/authorizationFailure")
    public String authorizationFailureView() {
        return "authorizationFailure";
    }

    /**
     * Logout handling. Simply returns the view name.
     *
     * @param request  the request
     * @param response the response
     * @return the view name.
     */
    @GetMapping(value = "/logout.html")
    public String logoutView(final HttpServletRequest request, final HttpServletResponse response) {
        LOGGER.debug("Invalidating application session...");
        new ProfileManager(new J2EContext(request, response)).logout();
        request.getSession(false).invalidate();
        return "logout";
    }

    /**
     * Method to delete the RegisteredService by its ID. Will make sure
     * the default service that is the management app itself cannot be deleted
     * or the user will be locked out.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param idAsLong the id
     * @return the response entity
     * @throws Exception the exception
     */
    @GetMapping(value = "/deleteRegisteredService")
    public ResponseEntity<String> deleteRegisteredService(final HttpServletRequest request,
                                                          final HttpServletResponse response,
                                                          @RequestParam("id") final long idAsLong) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        val svc = manager.findServiceBy(idAsLong);
        if (svc == null) {
            return new ResponseEntity<>("Service id " + idAsLong + " cannot be found.", HttpStatus.BAD_REQUEST);
        }
        if (svc.getServiceId().equals(this.defaultService.getId())) {
            return new ResponseEntity<>("The default service " + this.defaultService.getId() + " cannot be deleted. "
                + "The definition is required for accessing the application.", HttpStatus.BAD_REQUEST);
        }
        LOGGER.debug("Deleting service [{}]", idAsLong);
        manager.delete(idAsLong);
        return new ResponseEntity<>(svc.getName(), HttpStatus.OK);
    }

    @GetMapping(value = "managerType")
    public ResponseEntity<String> getManagerType() {
        return new ResponseEntity<>(casProperties.getServiceRegistry().getManagementType().toString(), HttpStatus.OK);
    }

    /**
     * Gets domains.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return the domains
     * @throws Exception the exception
     */
    @GetMapping(value = "/domainList")
    public ResponseEntity<Collection<String>> getDomains(final HttpServletRequest request,
                                                         final HttpServletResponse response) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);

        var data = (Collection<String>) null;
        if (!casUserProfile.isAdministrator()) {
            data = manager.getDomains()
                .stream()
                .filter(d -> hasPermission(d, casUserProfile))
                .collect(Collectors.toList());
        } else {
            data = manager.getDomains();
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Gets user.
     *
     * @param request  the request
     * @param response the response
     * @return the user
     */
    @GetMapping(value = "/user")
    public ResponseEntity<CasUserProfile> getUser(final HttpServletRequest request,
                                                  final HttpServletResponse response) {
        val data = casUserProfileFactory.from(request, response);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Gets services.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param domain   the domain for which services will be retrieved
     * @return the services
     * @throws Exception - failed
     */
    @GetMapping(value = "/getServices")
    public ResponseEntity<List<RegisteredServiceItem>> getServices(final HttpServletRequest request,
                                                                   final HttpServletResponse response,
                                                                   @RequestParam final String domain) throws Exception {
        ensureDefaultServiceExists();
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isAdministrator()) {
            if (!hasPermission(domain, casUserProfile)) {
                throw new IllegalAccessException("You do not have permission to the domain '" + domain + '\'');
            }
        }
        val manager = managerFactory.from(request, casUserProfile);
        val serviceItemsForDomain = manager.getServiceItemsForDomain(domain);
        return new ResponseEntity<>(serviceItemsForDomain, HttpStatus.OK);
    }

    /**
     * Method will filter all services in the register using the passed string a regular expression against the
     * service name, service id, and service description.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param query    - a string representing text to search for
     * @return - the resulting services
     * @throws Exception the exception
     */
    @GetMapping(value = "/search")
    public ResponseEntity<List<RegisteredServiceItem>> search(final HttpServletRequest request,
                                                              final HttpServletResponse response,
                                                              @RequestParam final String query) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        val pattern = RegexUtils.createPattern("^.*" + query + ".*$");
        List<RegisteredService> services;
        if (!casUserProfile.isAdministrator()) {
            services = casUserProfile.getPermissions()
                .stream()
                .flatMap(d -> manager.getServicesForDomain(d).stream())
                .collect(Collectors.toList());
        } else {
            services = (List<RegisteredService>) manager.getAllServices();
        }
        services = services.stream()
            .filter(service -> pattern.matcher(service.getServiceId()).lookingAt()
                || pattern.matcher(service.getName()).lookingAt()
                || pattern.matcher(service.getDescription() != null ? service.getDescription() : "").lookingAt())
            .collect(Collectors.toList());
        val serviceBeans = new ArrayList<>(services.stream()
            .map(manager::createServiceItem)
            .collect(Collectors.toList()));
        return new ResponseEntity<>(serviceBeans, HttpStatus.OK);
    }

    /**
     * Gets form data.
     *
     * @return the form data
     */
    @GetMapping(value = "formData")
    public ResponseEntity<FormData> getFormData() {
        return new ResponseEntity<>(formDataFactory.create(), HttpStatus.OK);
    }

    /**
     * Method will update the order of two services passed in.
     *
     * @param request  the request
     * @param response the response
     * @param svcs     the services to be updated
     * @throws Exception the exception
     */
    @PostMapping(value = "/updateOrder", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateOrder(final HttpServletRequest request, final HttpServletResponse response,
                            @RequestBody final RegisteredServiceItem[] svcs) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        val id = svcs[0].getAssignedId();
        val svcA = manager.findServiceBy(Long.parseLong(id));
        if (svcA == null) {
            throw new IllegalArgumentException("Service " + id + " cannot be found");
        }
        val id2 = svcs[1].getAssignedId();
        val svcB = manager.findServiceBy(Long.parseLong(id2));
        if (svcB == null) {
            throw new IllegalArgumentException("Service " + id2 + " cannot be found");
        }
        svcA.setEvaluationOrder(svcs[0].getEvalOrder());
        svcB.setEvaluationOrder(svcs[1].getEvalOrder());
        manager.save(svcA);
        manager.save(svcB);
    }

    /**
     * Returns the versions this instance was compiled against.
     *
     * @return - cas versions
     */
    @GetMapping("footer")
    public ResponseEntity<String[]> footer() {
        return new ResponseEntity<>(new String[]{CasVersion.getVersion(),
            this.getClass().getPackage().getImplementationVersion()},
            HttpStatus.OK);
    }

    /**
     * Parses the passes json or yaml string into a Registered Service object and returns to the client.
     * The id of the service will be set to -1 to force adding a new assigned id if saved.
     *
     * @param request  - the request
     * @param response - the response
     * @param service  - the json/yaml string of the service.
     * @return - the parsed RegisteredService.
     * @throws Exception - failed
     */
    @PostMapping(value = "import", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<RegisteredService> importService(final HttpServletRequest request,
                                                           final HttpServletResponse response,
                                                           @RequestBody final String service) throws Exception {
        try {
            var svc = (RegisteredService) null;
            if (service.startsWith("{")) {
                val serializer = new DefaultRegisteredServiceJsonSerializer();
                svc = serializer.from(service);
            } else {
                val yamlSerializer = new RegisteredServiceYamlSerializer();
                svc = yamlSerializer.from(service);
            }
            svc.setId(-1);
            return new ResponseEntity<>(svc, HttpStatus.OK);
        } catch (final Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            throw new Exception("Failed to parse Service");
        }
    }

    /**
     * Method called by client to determine which features are available and configured.
     *
     * @return - AppConfig
     */
    @GetMapping("/appConfig")
    public ResponseEntity<AppConfig> appConfig() {
        val config = new AppConfig();
        config.setMgmtType(casProperties.getServiceRegistry().getManagementType().toString());
        config.setVersionControl(managementProperties.isEnableVersionControl());
        config.setDelegatedMgmt(managementProperties.isEnableDelegatedMgmt());
        config.setSyncScript(managementProperties.getSyncScript() != null);
        return new ResponseEntity<>(config, HttpStatus.OK);
    }

    private static boolean hasPermission(final String domain, final CasUserProfile casUserProfile) {
        val permissions = casUserProfile.getPermissions();
        LOGGER.debug("Current permissions for [{}] matched against domain [{}] are [{}]", casUserProfile, domain, permissions);
        return permissions.contains("*") || permissions.stream().anyMatch(domain::endsWith);
    }
}

