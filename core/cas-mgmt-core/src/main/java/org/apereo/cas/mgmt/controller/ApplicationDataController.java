package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.NoOpContactLookup;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.AppConfig;
import org.apereo.cas.mgmt.domain.FormData;
import org.apereo.cas.mgmt.domain.MgmtUserProfile;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.util.CasVersion;
import org.apereo.cas.util.gen.DefaultRandomStringGenerator;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * MultiActionController to handle the deletion of RegisteredServices as well as
 * displaying them on the Manage Services page.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("applicationDataController")
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ApplicationDataController {

    private final FormDataFactory formDataFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CasConfigurationProperties casProperties;
    private final ContactLookup contactLookup;

    @GetMapping(value = "/managerType")
    public String getManagerType() {
        return casProperties.getServiceRegistry().getCore().getManagementType().toString();
    }

    /**
     * Gets user.
     *
     * @param authentication - the user
     * @return the user
     */
    @GetMapping(value = "/user")
    public MgmtUserProfile getUser(final Authentication authentication) {
        return CasUserProfile.from(authentication);
    }

    /**
     * Gets form data.
     *
     * @return the form data
     */
    @GetMapping(value = "/formData")
    public FormData getFormData() {
        return formDataFactory.create();
    }

    /**
     * Returns the versions this instance was compiled against.
     *
     * @return - cas versions
     */
    @GetMapping("/footer")
    public String[] footer() {
        return new String[] {
                CasVersion.getVersion(),
                this.getClass().getPackage().getImplementationVersion()
        };
    }

    /**
     * Method called by client to determine which features are available and configured.
     *
     * @return - AppConfig
     */
    @GetMapping("/appConfig")
    public AppConfig appConfig() {
        val config = new AppConfig();
        val formData = formDataFactory.create();
        config.setMgmtType(casProperties.getServiceRegistry().getCore().getManagementType().toString());
        config.setDashboardEnabled(managementProperties.isDashboardEnabled());
        config.setVersionControl(managementProperties.getVersionControl().isEnabled());
        config.setDelegatedMgmt(managementProperties.getDelegated().isEnabled());
        config.setSyncScript(managementProperties.getVersionControl().getSyncScript() != null);
        config.setContactLookup(!(contactLookup instanceof NoOpContactLookup));
        config.setOauthEnabled(formData.getServiceTypes().stream()
                .anyMatch(s -> s.getValue().contains("OAuth") || s.getValue().contains("Oidc")));
        config.setSamlEnabled(formData.getServiceTypes().stream()
                .anyMatch(s -> s.getValue().contains("Saml")));
        config.setAttributeStoreEnabled(managementProperties.isAttributeStoreEnabled());
        config.setSubmissionsEnabled(managementProperties.getSubmissions().isEnabled());
        return config;
    }

    /**
     * Generates a new random string used for client Id and Secrets.
     *
     * @return - Random String value
     */
    @GetMapping("generateRandom")
    public String generateRandom() {
        return new DefaultRandomStringGenerator().getNewString();
    }
}

