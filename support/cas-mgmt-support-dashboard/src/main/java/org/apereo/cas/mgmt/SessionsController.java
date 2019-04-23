package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.SsoSessionResponse;

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

import static org.apereo.cas.CipherExecutor.LOGGER;

/**
 * REST API for session info for the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController
@RequestMapping(path ="api/sessions", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class SessionsController {

    private final CasManagementConfigurationProperties mgmtProperties;

    private final CasUserProfileFactory casUserProfileFactory;

    /**
     * Retrieves the sessions of the logged in user.
     *
     * @param response - the response
     * @param request - the request
     * @return - SsoSessionResponse
     */
    @GetMapping
    public SsoSessionResponse getUserSession(final HttpServletResponse response,
                                             final HttpServletRequest request) {
        val casUser = casUserProfileFactory.from(request, response);
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                + "/actuator/ssoSessions?user=" + casUser.getId() + "&type=ALL";
        val resp = restTemplate.getForEntity(serverUrl, SsoSessionResponse.class);
        return resp.getBody();
    }

    /**
     * Looks up SSO sessions in the CAS cluster based on the passed user id.
     *
     * @param user - the user regexp query
     * @param request - the request
     * @param response - the response
     * @return - SsoSessionResponse
     * @throws IllegalAccessException - Illegal Access
     */
    @GetMapping("{user}")
    public SsoSessionResponse getSession(final @PathVariable String user,
                                         final HttpServletRequest request,
                                         final HttpServletResponse response) throws IllegalAccessException {
        if (!casUserProfileFactory.from(request, response).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                + "/actuator/ssoSessions?user=" + user + "&type=ALL";
        val resp = restTemplate.getForEntity(serverUrl, SsoSessionResponse.class);
        return resp.getBody();
    }

    /**
     * Deletes a users sso session based on the passed tgt string.
     *
     * @param tgt - th tgt id
     * @param response - the response
     * @param request - the request
     * @throws IllegalAccessException - Illegal Access
     **/
    @DeleteMapping("{tgt}")
    public void revokeSession(final @PathVariable String tgt,
                              final HttpServletResponse response,
                              final HttpServletRequest request) throws IllegalAccessException {
        LOGGER.info("Attempting to revoke [{}]", tgt);
        val casUser = casUserProfileFactory.from(request, response);
        if (!casUser.isAdministrator()) {
            val sess = getUserSession(response, request);
            val owns = sess.getActiveSsoSessions().stream().anyMatch(s -> s.getTicketGrantingTicket().equals(tgt));
            if (!owns) {
                throw new IllegalAccessException("Permission Denied");
            }
        }
        if (tgt != null && tgt.length() > 0) {
            val restTemplate = new RestTemplate();
            val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                    + "/actuator/ssoSessions";
            restTemplate.delete(serverUrl + "/" + tgt);
        }
    }
}
