package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;

import lombok.RequiredArgsConstructor;
import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * REST API controller for token info used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController
@RequestMapping(path = "api/tokens", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class TokensController {

    private final CasManagementConfigurationProperties mgmtProperties;

    /**
     * Returns all active tokens in the CAS cluster.
     *
     * @return - List of Access Tokens
     */
    @GetMapping
    public List<Object> tokens() {
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl() + "/actuator/oauthTokens";
        val resp = restTemplate.getForEntity(serverUrl, List.class);
        return resp.getBody();
    }

    /**
     * Deletes the token from the CAS cluster based on the passed token id.
     *
     * @param id - the token id
     */
    @DeleteMapping("{id}")
    public void deleteToken(final @PathVariable String id) {
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl() + "/actuator/oauthTokens";
        restTemplate.delete(serverUrl + "/" + id);
    }
}

