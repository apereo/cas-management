package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authz.CasRoleBasedAuthorizer;
import org.apereo.cas.mgmt.authz.CasSpringSecurityAuthorizationGenerator;
import org.apereo.cas.mgmt.authz.json.JsonResourceAuthorizationGenerator;
import org.apereo.cas.mgmt.authz.yaml.YamlResourceAuthorizationGenerator;

import lombok.val;
import org.apache.commons.lang3.ArrayUtils;
import org.pac4j.core.authorization.authorizer.Authorizer;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.authorization.generator.FromAttributesAuthorizationGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Optional;

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
    private CasManagementConfigurationProperties mgmtProperties;

    @ConditionalOnMissingBean(name = "authorizationGenerator")
    @Bean
    public AuthorizationGenerator authorizationGenerator() {
        val authzAttributes = mgmtProperties.getAuthzAttributes();
        if (!authzAttributes.isEmpty()) {
            if (authzAttributes.stream().anyMatch(a -> a.equals("*"))) {
                return staticAdminRolesAuthorizationGenerator();
            }
            return new FromAttributesAuthorizationGenerator(authzAttributes.toArray(ArrayUtils.EMPTY_STRING_ARRAY), ArrayUtils.EMPTY_STRING_ARRAY);
        }

        return springSecurityPropertiesAuthorizationGenerator();
    }

    @Bean
    @ConditionalOnMissingBean(name = "staticAdminRolesAuthorizationGenerator")
    public AuthorizationGenerator staticAdminRolesAuthorizationGenerator() {
        return (context, store, profile) -> {
            profile.addRoles(mgmtProperties.getAdminRoles());
            profile.addRoles(mgmtProperties.getUserRoles());
            return Optional.of(profile);
        };
    }

    @ConditionalOnMissingBean(name = "managementWebappAuthorizer")
    @Bean
    public Authorizer managementWebappAuthorizer() {
        val roles = new ArrayList<String>();
        roles.addAll(mgmtProperties.getAdminRoles());
        roles.addAll(mgmtProperties.getUserRoles());
        return new CasRoleBasedAuthorizer(roles);
    }

    @Bean
    @ConditionalOnMissingBean(name = "springSecurityPropertiesAuthorizationGenerator")
    @ConditionalOnProperty(prefix = "mgmt", name = "user-properties-file")
    public AuthorizationGenerator springSecurityPropertiesAuthorizationGenerator() {
        val userPropertiesFile = mgmtProperties.getUserPropertiesFile();
        if (userPropertiesFile.getFilename().endsWith("json")) {
            return new JsonResourceAuthorizationGenerator(userPropertiesFile);
        }
        if (userPropertiesFile.getFilename().endsWith("yml")) {
            return new YamlResourceAuthorizationGenerator(userPropertiesFile);
        }
        return new CasSpringSecurityAuthorizationGenerator(userPropertiesFile);
    }
}
