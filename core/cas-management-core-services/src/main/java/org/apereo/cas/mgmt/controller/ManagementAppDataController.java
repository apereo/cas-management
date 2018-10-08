package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domains.AppConfig;
import org.apereo.cas.mgmt.domains.FormData;
import org.apereo.cas.mgmt.domains.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.util.CasVersion;
import org.apereo.cas.util.RegexUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * MultiActionController to handle the deletion of RegisteredServices as well as
 * displaying them on the Manage Services page.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("mangememtAppDataController")
@Slf4j
@RequiredArgsConstructor
public class ManagementAppDataController {

    private final FormDataFactory formDataFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final ManagerFactory managerFactory;
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
    public CasUserProfile getUser(final HttpServletRequest request,
                                  final HttpServletResponse response) {
        return casUserProfileFactory.from(request, response);
    }

    /**
     * Method will filter all services in the register using the passed string a regular expression against the
     * service name, service id, and service description.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param query    - a string representing text to search for
     * @return - the resulting services
     * @throws Exception the exception
     */
    @GetMapping(value = "/search")
    public List<RegisteredServiceItem> search(final HttpServletRequest request,
                                              final HttpServletResponse response,
                                              @RequestParam final String query) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        val pattern = RegexUtils.createPattern("^.*" + query + ".*$");
        List<RegisteredService> services;
        if (!casUserProfile.isAdministrator()) {
            services = casUserProfile.getPermissions()
                .stream()
                .flatMap(d -> manager.getServicesForDomain(d).stream())
                .collect(Collectors.toList());
        } else {
            services = (List<RegisteredService>) manager.getAllServices();
        }
        services = services.stream()
            .filter(service -> pattern.matcher(service.getServiceId()).lookingAt()
                || pattern.matcher(service.getName()).lookingAt()
                || pattern.matcher(service.getDescription() != null ? service.getDescription() : "").lookingAt())
            .collect(Collectors.toList());
        val serviceBeans = new ArrayList<>(services.stream()
            .map(manager::createServiceItem)
            .collect(Collectors.toList()));
        return serviceBeans;
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
        config.setVersionControl(managementProperties.isEnableVersionControl());
        config.setDelegatedMgmt(managementProperties.isEnableDelegatedMgmt());
        config.setSyncScript(managementProperties.getSyncScript() != null);
        return config;
    }

}

