package org.apereo.cas.mgmt;

import org.apereo.cas.OAuthTokenInfo;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.json.JSONArray;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.apereo.cas.CipherExecutor.LOGGER;

/**
 * REST API controller for token info used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController
@RequestMapping(path = "api/tokens", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class TokensController {

    private final CasManagementConfigurationProperties mgmtProperties;

    private final CasUserProfileFactory casUserProfileFactory;

    private final CasConfigurationProperties casProperties;

    /**
     * Returns all active tokens in the CAS cluster for the logged in User.
     *
     * @param response - the response
     * @param request - the request
     * @return - List of Access Tokens
     */
    @GetMapping
    public List<OAuthTokenInfo> userTokens(final HttpServletResponse response, final HttpServletRequest request) {
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
    public List<OAuthTokenInfo> tokens(final @PathVariable String user,
                               final HttpServletRequest request,
                               final HttpServletResponse response) throws IllegalAccessException {
        if (!casUserProfileFactory.from(request, response).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
        return retrieveTokens(user);
    }

    private List<OAuthTokenInfo> retrieveTokens(final String user) {
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl() + "/actuator/oauthTokens";
        val tokens = restTemplate.getForEntity(serverUrl + "/" + user, Tokens.class).getBody();
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

    /**
     * Method to revoke all sessions by user.
     *
     * @param request - the request
     * @param response - the response
     */
    @GetMapping("revokeAll")
    @ResponseStatus(HttpStatus.OK)
    public void revokeAll(final HttpServletRequest request, final HttpServletResponse response) {
        val casUser = casUserProfileFactory.from(request, response);
        LOGGER.info("Attempting to revoke all tokens for [{}]", casUser.getId());
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                + "/actuator/oauthTokens";
        val headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        val req = new HttpEntity(null, headers);
        restTemplate.postForObject(serverUrl + "/" + casUser.getId(), req, Void.class);
    }

    /**
     * Method to revoke all sessions by user.
     *
     * @param request - the request
     * @param response - the response
     * @param tokens - List of Token ids to revoke
     *
     */
    @PostMapping("bulkRevoke")
    @ResponseStatus(HttpStatus.OK)
    public void bulkRevoke(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @RequestBody List<String> tokens) {
        LOGGER.info("Attempting to revoke [{}]", tokens);
        val casUser = casUserProfileFactory.from(request, response);
        val tokensMapped = new ArrayList<String>();
        val owned = retrieveTokens(casUser.getId());
        tokens.forEach(t -> {
            val owns = owned.stream()
                    .filter(s -> s.getId().equals(t)).findFirst();
            if (owns.isPresent()) {
                tokensMapped.add(t);
            }
        });
        if (tokensMapped.size() > 0) {
            val reqObj = new JSONArray();
            tokensMapped.forEach(t -> reqObj.put(t));
            val restTemplate = new RestTemplate();
            val serverUrl = casProperties.getServer().getPrefix()
                    + "/actuator/oauthTokens";
            val headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            val req = new HttpEntity<String>("{\"tokens\" :\""
                    + tokensMapped.stream().collect(Collectors.joining(",")) + "\"}", headers);
            restTemplate.postForObject(serverUrl, req, Void.class);
        }
    }

    private static class Tokens extends ArrayList<OAuthTokenInfo> {

    }
}

