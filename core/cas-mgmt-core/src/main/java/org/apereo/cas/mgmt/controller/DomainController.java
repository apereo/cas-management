package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.services.CasRegisteredService;
import org.apereo.cas.services.ServicesManager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.Serializable;
import java.util.Collection;
import java.util.stream.Collectors;

/**
 * REST controller for domains.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("domainController")
@RequestMapping(path = "api/domains", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class DomainController {

    private final MgmtManagerFactory<? extends ServicesManager> managerFactory;

    /**
     * Gets domains.
     *
     * @param authentication -  the user
     * @return the domains
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping
    public Collection<DomainRpc> getDomains(final Authentication authentication) throws IllegalAccessException {
        val casUserProfile = CasUserProfile.from(authentication);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        val manager = (ManagementServicesManager) managerFactory.from(authentication);
        return manager.getAllServices().stream()
            .filter(s -> s.getFriendlyName().equalsIgnoreCase(CasRegisteredService.FRIENDLY_NAME))
            .map(s -> manager.extractDomain(s.getServiceId()))
            .distinct()
            .sorted()
            .map(DomainRpc::new)
            .collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    @SuppressWarnings("UnusedMethod")
    static class DomainRpc implements Serializable {
        private String name;
    }

}
