package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.CasRegisteredService;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.ws.idp.services.WSFederationRegisteredService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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

    private final MgmtManagerFactory<? extends ServicesManager> managerFactory;

    private static void save(final RegisteredService service, final ManagementServicesManager manager) {
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
     * Gets services.
     *
     * @param authentication - HttpServletResponse
     * @param domain         the domain for which services will be retrieved
     * @return the services
     * @throws IllegalAccessException - Auth failed
     */
    @GetMapping
    public List<RegisteredServiceItem> getServices(final Authentication authentication,
                                                   @RequestParam
                                                   final String domain) throws IllegalAccessException {
        val casUserProfile = new CasUserProfile(authentication);

        if (!casUserProfile.isAdministrator() && !casUserProfile.hasPermission(domain)) {
            throw new IllegalAccessException("You do not have permission to the domain '" + domain + '\'');
        }
        val manager = (ManagementServicesManager) managerFactory.from(authentication);
        return manager.getServiceItems(manager.getServicesForDomain(domain)
            .stream()
            .filter(s -> s.getFriendlyName().equalsIgnoreCase(CasRegisteredService.FRIENDLY_NAME))
            .sorted(Comparator.comparing(RegisteredService::getEvaluationOrder)));
    }

    /**
     * Returns a list of OAuth services.
     *
     * @param authentication - the response
     * @return - list of OAuth registered Service items
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("oauth")
    public List<RegisteredServiceItem> getOAuthServices(final Authentication authentication) throws IllegalAccessException {
        val casUserProfile = new CasUserProfile(authentication);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("You do not have permission");
        }
        val manager = (ManagementServicesManager) managerFactory.from(authentication);
        val services = manager.findServiceBy(s -> s instanceof OAuthRegisteredService);
        return manager.getServiceItems(services.stream().filter(casUserProfile::hasPermission));
    }

    /**
     * Returns a list of WsFed services.
     *
     * @param authentication - the response
     * @return - list of Wsfed registered Service items
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("wsfed")
    public List<RegisteredServiceItem> getWsfedServices(final Authentication authentication) throws IllegalAccessException {
        val casUserProfile = new CasUserProfile(authentication);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("You do not have permission");
        }
        val manager = (ManagementServicesManager) managerFactory.from(authentication);
        val services = manager.findServiceBy(s -> s instanceof WSFederationRegisteredService);
        return manager.getServiceItems(services.stream().filter(casUserProfile::hasPermission));
    }

    /**
     * Returns a list of SAML services.
     *
     * @param authentication - user authentication
     * @return - list of SAML registered Service items
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("saml")
    public List<RegisteredServiceItem> getSamlServices(final Authentication authentication) throws IllegalAccessException {
        val user = CasUserProfile.from(authentication);
        if (!user.isUser()) {
            throw new IllegalAccessException("You do not have permission");
        }
        val manager = (ManagementServicesManager) managerFactory.from(authentication);
        val services = manager.getAllServicesOfType(SamlRegisteredService.class).stream().filter(user::hasPermission);
        return manager.getServiceItems(services);
    }

    /**
     * Method to delete the RegisteredService by its ID. Will make sure
     * the default service that is the management app itself cannot be deleted
     * or the user will be locked out.
     *
     * @param authentication - the user
     * @param id             -  the id
     */
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRegisteredService(final Authentication authentication,
                                        @PathVariable("id")
                                        final long id) {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.from(authentication);
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
     * @param authentication - the user
     * @param service        the edit bean
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveService(final Authentication authentication,
                            @RequestBody
                            final RegisteredService service) {
        val user = CasUserProfile.from(authentication);
        if (user.isUser() && user.hasPermission(service)) {
            val manager = (ManagementServicesManager) managerFactory.from(authentication);
            save(service, manager);
        }
    }

    /**
     * Gets service by id.
     *
     * @param authentication - the user
     * @param id             the id
     * @return the service by id
     */
    @GetMapping("/{id}")
    public RegisteredService getServiceById(final Authentication authentication,
                                            @PathVariable(value = "id")
                                            final Long id) {
        val casUserProfile = CasUserProfile.from(authentication);
        if (casUserProfile.isUser()) {
            val service = getService(authentication, id);
            if (casUserProfile.hasPermission(service)) {
                return service;
            }
        }
        throw new IllegalArgumentException("You do not have permission");
    }

    /**
     * Method will return a YAML representation of the service.
     *
     * @param authentication - the user
     * @param id             - Long representing id of the service
     * @return - String representing the service in Yaml notation.
     */
    @GetMapping("/yaml/{id}")
    public String getYaml(final Authentication authentication,
                          @PathVariable("id")
                          final Long id) {
        val casUserProfile = CasUserProfile.from(authentication);
        val service = getService(authentication, id);
        return casUserProfile.hasPermission(service) ? CasManagementUtils.toYaml(service) : StringUtils.EMPTY;
    }

    /**
     * Methods that saves changes made to a service through a YAML string.
     *
     * @param authentication - the user
     * @param id             - the id of the service
     * @param yaml           - the service as a yaml string
     * @throws IOException - failed
     */
    @PostMapping("yaml/{id}")
    public void saveYaml(final Authentication authentication,
                         @PathVariable("id")
                         final Long id,
                         @RequestBody
                         final String yaml) throws IOException {
        val casUserProfile = CasUserProfile.from(authentication);
        val service = CasManagementUtils.parseYaml(yaml);
        if (casUserProfile.hasPermission(service)) {
            if (!id.equals(service.getId())) {
                throw new IllegalArgumentException("Changes to assigned id are not allowed");
            }
            val manager = (ManagementServicesManager) managerFactory.from(authentication);
            save(service, manager);
        }
    }

    @PostMapping("validate")
    public ResponseEntity<String> validate(final Authentication authentication,
                                           @RequestParam(required = false, name = "format", defaultValue = "json")
                                           final String format,
                                           @RequestBody
                                           final RegisteredService service) {
        val casUserProfile = CasUserProfile.from(authentication);
        if (casUserProfile.hasPermission(service)) {
            var result = StringUtils.EMPTY;
            if (StringUtils.equalsIgnoreCase(format, "yaml")) {
                result = CasManagementUtils.toYaml(service);
            } else {
                result = CasManagementUtils.toJson(service);
            }
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    /**
     * Method that will return the service as an HJson string.
     *
     * @param authentication - HttpServletRequest
     * @param id             - Long representing the id of the service
     * @return - String representing the service in HJson
     */
    @GetMapping("/json/{id}")
    public String getJson(final Authentication authentication,
                          @PathVariable("id")
                          final Long id) {
        val service = getService(authentication, id);
        val casUserProfile = CasUserProfile.from(authentication);
        return casUserProfile.hasPermission(service) ? CasManagementUtils.toJson(service) : StringUtils.EMPTY;
    }

    /**
     * Saves a service that was edited as Json string.
     *
     * @param authentication - the request
     * @param id             - the service id
     * @param json           - the sevice as a json string
     * @throws IOException - failed
     */
    @PostMapping("/json/{id}")
    public void saveJson(final Authentication authentication,
                         @PathVariable("id")
                         final Long id,
                         @RequestBody
                         final String json) throws IOException {
        val service = CasManagementUtils.parseJson(json);
        val casUserProfile = CasUserProfile.from(authentication);
        if (casUserProfile.hasPermission(service)) {
            if (!id.equals(service.getId())) {
                throw new IllegalArgumentException("Changes to assigned id are not allowed.");
            }
            val manager = (ManagementServicesManager) managerFactory.from(authentication);
            save(service, manager);
        }
    }

    /**
     * Parses the passes json or yaml string into a Registered Service object and returns to the client.
     * The id of the service will be set to -1 to force adding a new assigned id if saved.
     *
     * @param service - the json/yaml string of the service.
     * @return - the parsed RegisteredService.
     */
    @PostMapping(value = "import", consumes = MediaType.TEXT_PLAIN_VALUE)
    public RegisteredService importService(
        @RequestBody
        final String service) {
        val svc = service.startsWith("{") ? CasManagementUtils.fromJson(service) : CasManagementUtils.fromYaml(service);
        svc.setId(-1);
        return svc;
    }

    /**
     * Method will update the order of two services passed in.
     *
     * @param authentication - the user
     * @param svcs           the services to be updated
     * @throws IllegalAccessException the exception
     */
    @PostMapping(value = "/updateOrder", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateOrder(final Authentication authentication,
                            @RequestBody
                            final List<RegisteredServiceItem> svcs) throws IllegalAccessException {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.from(authentication);
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
     * @param id             - the id
     * @param authentication - the user
     * @throws IllegalAccessException - failed
     */
    @GetMapping("promote/{id}")
    public void promote(
        @PathVariable
        final Long id,
        final Authentication authentication) throws IllegalAccessException {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.from(authentication);
        val service = (RegexRegisteredService) manager.findServiceBy(id);
        if (!casUserProfile.hasPermission(service)) {
            throw new IllegalAccessException("You do not have permission");
        }
        service.setEnvironments(null);
        manager.save(service);
    }

    /**
     * Demotes a service to be only available in stage.
     *
     * @param id             - the id
     * @param authentication - the user
     * @throws IllegalAccessException - failed
     */
    @GetMapping("demote/{id}")
    public void demote(
        @PathVariable
        final Long id,
        final Authentication authentication) throws IllegalAccessException {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.from(authentication);
        val service = (RegexRegisteredService) manager.findServiceBy(id);
        if (!casUserProfile.hasPermission(service)) {
            throw new IllegalAccessException("You do not have permission");
        }
        val env = new HashSet<String>();
        env.add("staged");
        service.setEnvironments(env);
        manager.save(service);
    }

    private RegisteredService getService(final Authentication authentication,
                                         final Long id) {
        val manager = managerFactory.from(authentication);
        val service = id == -1 ? new RegexRegisteredService() : manager.findServiceBy(id);
        if (service == null) {
            LOGGER.warn("Invalid service id specified [{}]. Cannot find service in the registry", id);
            throw new IllegalArgumentException(MessageFormat.format(NOT_FOUND_PATTERN, id));
        }
        return service;
    }

}
