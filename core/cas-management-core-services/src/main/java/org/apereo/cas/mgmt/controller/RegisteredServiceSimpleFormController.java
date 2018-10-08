package org.apereo.cas.mgmt.controller;

//import org.apereo.cas.mgmt.GitUtil;
import lombok.RequiredArgsConstructor;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.factory.ManagerFactory;
//import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
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

/**
 * Handle adding/editing of RegisteredServices.
 *
 * @author Scott Battaglia
 * @since 3.1
 */
@Controller("registeredServiceSimpleFormController")
@Slf4j
@RequiredArgsConstructor
public class RegisteredServiceSimpleFormController {

    private final ManagerFactory managerFactory;

    private final CasUserProfileFactory casUserProfileFactory;

    //private final RepositoryFactory repositoryFactory;

    /**
     * Instantiates a new registered service simple form controller.
     *
     * @param servicesManager       the services from
     * @param managerFactory        the manager factory
     * @param casUserProfileFactory the cas user factory
     * //@param repositoryFactory     the git repository factory

    public RegisteredServiceSimpleFormController(final ServicesManager servicesManager,
                                                 final ManagerFactory managerFactory,
                                                 final CasUserProfileFactory casUserProfileFactory) {
                                                 //final RepositoryFactory repositoryFactory) {
        super(servicesManager);
        this.managerFactory = managerFactory;
        this.casUserProfileFactory = casUserProfileFactory;
        //this.repositoryFactory = repositoryFactory;
    }
    */

    /**
     * Adds the service to the Service Registry.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param service  the edit bean
     * @return the response entity
     * @throws Exception - failed
     */
    @PostMapping(value = "saveService", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveService(final HttpServletRequest request,
                                              final HttpServletResponse response,
                                              @RequestBody final RegisteredService service) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        if (service.getEvaluationOrder() < 0) {
            val domain = manager.extractDomain(service.getServiceId());
            service.setEvaluationOrder(manager.getServicesForDomain(domain).size());
        }

        if (service.getId() > -1) {
            checkForRename(service, request, response);
        }

        val newSvc = manager.save(service);
        LOGGER.info("Saved changes to service [{}]", service.getId());
        return new ResponseEntity<>(String.valueOf(newSvc.getId()), HttpStatus.OK);
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
    @GetMapping(value = "getService")
    public ResponseEntity<RegisteredService> getServiceById(final HttpServletRequest request,
                                                            final HttpServletResponse response,
                                                            @RequestParam(value = "id", required = false, defaultValue = "-1") final Long id) throws Exception {
        val service = getService(request, response, id);
        return new ResponseEntity<>(service, HttpStatus.OK);
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
    @GetMapping("getYaml")
    public ResponseEntity<String> getYaml(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @RequestParam(value = "id", required = false) final Long id) throws Exception {
        val service = getService(request, response, id);
        val yamlSerializer = new RegisteredServiceYamlSerializer();
        val output = new ByteArrayOutputStream();
        yamlSerializer.to(output, service);
        return new ResponseEntity<>(output.toString(), HttpStatus.OK);
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
    @GetMapping("getJson")
    public ResponseEntity<String> getJson(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @RequestParam(value = "id", required = false) final Long id) throws Exception {
        val service = getService(request, response, id);
        val serializer = new DefaultRegisteredServiceJsonSerializer();
        val output = new ByteArrayOutputStream();
        serializer.to(output, service);
        return new ResponseEntity<>(output.toString(), HttpStatus.OK);
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

    private void checkForRename(final RegisteredService service,
                                final HttpServletRequest request,
                                final HttpServletResponse response) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val oldSvc = managerFactory.from(request, casUserProfile).findServiceBy(service.getId());
        if (oldSvc != null) {
            if (!service.getName().equals(oldSvc.getName())) {
                //try (GitUtil git = repositoryFactory.from(request, response)) {
                //    git.move(makeFileName(oldSvc), makeFileName(service));
                //}
            }
        }
    }

    private String makeFileName(final RegisteredService service) throws Exception {
        return StringUtils.remove(service.getName() + '-' + service.getId() + ".json", " ");
    }
}
