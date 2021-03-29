package org.apereo.cas.mgmt;

import org.apereo.cas.services.OidcRegisteredService;
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
    public OAuthRegisteredService generateOauth() {
        val service = new OAuthRegisteredService();
        service.setClientId(generateId());
        service.setClientSecret(generateId());
        return service;
    }

    /**
     * Creates and returns a new OidcRegisteredService with generated client id and secret.
     *
     * @return - OidcRegisteredService
     */
    @GetMapping("generate/oidc")
    public OidcRegisteredService generateOidc() {
        val service = new OidcRegisteredService();
        service.setClientId(generateId());
        service.setClientSecret(generateId());
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
