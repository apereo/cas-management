package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.cas.client.CasClient;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.client.Client;
import org.pac4j.core.client.direct.AnonymousClient;
import org.pac4j.http.client.direct.IpClient;
import org.pac4j.http.credentials.authenticator.IpRegexpAuthenticator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.util.StringUtils;
import java.util.ArrayList;
import java.util.List;

/**
 * This is {@link CasManagementAuthenticationConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@AutoConfiguration
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementAuthenticationConfiguration {

    @Bean
    public List<Client> authenticationClients(
        @Qualifier("staticAdminRolesAuthorizationGenerator")
        final AuthorizationGenerator staticAdminRolesAuthorizationGenerator,
        @Qualifier("authorizationGenerator")
        final AuthorizationGenerator authorizationGenerator,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties) {
        val clients = new ArrayList<Client>();

        if (managementProperties.isCasSso()) {
            LOGGER.debug("Configuring an authentication strategy based on CAS running at [{}]", casProperties.getServer().getName());
            val cfg = new CasConfiguration(casProperties.getServer().getLoginUrl());
            val client = new CasClient(cfg);
            client.setAuthorizationGenerator(authorizationGenerator);
            client.setName("CasClient");
            clients.add(client);
        } else {
            LOGGER.debug("Skipping CAS authentication strategy configuration; because you turned off the flag for CAS SSO");
        }

        if (StringUtils.hasText(managementProperties.getAuthzIpRegex())) {
            LOGGER.info("Configuring an authentication strategy based on authorized IP addresses matching [{}]", managementProperties.getAuthzIpRegex());
            val ipClient = new IpClient(new IpRegexpAuthenticator(managementProperties.getAuthzIpRegex()));
            ipClient.setName("IpClient");
            ipClient.setAuthorizationGenerator(staticAdminRolesAuthorizationGenerator);
            clients.add(ipClient);
        } else {
            LOGGER.debug("Skipping IP address authentication strategy configuration; no pattern is defined");
        }

        if (clients.isEmpty()) {
            LOGGER.warn("No authentication strategy is defined, CAS will establish an anonymous authentication mode whereby access is immediately granted. "
                        + "This may NOT be relevant for production purposes. Consider configuring alternative authentication strategies for maximum security.");
            val anon = new AnonymousClient();
            anon.setAuthorizationGenerator(staticAdminRolesAuthorizationGenerator);
            clients.add(anon);
        }
        return clients;
    }

}
