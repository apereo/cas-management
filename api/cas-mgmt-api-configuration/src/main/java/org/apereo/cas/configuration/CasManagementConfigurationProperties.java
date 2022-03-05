package org.apereo.cas.configuration;

import org.apereo.cas.configuration.model.BulkNotifications;
import org.apereo.cas.configuration.model.CasServer;
import org.apereo.cas.configuration.model.DelegatedNotifications;
import org.apereo.cas.configuration.model.RegisterNotifications;
import org.apereo.cas.configuration.model.SubmissionNotifications;
import org.apereo.cas.configuration.model.support.ldap.AbstractLdapProperties;
import org.apereo.cas.configuration.model.support.ldap.LdapAuthenticationProperties;
import org.apereo.cas.configuration.model.support.ldap.LdapAuthorizationProperties;
import org.apereo.cas.configuration.support.RequiresModule;
import org.apereo.cas.util.CollectionUtils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * This is {@link CasManagementConfigurationProperties}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@Getter
@Setter
@ConfigurationProperties(value = "mgmt", ignoreUnknownFields = false)
public class CasManagementConfigurationProperties implements Serializable {
    private static final long serialVersionUID = -7686426966125636166L;

    /**
     * List of roles that allow admin access to the web application.
     */
    private List<String> adminRoles = CollectionUtils.wrapList("ROLE_ADMIN");

    /**
     * List of roles that allow a non-admin access to the web application.
     */
    private List<String> userRoles = CollectionUtils.wrapList("ROLE_USER");

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
     * LDAP for contact lookup.
     */
    private LdapAuthenticationProperties ldapAuth = new LdapAuthenticationProperties();

    /**
     * Use CAS server for SSO for management application.
     */
    private boolean casSso = true;

    /**
     * Location of the resource that contains the authorized accounts.
     * This file lists the set of users that are allowed access to the CAS sensitive/admin endpoints.
     * The syntax of each entry should be in the form of:
     * {@code username=notused,grantedAuthority[,grantedAuthority][,enabled|disabled]}
     *
     * <p>
     * The file may also be specified in form of JSON or YAML. In either case, the contents should be a map
     * of user records with key being the username whose authorization rules are defined as the value linked to that key.
     */
    private transient Resource userPropertiesFile = new ClassPathResource("users.json");

    /**
     * Flag to enable/disable calling cas discovery endpoint.
     */
    private boolean enableDiscoveryEndpointCall;

    /**
     * Path to discovery endpoint.
     */
    private String discoveryEndpointPath = "/actuator/discoveryProfile";

    /**
     * Properties for version control.
     */
    private VersionControl versionControl = new VersionControl();

    /**
     * Properties for delegated mgmt.
     */
    private Delegated delegated = new Delegated();

    /**
     * Properties for submissions.
     */
    private Submissions submissions = new Submissions();

    /**
     * Properties for register.
     */
    private Register register = new Register();

    /**
     * Lucence directory for writting indexes.
     */
    private String luceneIndexDir = "/etc/cas/lucene";

    /**
     * Directory for storing SAML Metadata locally.
     */
    private String metadataRepoDir = "/etc/cas-mgmt/metadata";

    /**
     * Directory where metadata is stored on CAS server instances.
     */
    private String metadataDir = "/etc/cas/metadata";

    /**
     * Incommon Signature Cert.
     */
    private Resource inCommonCert = new ClassPathResource("incommon.pem");

    /**
     * InCommon Cert location for CAS Servers.
     * Typically set to {@code /etc/cas/idp/inc-md-cert-mdq.pem}.
     */
    private String inCommonCertLocation;

    /**
     * InCommon MDQ URL.
     * Typically set to {@code https://mdq.incommon.org/entities}.
     */
    private String inCommonMDQUrl;

    /**
     * List of cas servers that available in the Dashboard.
     */
    private List<CasServer> casServers = new ArrayList<>();

    /**
     * Cache health enpdoint.
     */
    private String cacheHealthIndicator = "session";

    /**
     * List the attributeRepositories defined in the cas server.
     */
    private List<String> attributeRepositories = new ArrayList<>();

    /**
     * List of supported identity providers to display in the user interface.
     */
    private Set<String> delegatedIdentityProviders = Stream.of("Twitter", "Orcid", "Dropbox", "Github", "Facebook",
        "Yahoo", "Wordpress", "PayPal", "Google", "WindowsLive", "Foursquare").collect(Collectors.toSet());

    /**
     * Flag to enable the feature AttributeDefinitions.
     */
    private boolean attributeStoreEnabled;

    /**
     * Basic auth username, if any, to be used when contacting actuator endpoints.
     */
    private String actuatorBasicAuthUsername;

    /**
     * Basic auth password, if any, to be used when contacting actuator endpoints.
     */
    private String actuatorBasicAuthPassword;
    
    @Getter
    @Setter
    @RequiresModule(name = "cas-mgmt-config-ldap-authz")
    public static class Ldap extends AbstractLdapProperties {
        private static final long serialVersionUID = -8129280052479631538L;

        /**
         * Defines authorization settings that allow access to the app via LDAP.
         */
        @NestedConfigurationProperty
        private LdapAuthorizationProperties ldapAuthz = new LdapAuthorizationProperties();
    }

    @Getter
    @Setter
    @RequiresModule(name = "cas-mgmt-config-version-control")
    public static class VersionControl implements Serializable {
        /**
         * A writable location where the Git repository will be created to track changes.
         */
        private String servicesRepo = "/etc/cas/services-repo";

        /**
         * Path to executable bean shell script to sync server nodes.
         */
        private String syncScript;

        /**
         * Version Control flag.
         */
        private boolean enabled;
    }

    @Getter
    @Setter
    @RequiresModule(name = "cas-mgmt-config-delegated")
    public static class Delegated implements Serializable {
        /**
         * A writable location where the users Git repositories will be created.
         */
        private String userReposDir = "/etc/cas/user-repos";

        /**
         * Delegated auth flag.
         */
        private boolean enabled;

        /**
         * Notifications.
         */
        @NestedConfigurationProperty
        private DelegatedNotifications notifications = new DelegatedNotifications();
    }

    @Getter
    @Setter
    @RequiresModule(name = "cas-mgmt-config-submissions")
    public static class Submissions implements Serializable {
        /**
         * Directory to store submitted services.
         */
        private String submitDir = "/etc/cas/submitted";

        /**
         * Submissions flag.
         */
        private boolean enabled;

        /**
         * Notifications.
         */
        @NestedConfigurationProperty
        private SubmissionNotifications notifications = new SubmissionNotifications();
    }

    @Getter
    @Setter
    @RequiresModule(name = "cas-mgmt-config-register")
    public static class Register implements Serializable {
        /**
         * Register enabled flag.
         */
        private boolean enabled;

        /**
         * Register Notifications.
         */
        private RegisterNotifications notifications = new RegisterNotifications();

        /**
         * Bulk action notifications.
         */
        private BulkNotifications bulkNotifications = new BulkNotifications();

    }
}
