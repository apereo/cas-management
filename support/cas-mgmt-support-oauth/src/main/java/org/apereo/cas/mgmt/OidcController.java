package org.apereo.cas.mgmt;

import org.apereo.cas.services.OidcRegisteredService;
import org.apereo.cas.services.ReturnAllAttributeReleasePolicy;
import org.apereo.cas.util.gen.DefaultRandomStringGenerator;

import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class will handle requests from the register endpoint.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RestController("casManagementOidcController")
@RequestMapping(path = "api/oidc", produces = MediaType.APPLICATION_JSON_VALUE)
public class OidcController {

    /**
     * Creates and returns a new OidcRegisteredService with generated client id and secret.
     *
     * @return - OidcRegisteredService
     */
    @GetMapping("generate")
    public OidcRegisteredService generate() {
        val service = new OidcRegisteredService();
        val rg = new DefaultRandomStringGenerator();
        service.setClientId(rg.getNewString());
        service.setClientSecret(rg.getNewString());
        val policy = new ReturnAllAttributeReleasePolicy();
        service.setAttributeReleasePolicy(policy);
        return service;
    }

    /**
     * Generates a new random string used for client Id and Secrets.
     *
     * @return - Random String value
     */
    @GetMapping({"generateId", "generateSecret"})
    public String generateId() {
        return new DefaultRandomStringGenerator().getNewString();
    }

}
