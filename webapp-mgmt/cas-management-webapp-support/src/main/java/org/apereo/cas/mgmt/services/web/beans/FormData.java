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
import org.apereo.cas.ws.idp.WSFederationClaims;
import org.apereo.services.persondir.util.CaseCanonicalizationMode;
import org.jose4j.jwe.ContentEncryptionAlgorithmIdentifiers;
import org.jose4j.jwe.KeyManagementAlgorithmIdentifiers;
import org.opensaml.saml.metadata.resolver.filter.impl.PredicateFilter;
import org.opensaml.saml.saml2.core.Attribute;
import org.opensaml.saml.saml2.metadata.IDPSSODescriptor;
import org.opensaml.saml.saml2.metadata.SPSSODescriptor;
import org.reflections.ReflectionUtils;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
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

    private Set<String> availableAttributes = new HashSet<>();

    private List<Integer> remoteCodes = Arrays.stream(HttpStatus.values()).map(HttpStatus::value).collect(Collectors.toList());

    private String[] samlMetadataRoles = {SPSSODescriptor.DEFAULT_ELEMENT_LOCAL_NAME, IDPSSODescriptor.DEFAULT_ELEMENT_LOCAL_NAME};

    private List<String> samlDirections = Arrays.stream(PredicateFilter.Direction.values()).map(s -> s.name().toUpperCase()).collect(Collectors.toList());

    private String[] samlAttributeNameFormats = {Attribute.BASIC, Attribute.UNSPECIFIED, Attribute.URI_REFERENCE};

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

    private List<String> locateKeyAlgorithmsSupported() {
        return ReflectionUtils.getFields(KeyManagementAlgorithmIdentifiers.class,
            field -> Modifier.isFinal(field.getModifiers()) && Modifier.isStatic(field.getModifiers())
                    && field.getType().equals(String.class))
            .stream()
            .map(Field::getName)
            .sorted()
            .collect(Collectors.toList());
    }

    private List<String> locateContentEncryptionAlgorithmsSupported() {
        return ReflectionUtils.getFields(ContentEncryptionAlgorithmIdentifiers.class,
            field -> Modifier.isFinal(field.getModifiers()) && Modifier.isStatic(field.getModifiers())
                    && field.getType().equals(String.class))
            .stream()
            .map(Field::getName)
            .sorted()
            .collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    public static class Option {
        private String display;
        private String value;
    }
}
