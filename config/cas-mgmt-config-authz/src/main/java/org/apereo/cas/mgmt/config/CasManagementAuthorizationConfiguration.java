package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authz.CasRoleBasedAuthorizer;
import org.apereo.cas.mgmt.authz.CasSpringSecurityAuthorizationGenerator;
import org.apereo.cas.mgmt.authz.json.JsonResourceAuthorizationGenerator;
import org.apereo.cas.mgmt.authz.yaml.YamlResourceAuthorizationGenerator;

import lombok.val;
import org.pac4j.core.authorization.authorizer.Authorizer;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.authorization.generator.FromAttributesAuthorizationGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

/**
 * This is {@link CasManagementAuthorizationConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Configuration("casManagementAuthorizationConfiguration")
@EnableConfigurationProperties({CasManagementConfigurationProperties.class, CasConfigurationProperties.class})
public class CasManagementAuthorizationConfiguration {

    @Autowired
    private CasManagementConfigurationProperties casProperties;

    @ConditionalOnMissingBean(name = "authorizationGenerator")
    @Bean
    public AuthorizationGenerator authorizationGenerator() {
        val authzAttributes = casProperties.getAuthzAttributes();
        if (!authzAttributes.isEmpty()) {
            if (authzAttributes.stream().anyMatch(a -> a.equals("*"))) {
                return staticAdminRolesAuthorizationGenerator();
            }
            return new FromAttributesAuthorizationGenerator(authzAttributes.toArray(new String[]{}), new String[]{});
        }

        return springSecurityPropertiesAuthorizationGenerator();
    }

    @Bean
    @ConditionalOnMissingBean(name = "staticAdminRolesAuthorizationGenerator")
    public AuthorizationGenerator staticAdminRolesAuthorizationGenerator() {
        return (context, profile) -> {
            profile.addRoles(casProperties.getAdminRoles());
            profile.addRoles(casProperties.getUserRoles());
            return profile;
        };
    }

    @ConditionalOnMissingBean(name = "managementWebappAuthorizer")
    @Bean
    public Authorizer managementWebappAuthorizer() {
        val roles = new ArrayList<String>();
        roles.addAll(casProperties.getAdminRoles());
        roles.addAll(casProperties.getUserRoles());
        return new CasRoleBasedAuthorizer(roles);
    }

    @Bean
    @ConditionalOnMissingBean(name = "springSecurityPropertiesAuthorizationGenerator")
    public AuthorizationGenerator springSecurityPropertiesAuthorizationGenerator() {
        try {
            val userPropertiesFile = casProperties.getUserPropertiesFile();
            if (userPropertiesFile.getFilename().endsWith("json")) {
                return new JsonResourceAuthorizationGenerator(userPropertiesFile);
            }
            if (userPropertiesFile.getFilename().endsWith("yml")) {
                return new YamlResourceAuthorizationGenerator(userPropertiesFile);
            }
            return new CasSpringSecurityAuthorizationGenerator(userPropertiesFile);
        } catch (final Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
