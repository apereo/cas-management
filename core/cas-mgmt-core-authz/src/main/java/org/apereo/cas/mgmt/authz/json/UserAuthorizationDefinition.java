package org.apereo.cas.mgmt.authz.json;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * This is {@link UserAuthorizationDefinition}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
@Getter
@Setter
public class UserAuthorizationDefinition implements Serializable {
    private static final long serialVersionUID = 5612860879960019695L;

    /**
     * Roles the user has assigned to thier profile.
     */
    private Set<String> roles = new LinkedHashSet<>();

    /**
     * Permissions the user has.
     */
    private Set<String> permissions = new LinkedHashSet<>();
}
