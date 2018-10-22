package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.AppConfig;
import org.apereo.cas.mgmt.domain.FormData;
import org.apereo.cas.mgmt.domain.MgmtUserProfile;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.util.CasVersion;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * MultiActionController to handle the deletion of RegisteredServices as well as
 * displaying them on the Manage Services page.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("applicationDataController")
@Slf4j
@RequiredArgsConstructor
public class ApplicationDataController {

    private final FormDataFactory formDataFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final MgmtManagerFactory managerFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CasConfigurationProperties casProperties;

    @GetMapping(value = "managerType")
    public String getManagerType() {
        return casProperties.getServiceRegistry().getManagementType().toString();
    }

    /**
     * Gets user.
     *
     * @param request  the request
     * @param response the response
     * @return the user
     */
    @GetMapping(value = "/user")
    public MgmtUserProfile getUser(final HttpServletRequest request,
                                   final HttpServletResponse response) {
        return casUserProfileFactory.from(request, response);
    }

    /**
     * Gets form data.
     *
     * @return the form data
     */
    @GetMapping(value = "formData")
    public FormData getFormData() {
        return formDataFactory.create();
    }

    /**
     * Returns the versions this instance was compiled against.
     *
     * @return - cas versions
     */
    @GetMapping("footer")
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
        config.setMgmtType(casProperties.getServiceRegistry().getManagementType().toString());
        config.setVersionControl(managementProperties.getVersionControl().isEnabled());
        config.setDelegatedMgmt(managementProperties.getDelegated().isEnabled());
        config.setSyncScript(managementProperties.getVersionControl().getSyncScript() != null);
        return config;
    }

}

