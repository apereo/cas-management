package org.apereo.cas.mgmt.config

import org.apache.commons.lang3.StringUtils
import org.apereo.cas.authorization.LdapUserAttributesToRolesAuthorizationGenerator
import org.apereo.cas.authorization.LdapUserGroupsToRolesAuthorizationGenerator
import org.apereo.cas.configuration.model.support.ldap.LdapAuthorizationProperties
import org.apereo.cas.util.CollectionUtils
import org.apereo.cas.util.LdapUtils
import org.ldaptive.ConnectionFactory
import org.ldaptive.SearchExecutor
import org.pac4j.core.authorization.generator.AuthorizationGenerator
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.cloud.context.config.annotation.RefreshScope
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.apereo.cas.configuration.CasConfigurationProperties
import java.util.ArrayList

/**
 * This is [CasManagementLdapAuthorizationConfiguration].
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@Configuration("casManagementLdapAuthorizationConfiguration")
@EnableConfigurationProperties(CasConfigurationProperties::class)
class CasManagementLdapAuthorizationConfiguration {

    @Autowired
    private val casProperties: CasConfigurationProperties? = null

    @RefreshScope
    @Bean
    fun authorizationGenerator(): AuthorizationGenerator<*> {
        val ldapAuthz = casProperties!!.mgmt.ldap.ldapAuthz
        val connectionFactory = LdapUtils.newLdaptivePooledConnectionFactory(casProperties.mgmt.ldap)

        return if (StringUtils.isNotBlank(ldapAuthz.groupFilter) && StringUtils.isNotBlank(ldapAuthz.groupAttribute)) {
            LdapUserGroupsToRolesAuthorizationGenerator(connectionFactory,
                    ldapAuthorizationGeneratorUserSearchExecutor(),
                    ldapAuthz.isAllowMultipleResults,
                    ldapAuthz.groupAttribute,
                    ldapAuthz.groupPrefix,
                    ldapAuthorizationGeneratorGroupSearchExecutor())
        } else LdapUserAttributesToRolesAuthorizationGenerator(connectionFactory,
                ldapAuthorizationGeneratorUserSearchExecutor(),
                ldapAuthz.isAllowMultipleResults,
                ldapAuthz.roleAttribute,
                ldapAuthz.rolePrefix)
    }

    private fun ldapAuthorizationGeneratorUserSearchExecutor(): SearchExecutor {
        val ldapAuthz = casProperties!!.mgmt.ldap.ldapAuthz
        return LdapUtils.newLdaptiveSearchExecutor(ldapAuthz.baseDn, ldapAuthz.searchFilter,
                ArrayList(0), CollectionUtils.wrap(ldapAuthz.roleAttribute))
    }

    private fun ldapAuthorizationGeneratorGroupSearchExecutor(): SearchExecutor {
        val ldapAuthz = casProperties!!.mgmt.ldap.ldapAuthz
        return LdapUtils.newLdaptiveSearchExecutor(ldapAuthz.groupBaseDn, ldapAuthz.groupFilter,
                ArrayList(0), CollectionUtils.wrap(ldapAuthz.groupAttribute))
    }
}
