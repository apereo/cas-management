package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
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

    /**
     * Looks up SSO sessions in the CAS cluster based on the passed user id.
     *
     * @param user - the user regexp query
     * @return - SsoSessionResponse
     */
    @GetMapping("{user}")
    public SsoSessionResponse getSession(final @PathVariable String user) {
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
     */
    @DeleteMapping("{tgt}")
    public void revokeSession(final @PathVariable String tgt) {
        if (tgt != null && tgt.length() > 0) {
            val restTemplate = new RestTemplate();
            val serverUrl = mgmtProperties.getCasServers().get(0).getUrl()
                    + "/actuator/ssoSessions";
            restTemplate.delete(serverUrl + "/" + tgt);
        }
    }
}
