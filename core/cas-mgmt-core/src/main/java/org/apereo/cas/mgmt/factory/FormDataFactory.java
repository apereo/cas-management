package org.apereo.cas.mgmt.factory;

import org.apereo.cas.authentication.attribute.AttributeDefinition;
import org.apereo.cas.authentication.attribute.AttributeDefinitionStore;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.discovery.CasServerProfile;
import org.apereo.cas.mgmt.domain.FormData;
import org.apereo.cas.services.CasRegisteredService;
import org.apereo.cas.services.OidcRegisteredService;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.support.saml.web.idp.profile.builders.attr.SamlIdPAttributeDefinition;
import org.apereo.cas.util.HttpUtils;
import org.apereo.cas.ws.idp.services.WSFederationRegisteredService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.apereo.services.persondir.support.NamedStubPersonAttributeDao;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;

import javax.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;

import static java.util.stream.Collectors.*;

/**
 * Class used to create a FormData record to be delivered to the client.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Slf4j
@RequiredArgsConstructor
public class FormDataFactory {

    private final CasConfigurationProperties casProperties;

    private final CasManagementConfigurationProperties mgmtProperties;

    private final AttributeDefinitionStore attributeDefinitionStore;

    private Optional<CasServerProfile> profile = Optional.empty();

    /**
     * Factory method to create an instance of FormData.
     *
     * @return - FormData
     */
    public FormData create() {
        val formData = new FormData();
        loadServiceTypes(formData);
        loadMfaProviders(formData);
        loadDelegatedClientTypes(formData);
        loadAvailableAttributes(formData);
        loadAttributeRepositories(formData);
        loadSamlIdpAttributes(formData);
        loadUserDefinedScopes(formData);
        return formData;
    }

    @PostConstruct
    @Scheduled(fixedDelayString = "PT60M")
    void callForProfile() {
        if (!mgmtProperties.isEnableDiscoveryEndpointCall()) {
            LOGGER.info("Call to cas/actuator/discoveryProfile disabled by management configuration.  Using default FormData values.");
            return;
        }
        if (StringUtils.isBlank(casProperties.getServer().getName())) {
            LOGGER.warn("CAS server name is undefined and cannot be contacted to retrieve profile");
            return;
        }

        val params = new HashMap<String, String>();
        val url = casProperties.getServer().getPrefix() + mgmtProperties.getDiscoveryEndpointPath();
        try {
            val executionRequestBuilder = HttpUtils.HttpExecutionRequest.builder()
                .url(url)
                .parameters(params)
                .method(HttpMethod.GET);
            if (StringUtils.isNotBlank(mgmtProperties.getActuatorBasicAuthUsername())) {
                executionRequestBuilder.basicAuthUsername(mgmtProperties.getActuatorBasicAuthUsername())
                    .basicAuthPassword(mgmtProperties.getActuatorBasicAuthPassword());
            }
            val execution = executionRequestBuilder.build();
            val response = HttpUtils.execute(execution);
            if (response != null) {
                if (response.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
                    val mapper = new ObjectMapper();
                    val wrapper = mapper.readValue(response.getEntity().getContent(), ObjectNode.class);
                    this.profile = Optional.of(mapper.convertValue(wrapper.findValue("profile"), CasServerProfile.class));
                    LOGGER.info("FormData is populated with values from {}.", url);
                } else {
                    LOGGER.info("CAS Server returned {} status code from endpoint {}. Using default FormData values.",
                        response.getStatusLine().getStatusCode(), url);
                }
            }
        } catch (final Exception e) {
            LOGGER.error("An error occurred attempting to contact CAS Server [{}] to retrieve profile", url, e);
        }
    }

    private void loadServiceTypes(final FormData formData) {
        if (profile.isPresent() && !profile.get().getRegisteredServiceTypesSupported().isEmpty()) {
            val p = profile.get();
            val types = p.getRegisteredServiceTypesSupported()
                .stream()
                .map(e -> {
                    val split = Splitter.on('@').split(e);
                    val typeName = Iterables.get(split, 0);
                    val value = Iterables.get(split, 1);
                    return new FormData.Option(typeName, value);
                })
                .collect(toList());
            formData.setServiceTypes(types);
        } else {
            val serviceTypes = new ArrayList<FormData.Option>();
            serviceTypes.add(new FormData.Option("CAS Client", CasRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("OAuth2 Client", OAuthRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("SAML2 Service Provider", SamlRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("OpenID Connect Relying Party", OidcRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("WS Federation Relying Party", WSFederationRegisteredService.class.getTypeName()));
            formData.setServiceTypes(serviceTypes);
        }
    }

    private void loadMfaProviders(final FormData formData) {
        if (profile.isPresent() && !profile.get().getMultifactorAuthenticationProviderTypesSupported().isEmpty()) {
            val p = profile.get();
            val mfas = p.getMultifactorAuthenticationProviderTypesSupported().entrySet().stream()
                .map(e -> new FormData.Option(e.getValue(), e.getKey()))
                .collect(toList());
            formData.setMfaProviders(mfas);
        } else {
            val mfaProviders = new ArrayList<FormData.Option>();
            mfaProviders.add(new FormData.Option("Duo Security", "mfa-duo"));
            mfaProviders.add(new FormData.Option("Authy Authenticator", "mfa-authy"));
            mfaProviders.add(new FormData.Option("YubiKey", "mfa-yubikey"));
            mfaProviders.add(new FormData.Option("RSA/RADIUS", "mfa-radius"));
            mfaProviders.add(new FormData.Option("WiKID", "mfa-wikid"));
            mfaProviders.add(new FormData.Option("Google Authenticator", "mfa-gauth"));
            mfaProviders.add(new FormData.Option("Microsoft Azure", "mfa-azure"));
            mfaProviders.add(new FormData.Option("FIDO U2F", "mfa-u2f"));
            mfaProviders.add(new FormData.Option("Swivel Secure", "mfa-swivel"));
            mfaProviders.add(new FormData.Option("CAS SIMPLE", "mfa-simple"));
            formData.setMfaProviders(mfaProviders);
        }
    }

    private void loadDelegatedClientTypes(final FormData formData) {
        if (profile.isPresent() && profile.get().getDelegatedClientTypesSupported() != null && !profile.get().getDelegatedClientTypesSupported().isEmpty()) {
            val p = profile.get();
            formData.setDelegatedAuthnProviders(p.getDelegatedClientTypesSupported());
        } else {
            formData.setDelegatedAuthnProviders(mgmtProperties.getDelegatedIdentityProviders());
        }
    }

    private void loadAvailableAttributes(final FormData formData) {
        val attributes = attributeDefinitionStore.getAttributeDefinitions().stream()
            .map(AttributeDefinition::getKey)
            .collect(toSet());
        val props = casProperties.getAuthn().getAttributeRepository();
        val stub = (NamedStubPersonAttributeDao) Beans.newStubAttributeRepository(props);
        attributes.addAll(stub.getBackingMap().keySet());
        if (profile.isPresent() && !profile.get().getAvailableAttributes().isEmpty()) {
            val p = profile.get();
            attributes.addAll(p.getAvailableAttributes());
        }
        formData.setAvailableAttributes(attributes.stream().sorted().collect(toList()));
    }

    private void loadAttributeRepositories(final FormData formData) {
        formData.setAttributeRepositories(new HashSet<>(mgmtProperties.getAttributeRepositories()));
    }

    private void loadSamlIdpAttributes(final FormData formData) {
        formData.setSamlIdpAttributes(attributeDefinitionStore.getAttributeDefinitions().stream()
            .filter(d -> d instanceof SamlIdPAttributeDefinition)
            .map(AttributeDefinition::getKey)
            .collect(toSet()));
    }

    private void loadUserDefinedScopes(final FormData formData) {
        if (profile.isPresent() && profile.get().getUserDefinedScopes() != null && !profile.get().getUserDefinedScopes().isEmpty()) {
            val p = profile.get();
            formData.setUserDefinedScopes(p.getUserDefinedScopes());
        }
    }
}
