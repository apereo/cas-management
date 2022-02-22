package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.CasServers;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.Attributes;
import org.apereo.cas.mgmt.domain.AuditLog;
import org.apereo.cas.mgmt.domain.Cache;
import org.apereo.cas.mgmt.domain.Server;
import org.apereo.cas.mgmt.domain.SystemHealth;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
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

    private final CasManagementConfigurationProperties mgmtProperties;

    private final CasConfigurationProperties casProperties;

    /**
     * Method returns a list of Server statuses for all configured cas servers in the cluster.
     *
     * @param authentication - the user
     * @return - List of Server
     * @throws IllegalAccessException - insufficient permission
     */
    @GetMapping
    public List<Server> status(final Authentication authentication) throws IllegalAccessException {
        isAdmin(authentication);
        return mgmtProperties.getCasServers().stream()
                .map(DashboardController::getServer)
                .collect(Collectors.toList());
    }

    /**
     * Returns the server status for the configured CAS server at the passed index.
     *
     * @param authentication - the user
     * @param index - index of CAS server
     * @return - Server
     * @throws IllegalAccessException - insufficient permission
     */
    @GetMapping("{index}")
    public Server update(final Authentication authentication,
                         @PathVariable final int index) throws IllegalAccessException {
        isAdmin(authentication);
        return getServer(mgmtProperties.getCasServers().get(index));
    }

    private static Server getServer(final CasServers s) {
        val server = new Server();
        server.setName(s.getName());
        server.setSystem(callCasServer(s.getUrl(), "/actuator/health",
                new ParameterizedTypeReference<SystemHealth>() {}));
        return server;
    }

    /**
     * Method calls the CAS Cluster pool for health info.
     *
     * @param authentication - the user
     * @return - Server health
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("/cache")
    public Cache cache(final Authentication authentication) throws IllegalAccessException {
        isAdmin(authentication);
        val url = "/actuator/health/" + mgmtProperties.getCacheHealthIndicator();
        return callCasServer(url, new ParameterizedTypeReference<Cache>(){});
    }

    /**
     * Method calls the CAS Server resolveAttribute for the passed user and returns a map of attributes.
     *
     * @param authentication - the response
     * @param id - the user id
     * @return - the attributes
     * @throws IllegalAccessException - insufficient persmissions
     */
    @GetMapping("/resolve/{id}")
    public Map<String, List<String>> resolve(final Authentication authentication,
                                             @PathVariable final String id) throws IllegalAccessException {
        isAdmin(authentication);
        return this.<Attributes>callCasServer("/actuator/resolveAttributes/" + id,
                new ParameterizedTypeReference<Attributes>() {}).getAttributes();
    }

    /**
     * Method calls the CAS Server releaseAttributes for the passed user and service and returns map of attributes.
     *
     * @param authentication - the request
     * @param data - map
     * @return - the attributes
     * @throws IllegalAccessException - insufficient permissions
     */
    @PostMapping(value = "/release", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<String>> release(final Authentication authentication,
                                             @RequestBody final Map<String, String> data) throws IllegalAccessException {
        isAdmin(authentication);
        return this.<Attributes>callCasServer("/actuator/releaseAttributes", data,
                new ParameterizedTypeReference<Attributes>() {}).getAttributes();
    }

    /**
     * Method calls the CAS Server samlResponse for the passed user and service and returns the produced SAML Response.
     *
     * @param authentication - the request
     * @param data - SAML Response
     * @return - the attributes
     * @throws IllegalAccessException - insufficient permissions
     */
    @PostMapping("/response")
    public String response(final Authentication authentication,
                           @RequestBody final Map<String, String> data) throws IllegalAccessException {
        isAdmin(authentication);
        return this.<String>callCasServer("/actuator/samlPostProfileResponse", data,
                new ParameterizedTypeReference<String>() {});
    }

    /**
     * Method calls the CAS server info endpoint to display deployed cas Server info.
     *
     * @param authentication - the user
     * @return - map of info details
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("/info")
    public Map<String, Object> info(final Authentication authentication) throws IllegalAccessException {
        isAdmin(authentication);
        return callCasServer("/actuator/info", new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    /**
     * Method calls the CAS servers to query all set loggers and return a map to the client.
     *
     * @param authentication - the request
     * @return - Map of Loggers for all configured servers
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping("/loggers")
    public Map<String, Map<String, Object>> loggers(final Authentication authentication) throws IllegalAccessException {
        isAdmin(authentication);
        val ret = new HashMap<String, Map<String, Object>>();
        mgmtProperties.getCasServers().forEach(s -> {
            val map = callCasServer("/actuator/loggers", new ParameterizedTypeReference<Map<String, Object>>() {});
            ret.put(s.getName(), (Map<String, Object>) map.get("loggers"));
        });
        return ret;
    }

    /**
     * Method will update a logger on a CAS server to the passed log level.
     *
     * @param authentication - the request
     * @param map - server, logger, level
     * @throws IllegalAccessException - insufficient persmissions
     */
    @PostMapping("/loggers")
    @ResponseStatus(HttpStatus.OK)
    public void setLogger(final Authentication authentication,
                          @RequestBody final Map<String, String> map) throws IllegalAccessException {
        isAdmin(authentication);
        val level = Map.of("configuredLevel", map.get("level"));
        val server = mgmtProperties.getCasServers().stream().filter(s -> s.getName().equals(map.get("server"))).findFirst().get().getUrl();
        callCasServer(server, "/actuator/loggers/" + map.get("key"), level, new ParameterizedTypeReference<Void>() {});
    }

    /**
     * Method calls the /auditLog endpoint in all registered CAS Servers with passef query parameters.
     * Responses from all servers are then sorted together by whenActionWasPerformed fields in the responses.
     *
     * @param authentication - the user
     * @param request - the request
     * @param query - query params
     * @return - List of matching audit entries
     * @throws IllegalAccessException - insufficient permissions
     */
    @PostMapping("/audit")
    public List<AuditLog> audit(final Authentication authentication, final HttpServletRequest request,
                                @RequestBody final Map<String, String> query) throws IllegalAccessException {
        isAdmin(authentication);
        val audit = mgmtProperties.getCasServers().stream()
                .flatMap(p -> callCasServer(p.getUrl(), "/actuator/auditLog",
                        query, new ParameterizedTypeReference<List<AuditLog>>() {}).stream()
                        .map(a -> {
                            a.setServerIpAddress(p.getName());
                            return a;
                        }))
                .sorted(Comparator.comparing(AuditLog::getWhenActionWasPerformed).reversed())
                .collect(Collectors.toList());
        request.getSession().setAttribute("audit", audit);
        if ("true".equals(query.get("download"))) {
            return null;
        }
        return audit;
    }

    /**
     * Downloads audit log query result into plain file that is | delimited.
     *
     * @param request - the request.
     * @param response - the response.
     * @param authentication - the user
     */
    @GetMapping("/audit/download")
    @SneakyThrows
    public void downloadAudit(final HttpServletRequest request,
                              final HttpServletResponse response,
                              final Authentication authentication) {
        isAdmin(authentication);
        val log = (List<AuditLog>) request.getSession().getAttribute("audit");
        if (log != null) {
            val out = response.getWriter();
            response.setHeader("Content-Type", MediaType.TEXT_PLAIN_VALUE);
            response.setHeader("Content-Disposition", "attachment; filename=audit-log-" + new Date().getTime() + ".txt");
            log.stream().map(DashboardController::toCSV).forEach(out::println);
            out.close();
        }
    }

    private static String toCSV(final AuditLog log) {
        return new StringBuilder()
               .append(log.getWhenActionWasPerformed())
               .append('|')
               .append(log.getClientIpAddress())
               .append('|')
               .append(log.getServerIpAddress())
               .append('|')
               .append(log.getPrincipal())
               .append('|')
               .append(log.getActionPerformed())
               .append('|')
               .append(log.getResourceOperatedUpon())
               .append('|')
               .append(log.getApplicationCode())
               .toString();
    }

    private <T> T callCasServer(final String url, final ParameterizedTypeReference<T> type) {
        return callCasServer(casProperties.getServer().getPrefix(), url, type);
    }

    private static <T> T callCasServer(final String prefix, final String endpoint, final ParameterizedTypeReference<T> type) {
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
    private static <T> T callCasServer(final String prefix, final String endpoint, final Object data, final ParameterizedTypeReference<T> type) {
        val rest = new RestTemplate();
        val headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        val send = new ObjectMapper().writeValueAsString(data);
        val req = new HttpEntity<String>(send, headers);
        try {
            val resp = rest.exchange(prefix + endpoint, HttpMethod.POST, req, type);
            return resp.getStatusCode().is2xxSuccessful() ? (T) resp.getBody() : null;
        } catch (final RestClientException e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }

    private static void isAdmin(final Authentication authentication) throws IllegalAccessException {
        if (!CasUserProfile.from(authentication).isAdministrator()) {
            throw new IllegalAccessException("Permission Denied");
        }
    }
}
