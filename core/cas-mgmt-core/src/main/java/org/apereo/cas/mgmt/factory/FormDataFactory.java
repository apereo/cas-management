package org.apereo.cas.mgmt.factory;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.discovery.CasServerProfile;
import org.apereo.cas.mgmt.domain.FormData;
import org.apereo.cas.services.OidcRegisteredService;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.util.HttpUtils;
import org.apereo.cas.ws.idp.services.WSFederationRegisteredService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.lang3.StringUtils;
import org.apereo.services.persondir.IPersonAttributeDao;
import org.apereo.services.persondir.IPersonAttributeDaoFilter;
import org.springframework.http.HttpStatus;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

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
    private final IPersonAttributeDao attributeRepository;

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
        loadSamlIdpAttributes(formData);
        return formData;
    }

    @PostConstruct
    private void callForProfile() {
        if (!mgmtProperties.isEnableDiscoveryEndpointCall()) {
            LOGGER.warn("Call to cas/actuator/discoveryProfile disabled by management configuration.  Using default FormData values.");
            return;
        }
        if (StringUtils.isBlank(casProperties.getServer().getName())) {
            LOGGER.warn("CAS server name is undefined and cannot be contacted to retrieve profile");
            return;
        }

        val params = new HashMap<String, Object>();
        val url = casProperties.getServer().getPrefix() + mgmtProperties.getDiscoveryEndpointPath();
        try {
            val response = HttpUtils.executeGet(url, params);
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

            val types = p.getRegisteredServiceTypesSupported().entrySet().stream()
                .map(e -> new FormData.Option(e.getKey(), e.getValue().getTypeName()))
                .collect(toList());
            formData.setServiceTypes(types);
        } else {
            val serviceTypes = new ArrayList<FormData.Option>();
            serviceTypes.add(new FormData.Option("CAS Client", RegexRegisteredService.class.getTypeName()));
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
            formData.setMfaProviders(mfaProviders);
        }
    }

    private void loadDelegatedClientTypes(final FormData formData) {
        if (profile.isPresent() && !profile.get().getDelegatedClientTypesSupported().isEmpty()) {
            val p = profile.get();
            formData.setDelegatedAuthnProviders(p.getDelegatedClientTypesSupported());
        } else {
            val delegatedAuthnProviders = new HashSet<String>();
            delegatedAuthnProviders.add("Twitter");
            delegatedAuthnProviders.add("Paypal");
            delegatedAuthnProviders.add("Wordpress");
            delegatedAuthnProviders.add("Yahoo");
            delegatedAuthnProviders.add("Orcid");
            delegatedAuthnProviders.add("Dropbox");
            delegatedAuthnProviders.add("Github");
            delegatedAuthnProviders.add("Facebook");
            delegatedAuthnProviders.add("Foursquare");
            delegatedAuthnProviders.add("WindowsLive");
            delegatedAuthnProviders.add("Google");
            formData.setDelegatedAuthnProviders(delegatedAuthnProviders);
        }
    }

    private void loadAvailableAttributes(final FormData formData) {
        if (profile.isPresent() && !profile.get().getAvailableAttributes().isEmpty()) {
            val p = profile.get();
            formData.setAvailableAttributes(p.getAvailableAttributes());
        } else {
            formData.setAvailableAttributes(this.attributeRepository.getPossibleUserAttributeNames(IPersonAttributeDaoFilter.alwaysChoose()));
        }
    }

    private void loadSamlIdpAttributes(final FormData formData) {
        /*
        if (profile.isPresent() && !profile.get().getSamlIdpAttributeUriIds().isEmpty()) {
            val p = profile.get();
            formData.setSamlIdpAttributes(p.getSamlIdpAttributeUriIds().keySet());
        }

         */
    }
}
