package org.apereo.cas.mgmt.services.web;

import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * Handle adding/editing of RegisteredServices.
 *
 * @author Scott Battaglia
 * @since 3.1
 */
@Controller("registeredServiceSimpleFormController")
public class RegisteredServiceSimpleFormController extends AbstractManagementController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RegisteredServiceSimpleFormController.class);

    @Autowired
    private ManagerFactory managerFactory;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    /**
     * Instantiates a new registered service simple form controller.
     *
     * @param servicesManager          the services from
     */
    public RegisteredServiceSimpleFormController(final ServicesManager servicesManager) {
        super(servicesManager);
    }

    /**
     * Adds the service to the Service Registry.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param service the edit bean
     * @return the response entity
     * @throws Exception - failed
     */
    @PostMapping(value = "saveService", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveService(final HttpServletRequest request,
                                              final HttpServletResponse response,
                                              @RequestBody final RegisteredService service) throws Exception {
        final GitServicesManager manager = managerFactory.from(request, response);
        if (service.getEvaluationOrder() < 0) {
            service.setEvaluationOrder(manager.getAllServices().size());
        }
        final RegisteredService newSvc = manager.save(service);
        LOGGER.info("Saved changes to service [{}]", service.getId());
        return new ResponseEntity<>(String.valueOf(newSvc.getId()), HttpStatus.OK);
    }

    /**
     * Gets service by id.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id the id
     * @return the service by id
     * @throws Exception the exception
     */
    @GetMapping(value = "getService")
    public ResponseEntity<RegisteredService> getServiceById(final HttpServletRequest request,
                                                            final HttpServletResponse response,
                                                            @RequestParam(value = "id", required = false) final Long id) throws Exception {
        final RegisteredService service = getService(request, response, id);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    /**
     * Method will return a YAML representation of the service.
     *
     * @param request - HttpServletRequet
     * @param response - HttpServletResponse
     * @param id - Long representing id of the service
     * @return - String representing the service in Yaml notation.
     * @throws Exception - failed
     */
    @GetMapping("getYaml")
    public ResponseEntity<String> getYaml(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @RequestParam(value = "id", required = false) final Long id) throws Exception {
        final RegisteredService service = getService(request, response, id);
        final RegisteredServiceYamlSerializer yamlSerializer = new RegisteredServiceYamlSerializer();
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        yamlSerializer.to(output, service);
        return new ResponseEntity<String>(output.toString(), HttpStatus.OK);
    }

    /**
     * Method that will return the service as an HJson string.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id - Long representing the id of the service
     * @return - String representing the service in HJson
     * @throws Exception -failed
     */
    @GetMapping("getJson")
    public ResponseEntity<String> getJson(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          @RequestParam(value = "id", required = false) final Long id) throws Exception {
        final RegisteredService service = getService(request, response, id);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        serializer.to(output, service);
        return new ResponseEntity<String>(output.toString(), HttpStatus.OK);
    }

    private RegisteredService getService(final HttpServletRequest request,
                                         final HttpServletResponse response,
                                         final Long id) throws Exception {
        final GitServicesManager manager = managerFactory.from(request, response);
        final RegisteredService service;
        if (id == -1) {
            service = new RegexRegisteredService();
        } else {
            service = manager.findServiceBy(id);
            if (service == null) {
                LOGGER.warn("Invalid service id specified [{}]. Cannot find service in the registry", id);
                throw new IllegalArgumentException("Service id " + id + " cannot be found");
            }
        }
        return service;
    }
}
