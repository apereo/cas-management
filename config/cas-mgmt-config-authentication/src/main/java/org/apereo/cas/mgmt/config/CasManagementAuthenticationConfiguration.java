package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.pac4j.cas.client.direct.DirectCasClient;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.client.Client;
import org.pac4j.core.client.direct.AnonymousClient;
import org.pac4j.http.client.direct.HeaderClient;
import org.pac4j.http.client.direct.IpClient;
import org.pac4j.http.credentials.authenticator.IpRegexpAuthenticator;
import org.pac4j.jwt.config.encryption.RSAEncryptionConfiguration;
import org.pac4j.jwt.config.signature.RSASignatureConfiguration;
import org.pac4j.jwt.credentials.authenticator.JwtAuthenticator;
import org.pac4j.jwt.util.JWKHelper;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
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
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;


    @Autowired
    @Qualifier("authorizationGenerator")
    private ObjectProvider<AuthorizationGenerator> authorizationGenerator;

    @Autowired
    @Qualifier("staticAdminRolesAuthorizationGenerator")
    private ObjectProvider<AuthorizationGenerator> staticAdminRolesAuthorizationGenerator;

    @ConditionalOnMissingBean(name = "authenticationClients")
    @Bean
    public List<Client> authenticationClients() {
        val clients = new ArrayList<Client>();
        val jwk = "{\"kty\":\"RSA\",\"n\":\"g6YQRvtdzGP27MRQL2OR2AKcd7AodolA6u6WHL-1XCIzEOI3qxD0MBd6tgmcc3ktPE2kToT26U3bYih-rrX7fIsGQg-kEPGuDmxTKXMgiTT8-3J27pjYYjycR7JgYGkmwsHjqTJQ7NhcxEk4tt6RJFAGMrcVLJP65_IcE1_VoAnJEbfzGiwfAHKmq60Yiry06vHJKxZYqWpQEEhaQLdGoU4ywmaAK-Nts-w-mZGgOS1CetuHhRiUsmfiabJq-Ae9gPr3PAPmzh9omzLATOrST0rVpG7pNKGM4qWY9H_0NEPEsUyomdPyqO1kal3M3uxe5ryg7Dmy5GX9xuDRK52YZQ\",\"e\":\"AQAB\"}";

        //val secret = JWKHelper.buildSecretFromJwk(jwk);
        val rsa = JWKHelper.buildRSAKeyPairFromJwk(jwk);
        //val enc = JWKHelper.buildECKeyPairFromJwk(jwk);
        val jwt = new JwtAuthenticator();
        val encConfig = new RSAEncryptionConfiguration();
        //encConfig.setAlgorithm(JWEAlgorithm.ECDH_ES_A128KW);
        //encConfig.setMethod(EncryptionMethod.A192CBC_HS384);
        encConfig.setKeyPair(rsa);
        jwt.addEncryptionConfiguration(encConfig);
        jwt.addSignatureConfiguration(new RSASignatureConfiguration(rsa));
        val jwtClient = new HeaderClient();
        jwtClient.setHeaderName("Authorization");
        jwtClient.setPrefixHeader("Bearer");
        jwtClient.setAuthenticator(jwt);
        jwtClient.addAuthorizationGenerator(authorizationGenerator.getIfAvailable());
        jwtClient.setName("JWTAuth");
        clients.add(jwtClient);

        if (StringUtils.hasText(casProperties.getServer().getName())) {
            LOGGER.debug("Configuring an authentication strategy based on CAS running at [{}]", casProperties.getServer().getName());
            val cfg = new CasConfiguration(casProperties.getServer().getLoginUrl());
            val client = new DirectCasClient(cfg);
            client.setAuthorizationGenerator(authorizationGenerator.getIfAvailable());
            client.setName("CasClient");
            clients.add(client);
        } else {
            LOGGER.debug("Skipping CAS authentication strategy configuration; no CAS server name is defined");
        }

        if (StringUtils.hasText(managementProperties.getAuthzIpRegex())) {
            LOGGER.info("Configuring an authentication strategy based on authorized IP addresses matching [{}]", managementProperties.getAuthzIpRegex());
            val ipClient = new IpClient(new IpRegexpAuthenticator(managementProperties.getAuthzIpRegex()));
            ipClient.setName("IpClient");
            ipClient.setAuthorizationGenerator(staticAdminRolesAuthorizationGenerator.getIfAvailable());
            clients.add(ipClient);
        } else {
            LOGGER.debug("Skipping IP address authentication strategy configuration; no pattern is defined");
        }

        if (clients.isEmpty()) {
            LOGGER.warn("No authentication strategy is defined, CAS will establish an anonymous authentication mode whereby access is immediately granted. "
                + "This may NOT be relevant for production purposes. Consider configuring alternative authentication strategies for maximum security.");
            val anon = new AnonymousClient();
            anon.setAuthorizationGenerator(staticAdminRolesAuthorizationGenerator.getIfAvailable());
            clients.add(anon);
        }
        return clients;
    }

    @ConditionalOnMissingBean(name = "casUserProfileFactory")
    @Bean
    public CasUserProfileFactory casUserProfileFactory() {
        return new CasUserProfileFactory(managementProperties);
    }
}
