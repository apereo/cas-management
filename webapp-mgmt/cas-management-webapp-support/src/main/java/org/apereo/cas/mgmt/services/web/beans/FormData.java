package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apereo.cas.authentication.principal.cache.AbstractPrincipalAttributesRepository;
import org.apereo.cas.configuration.model.support.saml.idp.SamlIdPResponseProperties;
import org.apereo.cas.grouper.GrouperGroupField;
import org.apereo.cas.oidc.OidcConstants;
import org.apereo.cas.services.OidcSubjectTypes;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.RegisteredServiceMultifactorPolicy;
import org.apereo.cas.services.RegisteredServiceProperty;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.ws.idp.WSFederationClaims;
import org.apereo.services.persondir.util.CaseCanonicalizationMode;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Form data passed onto the screen.
 *
 * @author Misagh Moayyed
 * @since 4.1
 */
@Getter
@Setter
public class FormData implements Serializable {
    private static final long serialVersionUID = -5201796557461644152L;

    private List<String> availableAttributes = new ArrayList<>();

    private List<Integer> remoteCodes = Arrays.stream(HttpStatus.values()).map(HttpStatus::value).collect(Collectors.toList());

    private List<String> samlMetadataRoles = CollectionUtils.wrapList("SPSSODescriptor", "IDPSSODescriptor");

    private List<String> samlDirections = CollectionUtils.wrapList("INCLUDE", "EXCLUDE");

    private List<String> samlAttributeNameFormats = CollectionUtils.wrapList(
        "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
    );

    private List<String> samlCredentialTypes = Arrays.stream(SamlIdPResponseProperties.SignatureCredentialTypes.values())
        .map(s -> s.name().toUpperCase())
        .collect(Collectors.toList());

    private List<String> encryptAlgOptions = locateKeyAlgorithmsSupported();

    private List<String> encodingAlgOptions = locateContentEncryptionAlgorithmsSupported();

    private List<Option> serviceTypes = new ArrayList<>();

    private List<Option> mfaProviders = new ArrayList<>();

    private Set<String> delegatedAuthnProviders = new HashSet<>();

    public RegisteredServiceProperty.RegisteredServiceProperties[] getRegisteredServiceProperties() {
        return RegisteredServiceProperty.RegisteredServiceProperties.values();
    }

    public GrouperGroupField[] getGrouperFields() {
        return GrouperGroupField.values();
    }

    public List<Integer> getRemoteCodes() {
        return remoteCodes;
    }

    public TimeUnit[] getTimeUnits() {
        return TimeUnit.values();
    }

    public AbstractPrincipalAttributesRepository.MergingStrategy[] getMergingStrategies() {
        return AbstractPrincipalAttributesRepository.MergingStrategy.values();
    }

    public RegisteredService.LogoutType[] getLogoutTypes() {
        return RegisteredService.LogoutType.values();
    }

    public WSFederationClaims[] getWsFederationClaims() {
        return WSFederationClaims.values();
    }

    /**
     * Get mfa failure modes registered service multifactor policy . failure modes [ ].
     *
     * @return the registered service multifactor policy . failure modes [ ]
     */
    public RegisteredServiceMultifactorPolicy.FailureModes[] getMfaFailureModes() {
        return RegisteredServiceMultifactorPolicy.FailureModes.values();
    }

    /**
     * Gets oidc scopes.
     *
     * @return the oidc scopes
     */
    public List<Option> getOidcScopes() {
        final List<Option> scopes = Arrays.stream(OidcConstants.StandardScopes.values())
            .map(scope -> new Option(scope.getFriendlyName(), scope.getScope()))
            .collect(Collectors.toList());
        scopes.add(new Option("User Defined", "user_defined"));
        return scopes;
    }

    public OidcSubjectTypes[] getOidcSubjectTypes() {
        return OidcSubjectTypes.values();
    }

    public CaseCanonicalizationMode[] getCanonicalizationModes() {
        return CaseCanonicalizationMode.values();
    }

    private static List<String> locateKeyAlgorithmsSupported() {
        return CollectionUtils.wrapList(
            "RSA1_5", "RSA-OAEP",
            "RSA-OAEP-256", "ECDH-ES", "ECDH-ES+A128KW", "ECDH-ES+A192KW",
            "ECDH-ES+A256KW", "A128KW", "A192KW", "A256KW", "A128GCMKW",
            "A192GCMKW", "A256GCMKW", "PBES2-HS256+A128KW",
            "PBES2-HS384+A192KW", "PBES2-HS512+A256KW", "dir");
    }

    private static List<String> locateContentEncryptionAlgorithmsSupported() {
        return CollectionUtils.wrapList("A128CBC-HS256", "A192CBC-HS384", "A256CBC-HS512", "A128GCM", "A192GCM", "A256GCM");
    }

    /**
     * Class used to format display options for client.
     */
    @Data
    @AllArgsConstructor
    public static class Option {
        private String display;
        private String value;
    }
}
