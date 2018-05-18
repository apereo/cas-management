package org.apereo.cas.configuration.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.configuration.model.support.ldap.AbstractLdapProperties;
import org.apereo.cas.configuration.model.support.ldap.LdapAuthorizationProperties;
import org.apereo.cas.configuration.support.RequiresModule;
import org.apereo.cas.util.CollectionUtils;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * This is {@link ManagementWebappProperties}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@Getter
@Setter
@Slf4j
public class ManagementWebappProperties implements Serializable {
    private static final long serialVersionUID = -7686426966125636166L;
    /**
     * List of roles that allow admin access to the web application.
     */
    private List<String> adminRoles = CollectionUtils.wrap("ROLE_ADMIN");

    /**
     * List of roles that allow a non-admin access to the web application.
     */
    private List<String> userRoles = CollectionUtils.wrap("ROLE_USER");

    /**
     * The server name/address of the management web application.
     */
    private String serverName = "https://localhost:8443";

    /**
     * Default locale to use when displaying UI components and views.
     */
    private String defaultLocale = "en";

    /**
     * The IP address pattern that can control access to the management webapp.
     * When defined, extracts the IP address from the request and compares with the pattern.
     */
    private String authzIpRegex;
    
    /**
     * Collection of attributes the authorized user must have in order to authenticate into the app.
     * Th attribute value(s) must match the expected role. To permit everything, you may use {@code *}.
     */
    private List<String> authzAttributes = new ArrayList<>();

    /**
     * Control authorization and access into the app via LDAP directly.
     */
    private Ldap ldap = new Ldap();

    /**
     * Location of the resource that contains the authorized accounts.
     * This file lists the set of users that are allowed access to the CAS sensitive/admin endpoints.
     * The syntax of each entry should be in the form of:
     * {@code username=notused,grantedAuthority[,grantedAuthority][,enabled|disabled]}
     * 
     * <p>
     * The file may also be specified in form of JSON or YAML. In either case, the contents should be a map
     * of user records with key being the username whose authorization rules are defined as the value linked to that key.
     * 
     * Example:
     * <pre>
{
    "casuser" : {
        "roles" : [ "ROLE_ADMIN" ],
        "permissions" : [ "PERMISSION_EXAMPLE" ]
    }
}
     * </pre>
     */
    private Resource userPropertiesFile = new ClassPathResource("user-details.properties");

    /**
     * A writable location where the Git repository will be created to track changes.
     */
    private String servicesRepo = "/etc/cas/services-repo";

    /**
     * A writable location where the users Git repositories will be created.
     */
    private String userReposDir = "/etc/cas/user-repos";

    /**
     * Path to executable bean shell script to sync server nodes.
     */
    private String syncScript;

    /**
     * Flag to enable version control with git.
     */
    private boolean enableVersionControl;

    /**
     * Flag to enable delegated management.
     */
    private boolean enableDelegatedMgmt;

    /**
     * Notifications.
     */
    @NestedConfigurationProperty
    private NotificationsProperties notifications = new NotificationsProperties();

    @Getter
    @Setter
    @RequiresModule(name = "cas-management-webapp-support-ldap")
    public static class Ldap extends AbstractLdapProperties {
        private static final long serialVersionUID = -8129280052479631538L;
        /**
         * Defines authorization settings that allow access to the app via LDAP.
         */
        @NestedConfigurationProperty
        private LdapAuthorizationProperties ldapAuthz = new LdapAuthorizationProperties();
    }

}



