package org.apereo.cas.mgmt.authentication;

import org.apereo.cas.mgmt.domain.MgmtUserProfile;
import lombok.Getter;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.core.profile.definition.CommonProfileDefinition;
import org.springframework.security.core.Authentication;
import java.util.Collection;
import java.util.List;

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

    public CasUserProfile(final Authentication authentication) {
        this((CommonProfile) authentication.getPrincipal(), List.of("ROLE_ADMIN"));
    }

    public CasUserProfile(final CommonProfile up, final Collection<String> adminRoles) {
        build(up.getId(), up.getAttributes());
        setClientName(up.getClientName());
        setLinkedId(up.getId());
        setRemembered(up.isRemembered());
        addRoles(up.getRoles());

        this.administrator = adminRoles.stream().anyMatch(r -> getRoles().contains(r));
        this.delegate = getRoles().contains("ROLE_USER");
    }

    public static CasUserProfile from(final Authentication authentication) {
        return new CasUserProfile(authentication);
    }

    @Override
    public String getDepartment() {
        return findFirstMatchingAttribute("department|ou");
    }

    @Override
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

    public boolean isUser() {
        return isAdministrator() || isDelegate();
    }
}
