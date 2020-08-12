package org.apereo.cas.mgmt;

import org.apereo.cas.services.ReturnMappedAttributeReleasePolicy;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
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
@RestController("casManagementOauthController")
@RequestMapping(path = "api/oauth", produces = MediaType.APPLICATION_JSON_VALUE)
public class OauthController {

    /**
     * Endpoint to create a new OAuthRegisteredService with generated client id and secret along with a ReleasePolicy.
     *
     * @return - OAuthRegisteredService
     */
    @GetMapping("generate")
    public OAuthRegisteredService generate() {
        val service = new OAuthRegisteredService();
        val rg = new DefaultRandomStringGenerator();
        service.setClientId(rg.getNewString());
        service.setClientSecret(rg.getNewString());
        val policy = new ReturnMappedAttributeReleasePolicy();
        service.setAttributeReleasePolicy(policy);
        return service;
    }
}
