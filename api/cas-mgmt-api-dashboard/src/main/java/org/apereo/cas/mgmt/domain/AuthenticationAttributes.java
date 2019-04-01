package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Represents attributes belonging to a user's authentication.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class AuthenticationAttributes {

    private List<String> authenticationMethod;

    private List<String> credentialType;

    private List<String> samlAuthenticationStatementAuthnMethod;

    private List<String> successfulAuthenticationHandlers;
}
