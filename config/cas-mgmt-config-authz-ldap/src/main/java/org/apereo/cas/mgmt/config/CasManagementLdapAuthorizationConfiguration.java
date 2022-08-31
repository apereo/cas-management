package org.apereo.cas.mgmt.config;

import org.apereo.cas.authorization.LdapUserAttributesToRolesAuthorizationGenerator;
import org.apereo.cas.authorization.LdapUserGroupsToRolesAuthorizationGenerator;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.util.LdapUtils;

import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.ldaptive.SearchOperation;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

/**
 * This is {@link CasManagementLdapAuthorizationConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@Configuration(value = "casManagementLdapAuthorizationConfiguration", proxyBeanMethods = false)
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementLdapAuthorizationConfiguration {

    private static SearchOperation ldapAuthorizationGeneratorUserSearchExecutor(final CasManagementConfigurationProperties managementProperties) {
        val ldapAuthz = managementProperties.getLdap().getLdapAuthz();
        val operation = LdapUtils.newLdaptiveSearchOperation(ldapAuthz.getBaseDn(), ldapAuthz.getSearchFilter(),
            new ArrayList<>(0), CollectionUtils.wrap(ldapAuthz.getRoleAttribute()));
        operation.setConnectionFactory(LdapUtils.newLdaptiveConnectionFactory(managementProperties.getLdap()));
        return operation;
    }

    private static SearchOperation ldapAuthorizationGeneratorGroupSearchExecutor(final CasManagementConfigurationProperties managementProperties) {
        val ldapAuthz = managementProperties.getLdap().getLdapAuthz();
        SearchOperation operation = LdapUtils.newLdaptiveSearchOperation(ldapAuthz.getGroupBaseDn(), ldapAuthz.getGroupFilter(),
            new ArrayList<>(0), CollectionUtils.wrap(ldapAuthz.getGroupAttribute()));
        operation.setConnectionFactory(LdapUtils.newLdaptiveConnectionFactory(managementProperties.getLdap()));
        return operation;
    }

    @Bean
    public AuthorizationGenerator authorizationGenerator(final CasManagementConfigurationProperties managementProperties) {
        val ldapAuthz = managementProperties.getLdap().getLdapAuthz();

        if (StringUtils.isNotBlank(ldapAuthz.getGroupFilter()) && StringUtils.isNotBlank(ldapAuthz.getGroupAttribute())) {
            return new LdapUserGroupsToRolesAuthorizationGenerator(
                ldapAuthorizationGeneratorUserSearchExecutor(managementProperties),
                ldapAuthz.isAllowMultipleResults(),
                ldapAuthz.getGroupAttribute(),
                ldapAuthz.getGroupPrefix(),
                ldapAuthorizationGeneratorGroupSearchExecutor(managementProperties));
        }
        return new LdapUserAttributesToRolesAuthorizationGenerator(
            ldapAuthorizationGeneratorUserSearchExecutor(managementProperties),
            ldapAuthz.isAllowMultipleResults(),
            ldapAuthz.getRoleAttribute(),
            ldapAuthz.getRolePrefix());
    }
}
