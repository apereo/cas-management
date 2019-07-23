package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.domain.Cache;
import org.apereo.cas.mgmt.domain.Server;
import org.apereo.cas.mgmt.domain.System;

import lombok.RequiredArgsConstructor;
import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

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

}
