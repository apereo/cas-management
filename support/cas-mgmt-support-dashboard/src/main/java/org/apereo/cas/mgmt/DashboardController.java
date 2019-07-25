package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.domain.Attributes;
import org.apereo.cas.mgmt.domain.Cache;
import org.apereo.cas.mgmt.domain.Server;
import org.apereo.cas.mgmt.domain.System;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;

import org.apereo.inspektr.audit.AuditActionContext;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
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
@RestController
@RequestMapping(path = "api/dashboard", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class DashboardController {

    private final CasManagementConfigurationProperties mgmtProperties;

    private final CasConfigurationProperties casProperties;

    /**
     * Method returns a list of Server statuses for all configured cas servers in the cluster.
     *
     * @return - List of Server
     */
    @GetMapping
    public List<Server> status() {
        val servers = new ArrayList();
        mgmtProperties.getCasServers().forEach(s -> {
            val server = new Server();
            server.setName(s.getName());
            server.setSystem(queryServer(s.getUrl()));
            servers.add(server);
        });
        return servers;
    }

    /**
     * Returns the server status for the configured CAS server at the passed index.
     *
     * @param index - index of CAS server
     * @return - Server
     */
    @GetMapping("{index}")
    public Server update(final @PathVariable int index) {
        val props = mgmtProperties.getCasServers().get(index);
        val server = new Server();
        server.setName(props.getName());
        server.setSystem(queryServer(props.getUrl()));
        return server;
    }

    /**
     * Method calls the CAS Cluster pool for health info.
     *
     * @return - Server health
     */
    @GetMapping("/cache")
    public Cache cache() {
        val server = new Server();
        val restTemplate = new RestTemplate();
        val url = mgmtProperties.getCasServers().get(0).getUrl();
        val serverUrl = url + "/actuator/health/hazelcast";
        val resp = restTemplate.getForEntity(serverUrl, Cache.class);
        return resp.getBody();
    }

    private System queryServer(final String url) {
        val restTemplate = new RestTemplate();
        val serverUrl = url + "/actuator/health/system";
        val resp = restTemplate.getForEntity(serverUrl, System.class);
        return resp.getBody();
    }

    /**
     * Method calls the CAS Server resolveAttribute for the passed user and returns a map of attributes.
     *
     * @param id - the user id
     * @return - the attributes
     */
    @GetMapping("/resolve/{id}")
    public Map<String, List<String>> resolve(final @PathVariable String id) {
        val restTemplate = new RestTemplate();
        val url = mgmtProperties.getCasServers().get(0).getUrl();
        val serverUrl = url + "/actuator/resolveAttributes/" + id;
        val resp = restTemplate.getForEntity(serverUrl, Attributes.class);
        return resp.getBody().getAttributes();
    }

    /**
     * Method calls the CAS Server releaseAttributes for the passed user and service and returns map of attributes.
     *
     * @param data - map
     * @return - the attributes
     */
    @PostMapping("/release")
    @SneakyThrows
    public Map<String, List<String>> release(final @RequestBody Map<String, String> data) {
        val restTemplate = new RestTemplate();
        val url = mgmtProperties.getCasServers().get(0).getUrl();
        val serverUrl = url + "/actuator/releaseAttributes";
        val headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        val send = new ObjectMapper().writeValueAsString(data);
        val req = new HttpEntity<String>(send, headers);
        val resp = restTemplate.postForEntity(serverUrl, req, Attributes.class);
        return resp.getBody().getAttributes();
    }

    @GetMapping("/info")
    public Map<String, Object> info() {
        val restTemplate = new RestTemplate();
        val url = mgmtProperties.getCasServers().get(0).getUrl();
        val serverUrl = url + "/actuator/info";
        val resp = restTemplate.getForEntity(serverUrl, Map.class);
        return resp.getBody();
    }

    @PostMapping("/audit")
    @SneakyThrows
    public List<AuditActionContext> audit(final @RequestBody Map<String, String> data) {
        return mgmtProperties.getCasServers().stream()
                .flatMap(p -> getServerAudit(p.getUrl(), data).stream())
                .sorted(Comparator.comparing(AuditActionContext::getWhenActionWasPerformed))
                .collect(Collectors.toList());
    }

    @SneakyThrows
    private List<AuditActionContext> getServerAudit(final String url, final Map<String, String> data) {
        val restTemplate = new RestTemplate();
        val serverUrl = url + "/actuator/auditLog";
        val headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        val send = new ObjectMapper().writeValueAsString(data);
        val req = new HttpEntity<String>(send, headers);
        val resp = restTemplate.exchange(serverUrl, HttpMethod.POST, req, new ParameterizedTypeReference<List<AuditActionContext>>(){});
        return resp.getBody();
    }
}
