package org.apereo.cas.mgmt.config;

import org.apereo.cas.authorization.LdapUserAttributesToRolesAuthorizationGenerator;
import org.apereo.cas.authorization.LdapUserGroupsToRolesAuthorizationGenerator;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.util.LdapUtils;

import lombok.val;
import org.apache.commons.lang3.StringUtils;

import org.ldaptive.SearchOperation;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.ArrayList;

/**
 * This is {@link CasManagementLdapAuthorizationConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@Configuration("casManagementLdapAuthorizationConfiguration")
@EnableConfigurationProperties(CasManagementConfigurationProperties.class)
public class CasManagementLdapAuthorizationConfiguration {

    @Autowired
    private CasManagementConfigurationProperties casProperties;

    @RefreshScope
    @Bean
    public AuthorizationGenerator authorizationGenerator() {
        val ldapAuthz = casProperties.getLdap().getLdapAuthz();

        if (StringUtils.isNotBlank(ldapAuthz.getGroupFilter()) && StringUtils.isNotBlank(ldapAuthz.getGroupAttribute())) {
            return new LdapUserGroupsToRolesAuthorizationGenerator(
                    ldapAuthorizationGeneratorUserSearchExecutor(),
                    ldapAuthz.isAllowMultipleResults(),
                    ldapAuthz.getGroupAttribute(),
                    ldapAuthz.getGroupPrefix(),
                    ldapAuthorizationGeneratorGroupSearchExecutor());
        }
        return new LdapUserAttributesToRolesAuthorizationGenerator(
                ldapAuthorizationGeneratorUserSearchExecutor(),
                ldapAuthz.isAllowMultipleResults(),
                ldapAuthz.getRoleAttribute(),
                ldapAuthz.getRolePrefix());
    }

    private SearchOperation ldapAuthorizationGeneratorUserSearchExecutor() {
        val ldapAuthz = casProperties.getLdap().getLdapAuthz();
        return LdapUtils.newLdaptiveSearchOperation(ldapAuthz.getBaseDn(), ldapAuthz.getSearchFilter(),
                new ArrayList<>(0), CollectionUtils.wrap(ldapAuthz.getRoleAttribute()));
    }

    private SearchOperation ldapAuthorizationGeneratorGroupSearchExecutor() {
        val ldapAuthz = casProperties.getLdap().getLdapAuthz();
        return LdapUtils.newLdaptiveSearchOperation(ldapAuthz.getGroupBaseDn(), ldapAuthz.getGroupFilter(),
                new ArrayList<>(0), CollectionUtils.wrap(ldapAuthz.getGroupAttribute()));
    }
}
