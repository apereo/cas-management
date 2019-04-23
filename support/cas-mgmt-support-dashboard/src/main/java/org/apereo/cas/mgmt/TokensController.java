package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.RequiredArgsConstructor;
import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    private final CasUserProfileFactory casUserProfileFactory;

    /**
     * Returns all active tokens in the CAS cluster for the logged in User.
     *
     * @param response - the response
     * @param request - the request
     * @return - List of Access Tokens
     */
    @GetMapping
    public List<Object> userTokens(final HttpServletResponse response, final HttpServletRequest request) {
        val casUser = casUserProfileFactory.from(request, response);
        return retrieveTokens(casUser.getId());
    }

    /**
     * Returns all active tokens in the CAS cluster.
     *
     * @param user - the user
     * @param request - the request
     * @param response - the response
     * @return - List of Access Tokens
     * @throws IllegalAccessException - Illegal Access
    */
    @GetMapping("{user}")
    public List<Object> tokens(final @PathVariable String user,
                               final HttpServletRequest request,
                               final HttpServletResponse response) throws IllegalAccessException {
        if (!casUserProfileFactory.from(request, response).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
        return retrieveTokens(user);
    }

    private List<Object> retrieveTokens(final String user) {
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl() + "/actuator/oauthTokens";
        val resp = restTemplate.getForEntity(serverUrl, List.class);
        val tokens = (List<Object>) resp.getBody().stream()
                .filter(t -> ((Map) t).get("principal").equals(user))
                .collect(Collectors.toList());
        return tokens;
    }

    /**
     * Deletes the token from the CAS cluster based on the passed token id.
     *
     * @param id - the token id
     * @param request - the request
     * @param response - the response
     * @throws IllegalAccessException - Illegal Access
     */
    @DeleteMapping("{id}")
    public void deleteToken(final @PathVariable String id,
                            final HttpServletRequest request,
                            final HttpServletResponse response) throws IllegalAccessException {
        val casUser = casUserProfileFactory.from(request, response);
        if (!casUser.isAdministrator()) {
            val owns =retrieveTokens(casUser.getId()).stream()
                    .anyMatch(t -> ((Map) t).get("id").equals(id));
            if (!owns) {
                throw new IllegalAccessException("Permision Denied");
            }
        }
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl() + "/actuator/oauthTokens";
        restTemplate.delete(serverUrl + "/" + id);
    }
}

