package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.SamlRegisteredService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;

/**
 * REST controller for services.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("serviceController")
@RequestMapping(path = "api/services", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ServiceController {

    private static final String NOT_FOUND_PATTERN = "Service '{}' not found";
    private final CasUserProfileFactory casUserProfileFactory;
    private final MgmtManagerFactory<? extends ServicesManager> managerFactory;

    /**
     * Gets services.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param domain   the domain for which services will be retrieved
     * @return the services
     * @throws IllegalAccessException - Auth failed
     */
    @GetMapping
    public List<RegisteredServiceItem> getServices(final HttpServletRequest request,
                                                   final HttpServletResponse response,
                                                   final Authentication authentication,
                                                   final @RequestParam String domain) throws IllegalAccessException {
        LOGGER.error("Auth is [{}}", authentication);
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isAdministrator() && !casUserProfile.hasPermission(domain)) {
            throw new IllegalAccessException("You do not have permission to the domain '" + domain + '\'');
        }
        val manager = (ManagementServicesManager) managerFactory.from(request, response);
        return manager.getServiceItems(manager.getServicesForDomain(domain)
                .stream()
                .filter(s -> s.getClass().getName().contains("RegexRegistered"))
                .sorted(Comparator.comparing(RegisteredService::getEvaluationOrder)));
    }

    /**
     * Returns a list of OAuth services.
     *
     * @param request - the request
     * @param response - the response
     * @return - list of OAuth registered Service items
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("oauth")
    public List<RegisteredServiceItem> getOAuthServices(final HttpServletRequest request,
                                                        final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("You do not have permission");
        }
        val manager = (ManagementServicesManager) managerFactory.from(request, response);
        val services = manager.findServiceBy(s -> s instanceof OAuthRegisteredService);
        //val services = manager.getAllServicesByType(new OAuthWebApplicationService()).stream().filter(casUserProfile::hasPermission);
        return manager.getServiceItems(services.stream().filter(casUserProfile::hasPermission));
    }

    /**
     * Returns a list of SAML services.
     *
     * @param request - the request
     * @param response - the response
     * @return - list of SAML registered Service items
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("saml")
    public List<RegisteredServiceItem> getSamlServices(final HttpServletRequest request,
                                                        final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("You do not have permission");
        }
        val manager = (ManagementServicesManager) managerFactory.from(request, response);
        val services = manager.findServiceBy(s -> s instanceof SamlRegisteredService).stream().filter(casUserProfile::hasPermission);
        return manager.getServiceItems(services);
    }

    /**
     * Method to delete the RegisteredService by its ID. Will make sure
     * the default service that is the management app itself cannot be deleted
     * or the user will be locked out.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id -  the id
     */
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRegisteredService(final HttpServletRequest request,
                                        final HttpServletResponse response,
                                        @PathVariable("id") final long id) {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, response);
        val svc = manager.findServiceBy(id);
        if (casUserProfile.isUser() && casUserProfile.hasPermission(svc)) {
            if (svc == null) {
                throw new IllegalArgumentException(MessageFormat.format(NOT_FOUND_PATTERN, id));
            }
            LOGGER.debug("Deleting service [{}]", id);
            manager.delete(id);
        }
    }

    /**
     * Adds the service to the Service Registry.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param service  the edit bean
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveService(final HttpServletRequest request,
                            final HttpServletResponse response,
                            @RequestBody final RegisteredService service) {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (casUserProfile.isUser() && casUserProfile.hasPermission(service)) {
            val manager = (ManagementServicesManager) managerFactory.from(request, response);
            save(service, manager);
        }
    }

    private void save(final RegisteredService service, final ManagementServicesManager manager) {
        if (service.getEvaluationOrder() < 0) {
            val domain = manager.extractDomain(service.getServiceId());
            service.setEvaluationOrder(manager.getServicesForDomain(domain).size());
        }
        if (service.getId() > -1) {
            manager.checkForRename(service);
        }
        manager.save(service);
        LOGGER.info("Saved changes to service [{}]", service.getId());
    }

    /**
     * Gets service by id.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       the id
     * @return the service by id
     */
    @GetMapping("/{id}")
    public RegisteredService getServiceById(final HttpServletRequest request,
                                            final HttpServletResponse response,
                                            @PathVariable(value = "id") final Long id) {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (casUserProfile.isUser()) {
            val service = getService(request, response, id);
            if (casUserProfile.hasPermission(service)) {
                return service;
            }
        }
        throw new IllegalArgumentException("You do not have permission");
    }

    /**
     * Method will return a YAML representation of the service.
     *
     * @param request  - HttpServletRequet
     * @param response - HttpServletResponse
     * @param id       - Long representing id of the service
     * @return - String representing the service in Yaml notation.
     */
    @GetMapping("/yaml/{id}")
    public String getYaml(final HttpServletRequest request,
                          final HttpServletResponse response,
                          final @PathVariable("id") Long id) {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val service = getService(request, response, id);
        return casUserProfile.hasPermission(service) ? CasManagementUtils.toYaml(service) : StringUtils.EMPTY;
    }

    /**
     * Methods that saves changes made to a service through a YAML string.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the id of the service
     * @param yaml - the service as a yaml string
     * @throws IOException - failed
     */
    @PostMapping("yaml/{id}")
    public void saveYaml(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @PathVariable("id") Long id,
                         final @RequestBody String yaml) throws IOException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val service = CasManagementUtils.parseYaml(yaml);
        if (casUserProfile.hasPermission(service)) {
            if (!id.equals(service.getId())) {
                throw new IllegalArgumentException("Changes to assigned id are not allowed");
            }
            val manager = (ManagementServicesManager) managerFactory.from(request, response);
            save(service, manager);
        }
    }
    /**
     * Method that will return the service as an HJson string.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - Long representing the id of the service
     * @return - String representing the service in HJson
     */
    @GetMapping("/json/{id}")
    public String getJson(final HttpServletRequest request,
                          final HttpServletResponse response,
                          final @PathVariable("id") Long id) {
        val service = getService(request, response, id);
        val casUserProfile = casUserProfileFactory.from(request, response);
        return casUserProfile.hasPermission(service) ? CasManagementUtils.toJson(service) : StringUtils.EMPTY;
    }

    /**
     * Saves a service that was edited as Json string.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the service id
     * @param json - the sevice as a json string
     * @throws IOException - failed
     */
    @PostMapping("/json/{id}")
    public void saveJson(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @PathVariable("id") Long id,
                         final @RequestBody String json) throws IOException {
        val service = CasManagementUtils.parseJson(json);
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (casUserProfile.hasPermission(service)) {
            if (!id.equals(service.getId())) {
                throw new IllegalArgumentException("Changes to assigned id are not allowed.");
            }
            val manager = (ManagementServicesManager) managerFactory.from(request, response);
            save(service, manager);
        }
    }

    private RegisteredService getService(final HttpServletRequest request,
                                         final HttpServletResponse response,
                                         final Long id) {
        val manager = managerFactory.from(request, response);
        val service = id == -1 ? new RegexRegisteredService() : manager.findServiceBy(id);
        if (service == null) {
            LOGGER.warn("Invalid service id specified [{}]. Cannot find service in the registry", id);
            throw new IllegalArgumentException(MessageFormat.format(NOT_FOUND_PATTERN, id));
        }
        return service;
    }

    /**
     * Parses the passes json or yaml string into a Registered Service object and returns to the client.
     * The id of the service will be set to -1 to force adding a new assigned id if saved.
     *
     * @param service  - the json/yaml string of the service.
     * @return - the parsed RegisteredService.
     */
    @PostMapping(value = "import", consumes = MediaType.TEXT_PLAIN_VALUE)
    public RegisteredService importService(final @RequestBody String service) {
        val svc = service.startsWith("{") ? CasManagementUtils.fromJson(service) : CasManagementUtils.fromYaml(service);
        svc.setId(-1);
        return svc;
    }

    /**
     * Method will update the order of two services passed in.
     *
     * @param request  the request
     * @param response the response
     * @param svcs     the services to be updated
     * @throws IllegalAccessException the exception
     */
    @PostMapping(value = "/updateOrder", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateOrder(final HttpServletRequest request,
                            final HttpServletResponse response,
                            @RequestBody final List<RegisteredServiceItem> svcs) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, response);
        for (val svc : svcs) {
            LOGGER.warn("Service = [{}], order = [{}]", svc, svc.getEvalOrder());
            if (!casUserProfile.hasPermission(svc.getServiceId())) {
                throw new IllegalAccessException("You do not have permission");
            }
            val id = svc.getAssignedId();
            val svcA = manager.findServiceBy(Long.parseLong(id));
            if (svcA == null) {
                throw new IllegalArgumentException(MessageFormat.format(NOT_FOUND_PATTERN, id));
            }
            svcA.setEvaluationOrder(svc.getEvalOrder());
            manager.save(svcA);
        }
    }

    /**
     * Promotes a service to be included in production registry.
     *
     * @param id - the id
     * @param request - the request
     * @param response - the response
     * @throws IllegalAccessException - failed
     */
    @GetMapping("promote/{id}")
    public void promote(final @PathVariable Long id,
                        final HttpServletRequest request,
                        final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, response);
        val service = (RegexRegisteredService) manager.findServiceBy(id);
        if (casUserProfile.hasPermission(service)) {
            throw new IllegalAccessException("You do not have permission");
        }
        service.setEnvironments(null);
        manager.save(service);
    }

    /**
     * Demotes a service to be only available in stage.
     *
     * @param id - the id
     * @param request - the request
     * @param response - the response
     * @throws IllegalAccessException - failed
     */
    @GetMapping("demote/{id}")
    public void demote(final @PathVariable Long id,
                        final HttpServletRequest request,
                        final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, response);
        val service = (RegexRegisteredService) manager.findServiceBy(id);
        if (!casUserProfile.hasPermission(service)) {
            throw new IllegalAccessException("You do not have permission");
        }
        val env = new HashSet<String>();
        env.add("staged");
        service.setEnvironments(env);
        manager.save(service);
    }

}
