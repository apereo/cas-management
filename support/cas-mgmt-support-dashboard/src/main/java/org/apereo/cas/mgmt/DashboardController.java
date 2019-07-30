package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Attributes;
import org.apereo.cas.mgmt.domain.Cache;
import org.apereo.cas.mgmt.domain.Server;
import org.apereo.cas.mgmt.domain.SsoSessionResponse;
import org.apereo.cas.mgmt.domain.SystemHealth;
import org.apereo.cas.util.serialization.TicketIdSanitizationUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apereo.inspektr.audit.AuditActionContext;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Rest API controller for the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Slf4j
@RestController
@RequestMapping(path = "api/dashboard", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class DashboardController {

    private final CasUserProfileFactory casUserProfileFactory;

    private final CasManagementConfigurationProperties mgmtProperties;

    private final CasConfigurationProperties casProperties;

    /**
     * Method returns a list of Server statuses for all configured cas servers in the cluster.
     *
     * @param request - the request
     * @param response - the response
     * @return - List of Server
     * @throws IllegalAccessException - insufficient permission
     */
    @GetMapping
    public List<Server> status(final HttpServletRequest request, final HttpServletResponse response) throws IllegalAccessException {
        isAdmin(request, response);
        return mgmtProperties.getCasServers().stream()
                .map(this::getServer)
                .collect(Collectors.toList());
    }

    /**
     * Returns the server status for the configured CAS server at the passed index.
     *
     * @param request - the request
     * @param response - the response
     * @param index - index of CAS server
     * @return - Server
     * @throws IllegalAccessException - insufficient permission
     */
    @GetMapping("{index}")
    public Server update(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @PathVariable int index) throws IllegalAccessException {
        isAdmin(request, response);
        return getServer(mgmtProperties.getCasServers().get(index));
    }

    private Server getServer(final CasManagementConfigurationProperties.CasServers s) {
        val server = new Server();
        server.setName(s.getName());
        server.setSystem(callCasServer(s.getUrl(), "/actuator/health/system",
                new ParameterizedTypeReference<SystemHealth>() {}));
        return server;
    }

    /**
     * Method calls the CAS Cluster pool for health info.
     *
     * @param request - the request
     * @param response - the response
     * @return - Server health
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("/cache")
    public Cache cache(final HttpServletRequest request, final HttpServletResponse response) throws IllegalAccessException {
        isAdmin(request, response);
        val url = "/actuator/health/" + mgmtProperties.getCacheHealthIndicator();
        return callCasServer(url, new ParameterizedTypeReference<Cache>(){});
    }

    /**
     * Method calls the CAS Server resolveAttribute for the passed user and returns a map of attributes.
     *
     * @param response - the response
     * @param request - the request
     * @param id - the user id
     * @return - the attributes
     * @throws IllegalAccessException - insufficient persmissions
     */
    @GetMapping("/resolve/{id}")
    public Map<String, List<String>> resolve(final HttpServletRequest request,
                                             final HttpServletResponse response,
                                             final @PathVariable String id) throws IllegalAccessException {
        isAdmin(request, response);
        return this.<Attributes>callCasServer("/actuator/resolveAttributes/" + id,
                new ParameterizedTypeReference<Attributes>() {}).getAttributes();
    }

    /**
     * Method calls the CAS Server releaseAttributes for the passed user and service and returns map of attributes.
     *
     * @param request - the request
     * @param response - the response
     * @param data - map
     * @return - the attributes
     * @throws IllegalAccessException - insufficient permissions
     */
    @PostMapping("/release")
    public Map<String, List<String>> release(final HttpServletRequest request,
                                             final HttpServletResponse response,
                                             final @RequestBody Map<String, String> data) throws IllegalAccessException {
        isAdmin(request, response);
        return this.<Attributes>callCasServer("/actuator/releaseAttributes", data,
                new ParameterizedTypeReference<Attributes>() {}).getAttributes();
    }

    /**
     * Method calls the CAS server info endpoint to display deployed cas Server info.
     *
     * @param request - the request
     * @param response - the response
     * @return - map of info details
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("/info")
    public Map<String, Object> info(final HttpServletRequest request,
                                    final HttpServletResponse response) throws IllegalAccessException {
        isAdmin(request, response);
        return callCasServer("/actuator/info", new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    /**
     * Method calls the /auditLog endpoint in all registered CAS Servers with passef query parameters.
     * Responses from all servers are then sorted together by whenActionWasPerformed fields in the responses.
     *
     * @param request - the request
     * @param response - the response
     * @param query - query params
     * @return - List of matching audit entries
     * @throws IllegalAccessException - insufficient permissions
     */
    @PostMapping("/audit")
    public List<AuditActionContext> audit(final HttpServletRequest request,
                                          final HttpServletResponse response,
                                          final @RequestBody Map<String, String> query) throws IllegalAccessException {
        isAdmin(request, response);
        return mgmtProperties.getCasServers().stream()
                .flatMap(p -> this.<List<AuditActionContext>>callCasServer(p.getUrl(), "/actuator/auditLog",
                        query, new ParameterizedTypeReference<List<AuditActionContext>>() {}).stream())
                .sorted(Comparator.comparing(AuditActionContext::getWhenActionWasPerformed))
                .collect(Collectors.toList());
    }

    /**
     * Looks up SSO sessions in the CAS cluster based on the passed user id.
     *
     * @param request - the request
     * @param response - the response
     * @return - SsoSessionResponse
     * @throws IllegalAccessException - Illegal Access
     */
    @GetMapping("sessions")
    public SsoSessionResponse getSession(final HttpServletRequest request,
                                         final HttpServletResponse response) throws IllegalAccessException {
        isAdmin(request, response);
        return getSsoSessions("/actuator/ssoSessions?type=ALL", true);
    }

    /**
     * Deletes a users sso session based on the passed tgt string.
     *
     * @param tgt - th tgt id
     * @param response - the response
     * @param request - the request
     * @throws IllegalAccessException - Illegal Access
     **/
    @DeleteMapping("sessions/{tgt}")
    public void revokeSession(final @PathVariable String tgt,
                              final HttpServletResponse response,
                              final HttpServletRequest request) throws IllegalAccessException {
        isAdmin(request, response);
        val sess = getSsoSessions("/actuator/ssoSessions?type=ALL", false);
        val owns = sess.getActiveSsoSessions().stream()
                 .filter(s -> TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket()).equals(tgt)).findFirst();
        if (!owns.isPresent()) {
            throw new IllegalAccessException("Permission Denied");
        }
        val tgtMapped = owns.get().getTicketGrantingTicket();
        if (tgtMapped != null && tgtMapped.length() > 0) {
            val restTemplate = new RestTemplate();
            val serverUrl = casProperties.getServer().getPrefix() + "/actuator/ssoSessions";
            restTemplate.delete(serverUrl + "/" + tgtMapped);
        }
    }

    private SsoSessionResponse getSsoSessions(final String serverUrl, final boolean mask) {
        val resp = callCasServer(serverUrl, new ParameterizedTypeReference<SsoSessionResponse>() {});
        if (mask) {
            resp.getActiveSsoSessions().forEach(s -> s.setTicketGrantingTicket(TicketIdSanitizationUtils.sanitize(s.getTicketGrantingTicket())));
        }
        return resp;
    }

    private <T> T callCasServer(final String url, final ParameterizedTypeReference<T> type) {
        return callCasServer(casProperties.getServer().getPrefix(), url, type);
    }

    private <T> T callCasServer(final String prefix, final String endpoint, final ParameterizedTypeReference<T> type) {
        val rest = new RestTemplate();
        try {
            val resp = rest.exchange(prefix + endpoint, HttpMethod.GET, null, type);
            return resp.getStatusCode().is2xxSuccessful() ? (T) resp.getBody() : null;
        } catch (final RestClientException e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }

    }

    private <T> T callCasServer(final String endpoint, final Object data, final ParameterizedTypeReference<T> type) {
        return callCasServer(casProperties.getServer().getPrefix(), endpoint, data, type);
    }

    @SneakyThrows
    private <T> T callCasServer(final String prefix, final String endpoint, final Object data, final ParameterizedTypeReference<T> type) {
        val rest = new RestTemplate();
        val headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        val send = new ObjectMapper().writeValueAsString(data);
        val req = new HttpEntity<String>(send, headers);
        try {
            val resp = rest.exchange(prefix + endpoint, HttpMethod.POST, req, type);
            return resp.getStatusCode().is2xxSuccessful() ? (T) resp.getStatusCode() : null;
        } catch (final RestClientException e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }

    private void isAdmin(final HttpServletRequest request, final HttpServletResponse response) throws IllegalAccessException {
        if (!casUserProfileFactory.from(request, response).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
    }
}
