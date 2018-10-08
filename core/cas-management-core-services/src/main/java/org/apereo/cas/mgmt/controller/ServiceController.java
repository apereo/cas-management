package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domains.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for services.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("serviceController")
@RequestMapping(path = "/services", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ServiceController {

    private final CasUserProfileFactory casUserProfileFactory;
    private final ManagerFactory managerFactory;

    /**
     * Gets services.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param domain   the domain for which services will be retrieved
     * @return the services
     * @throws Exception - failed
     */
    @GetMapping("/domain/{domain}")
    public List<RegisteredServiceItem> getServices(final HttpServletRequest request,
                                                   final HttpServletResponse response,
                                                   @PathVariable final String domain) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isAdministrator()) {
            if (!casUserProfile.hasPermission(domain)) {
                throw new IllegalAccessException("You do not have permission to the domain '" + domain + '\'');
            }
        }
        val manager = managerFactory.from(request, casUserProfile);
        return manager.getServiceItemsForDomain(domain);
    }

    /**
     * Method to delete the RegisteredService by its ID. Will make sure
     * the default service that is the management app itself cannot be deleted
     * or the user will be locked out.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id -  the id
     * @throws Exception the exception
     */
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRegisteredService(final HttpServletRequest request,
                                        final HttpServletResponse response,
                                        @PathVariable("id") final long id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        val svc = manager.findServiceBy(id);
        if (svc == null) {
            throw new Exception("No Such Service");
        }
        LOGGER.debug("Deleting service [{}]", id);
        manager.delete(id);
    }

    /**
     * Adds the service to the Service Registry.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param service  the edit bean
     * @throws Exception - failed
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveService(final HttpServletRequest request,
                            final HttpServletResponse response,
                            @RequestBody final RegisteredService service) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        if (service.getEvaluationOrder() < 0) {
            val domain = manager.extractDomain(service.getServiceId());
            service.setEvaluationOrder(manager.getServicesForDomain(domain).size());
        }

        if (service.getId() > -1) {
            manager.getVersionControl().checkForRename(service, manager);
        }

        val newSvc = manager.save(service);
        LOGGER.info("Saved changes to service [{}]", service.getId());
    }

    /**
     * Gets service by id.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       the id
     * @return the service by id
     * @throws Exception the exception
     */
    @GetMapping("/{id}")
    public RegisteredService getServiceById(final HttpServletRequest request,
                                            final HttpServletResponse response,
                                            @PathVariable(value = "id") final Long id) throws Exception {
        return getService(request, response, id);
    }

    /**
     * Method will return a YAML representation of the service.
     *
     * @param request  - HttpServletRequet
     * @param response - HttpServletResponse
     * @param id       - Long representing id of the service
     * @return - String representing the service in Yaml notation.
     * @throws Exception - failed
     */
    @GetMapping("/yaml/{id}")
    public String getYaml(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @PathVariable("id") final Long id) throws Exception {
        val service = getService(request, response, id);
        return CasManagementUtils.toYaml(service);
    }

    /**
     * Method that will return the service as an HJson string.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - Long representing the id of the service
     * @return - String representing the service in HJson
     * @throws Exception -failed
     */
    @GetMapping("/json/{id}")
    public String getJson(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @PathVariable("id") final Long id) throws Exception {
        val service = getService(request, response, id);
        return CasManagementUtils.toJson(service);
    }

    private RegisteredService getService(final HttpServletRequest request,
                                         final HttpServletResponse response,
                                         final Long id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        var service = id == -1 ? new RegexRegisteredService() : manager.findServiceBy(id);

        if (service == null) {
            LOGGER.warn("Invalid service id specified [{}]. Cannot find service in the registry", id);
            throw new IllegalArgumentException("Service id " + id + " cannot be found");
        }
        return service;
    }

    /**
     * Parses the passes json or yaml string into a Registered Service object and returns to the client.
     * The id of the service will be set to -1 to force adding a new assigned id if saved.
     *
     * @param response - the response
     * @param service  - the json/yaml string of the service.
     * @return - the parsed RegisteredService.
     * @throws Exception - failed
     */
    @PostMapping(value = "import", consumes = MediaType.TEXT_PLAIN_VALUE)
    public RegisteredService importService(final HttpServletResponse response,
                                           @RequestBody final String service) throws Exception {
        try {
            var svc = (RegisteredService) null;
            if (service.startsWith("{")) {
                svc = CasManagementUtils.fromJson(service);
            } else {
                svc = CasManagementUtils.fromYaml(service);
            }
            svc.setId(-1);
            return svc;
        } catch (final Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            throw new Exception("Failed to parse Service");
        }
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

}
