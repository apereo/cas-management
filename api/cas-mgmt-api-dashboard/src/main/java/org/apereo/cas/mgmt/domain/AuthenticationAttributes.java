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

    /**
     * Auth method used.
     */
    private List<String> authenticationMethod;

    /**
     * Credential type used.
     */
    private List<String> credentialType;

    /**
     * Authn method from SAML statement.
     */
    private List<String> samlAuthenticationStatementAuthnMethod;

    /**
     * Chain of successful auth handlers.
     */
    private List<String> successfulAuthenticationHandlers;
}
