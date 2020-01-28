package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
@RequestMapping(path="api/domains", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class DomainController {

    private final CasUserProfileFactory casUserProfileFactory;
    private final MgmtManagerFactory managerFactory;

    /**
     * Gets domains.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return the domains
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping
    public Collection<DomainRpc> getDomains(final HttpServletRequest request,
                                            final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        val manager = managerFactory.from(request, response);
        return manager.getDomains().stream()
                .filter(casUserProfile::hasPermission)
                .map(DomainRpc::new)
                .collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    private static class DomainRpc implements Serializable {
        private String name;
    }

}
