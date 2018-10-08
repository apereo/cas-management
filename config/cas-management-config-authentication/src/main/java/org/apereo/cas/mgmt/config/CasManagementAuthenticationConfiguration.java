package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.pac4j.cas.client.direct.DirectCasClient;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.core.authorization.authorizer.Authorizer;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.client.Client;
import org.pac4j.core.client.direct.AnonymousClient;
import org.pac4j.core.config.Config;
import org.pac4j.http.client.direct.IpClient;
import org.pac4j.http.credentials.authenticator.IpRegexpAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * This is {@link CasManagementAuthenticationConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Configuration("casManagementAuthenticationConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementAuthenticationConfiguration {

    @Autowired
    private ServerProperties serverProperties;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("managementWebappAuthorizer")
    private Authorizer managementWebappAuthorizer;

    @Autowired
    @Qualifier("authorizationGenerator")
    private AuthorizationGenerator authorizationGenerator;

    @Autowired
    @Qualifier("staticAdminRolesAuthorizationGenerator")
    private AuthorizationGenerator staticAdminRolesAuthorizationGenerator;

    @ConditionalOnMissingBean(name = "authenticationClients")
    @Bean
    public List<Client> authenticationClients() {
        val clients = new ArrayList<Client>();

        if (StringUtils.hasText(casProperties.getServer().getName())) {
            LOGGER.debug("Configuring an authentication strategy based on CAS running at [{}]", casProperties.getServer().getName());
            val cfg = new CasConfiguration(casProperties.getServer().getLoginUrl());
            val client = new DirectCasClient(cfg);
            client.setAuthorizationGenerator(authorizationGenerator);
            client.setName("CasClient");
            clients.add(client);
        } else {
            LOGGER.debug("Skipping CAS authentication strategy configuration; no CAS server name is defined");
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

    @ConditionalOnMissingBean(name = "casManagementSecurityConfiguration")
    @Bean
    public Config casManagementSecurityConfiguration() {
        val cfg = new Config(CasManagementUtils.getDefaultCallbackUrl(casProperties, serverProperties), authenticationClients());
        cfg.setAuthorizer(this.managementWebappAuthorizer);
        return cfg;
    }

    @ConditionalOnMissingBean(name = "casUserProfileFactory")
    @Bean
    public CasUserProfileFactory casUserProfileFactory() {
        return new CasUserProfileFactory(managementProperties);
    }
}
