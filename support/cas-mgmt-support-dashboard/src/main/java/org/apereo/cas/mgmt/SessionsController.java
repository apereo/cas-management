package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.SsoSessionResponse;
import org.apereo.cas.util.serialization.TicketIdSanitizationUtils;

import lombok.RequiredArgsConstructor;
import lombok.val;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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
import java.util.stream.Collectors;

import static org.apereo.cas.util.crypto.CipherExecutor.LOGGER;

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

    private final CasConfigurationProperties casProperties;

    /**
     * Looks up SSO sessions in the CAS cluster based on the passed user id.
     *
     * @param request - the request
     * @param response - the response
     * @return - SsoSessionResponse
     * @throws IllegalAccessException - Illegal Access
     */
    @GetMapping
    public SsoSessionResponse getSession(final HttpServletRequest request,
                                         final HttpServletResponse response) throws IllegalAccessException {
        isAdmin(request, response);
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                + "/actuator/ssoSessions?type=ALL";
        return getSsoSessions(serverUrl, true);
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
        String tgtMapped = null;
        if (!casUser.isAdministrator()) {
            val sess = getSsoSessions(casProperties.getServer().getPrefix()
                    + "/actuator/ssoSessions?type=ALL", false);
            val owns = sess.getActiveSsoSessions().stream()
                    .filter(s -> TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket()).equals(tgt)).findFirst();
            if (!owns.isPresent()) {
                throw new IllegalAccessException("Permission Denied");
            }
            tgtMapped = owns.get().getTicketGrantingTicket();
        } else {
            val sess = getSsoSessions(casProperties.getServer().getPrefix()
                    + "/actuator/ssoSessions?type=ALL", false);
            val owns = sess.getActiveSsoSessions().stream()
                    .filter(s -> TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket()).equals(tgt)).findFirst();
            if (!owns.isPresent()) {
                throw new IllegalAccessException("Permission Denied");
            }
            tgtMapped = owns.get().getTicketGrantingTicket();
        }
        if (tgtMapped != null && tgtMapped.length() > 0) {
            val restTemplate = new RestTemplate();
            val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                    + "/actuator/ssoSessions";
            restTemplate.delete(serverUrl + "/" + tgtMapped);
        }
    }

    private SsoSessionResponse getSsoSessions(final String serverUrl, final boolean mask) {
        val restTemplate = new RestTemplate();
        val resp = restTemplate.getForEntity(serverUrl, SsoSessionResponse.class).getBody();
        if (mask) {
            resp.getActiveSsoSessions().forEach(s -> s.setTicketGrantingTicket(TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket())));
        }
        return resp;
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
        LOGGER.info("Attempting to revoke all sessions for [{}]", casUser.getId());
        val restTemplate = new RestTemplate();
        val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                + "/actuator/ssoSessions";
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
     * @param tgts - List of TGT ids to revoke
     *
     */
    @PostMapping("bulkRevoke")
    @ResponseStatus(HttpStatus.OK)
    public void bulkRevoke(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @RequestBody List<String> tgts) {
        LOGGER.info("Attempting to revoke [{}]", tgts);
        val casUser = casUserProfileFactory.from(request, response);
        val tickets = new ArrayList<String>();
        val sess = getSsoSessions(casProperties.getServer().getPrefix()
                + "/actuator/ssoSessions?type=ALL", false);
        tgts.forEach(t -> {
            val owns = sess.getActiveSsoSessions().stream()
                    .filter(s -> TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket()).equals(t)).findFirst();
            if (owns.isPresent()) {
                tickets.add(owns.get().getTicketGrantingTicket());
            }
        });
        if (tickets.size() > 0) {
            val restTemplate = new RestTemplate();
            val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                    + "/actuator/ssoSessions";
            val headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            val req = new HttpEntity<String>("{\"tickets\": \""
                    + tickets.stream().collect(Collectors.joining(",")) + "\"}", headers);
            restTemplate.exchange(serverUrl, HttpMethod.POST, req, Void.class);
        }
    }

    private void isAdmin(final HttpServletRequest request, final HttpServletResponse response) throws IllegalAccessException {
        if (!casUserProfileFactory.from(request, response).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
    }
}
