package org.apereo.cas.mgmt.authentication;

import org.apereo.cas.mgmt.domain.MgmtUserProfile;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegisteredService;

import lombok.Getter;
import lombok.val;

import org.pac4j.core.profile.CommonProfile;
import org.pac4j.core.profile.definition.CommonProfileDefinition;

import java.util.Arrays;
import java.util.Collection;

/**
 * This is {@link CasUserProfile}.
 *
 * @author Misagh Moayyed
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Getter
public class CasUserProfile extends CommonProfile implements MgmtUserProfile {
    private static final long serialVersionUID = -6308325782274816263L;
    private final boolean administrator;
    private final boolean delegate;

    public CasUserProfile() {
        this.administrator = false;
        this.delegate = false;
    }

    public CasUserProfile(final CommonProfile up, final Collection<String> adminRoles) {
        build(up.getId(), up.getAttributes());
        setClientName(up.getClientName());
        setLinkedId(up.getId());
        setRemembered(up.isRemembered());
        addRoles(up.getRoles());
        addPermissions(up.getPermissions());

        this.administrator = adminRoles.stream().anyMatch(r -> getRoles().contains(r));
        this.delegate = getRoles().contains("ROLE_USER");
    }

    public String getDepartment() {
        return findFirstMatchingAttribute("department|ou");
    }

    public String getPhone() {
        return findFirstMatchingAttribute("phone|phoneNumber|telephoneNumber|primaryPhone|primaryPhoneNumber");
    }

    @Override
    public String getUsername() {
        return findFirstMatchingAttribute("username|id");
    }

    @Override
    public String getFamilyName() {
        return findFirstMatchingAttribute(CommonProfileDefinition.FAMILY_NAME + "|familyName");
    }

    @Override
    public String getFirstName() {
        return findFirstMatchingAttribute(CommonProfileDefinition.FIRST_NAME + "|firstName|given_name");
    }

    @Override
    public String getEmail() {
        return findFirstMatchingAttribute("email|mail");
    }

    private String findFirstMatchingAttribute(final String pattern) {
        return getAttributes().entrySet()
            .stream()
            .filter(entry -> entry.getKey().matches(pattern))
            .map(e -> e.getValue().toString())
            .findFirst()
            .orElse(null);
    }

    /**
     * Checks a user's permissions if they have access to the passed domain.
     *
     * @param domain - the domain
     * @return - true if user has permission
     */
    public boolean hasPermission(final String domain) {
        val permissions = getPermissions();
        return isAdministrator() || permissions.contains("*")
                || permissions.stream().anyMatch(domain::endsWith);
    }

    /**
     * Checks if user has permission to the {@link RegisteredService}.
     *
     * @param service - the service
     * @return true if user has permission
     */
    public boolean hasPermission(final RegisteredService service) {
        val permissions = getPermissions();
        if (isAdministrator() || permissions.contains("*")) {
            return true;
        }
        return Arrays.stream(service.getServiceId().split("|"))
                .map(CasManagementUtils::extractDomain)
                .anyMatch(d -> permissions.stream().anyMatch(d::endsWith));
    }

    public boolean isUser() {
        return isAdministrator() || isDelegate();
    }
}
