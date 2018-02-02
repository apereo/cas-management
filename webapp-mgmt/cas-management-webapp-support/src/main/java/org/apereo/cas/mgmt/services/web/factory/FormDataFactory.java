package org.apereo.cas.mgmt.services.web.factory;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.discovery.CasServerProfile;
import org.apereo.cas.mgmt.services.web.beans.CasServerProfileWrapper;
import org.apereo.cas.mgmt.services.web.beans.FormData;
import org.apereo.cas.services.OidcRegisteredService;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.util.HttpUtils;
import org.apereo.cas.ws.idp.services.WSFederationRegisteredService;
import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.http.HttpStatus;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class FormDataFactory {

    private final CasConfigurationProperties casProperties;
    private final IPersonAttributeDao attributeRepository;

    private CasServerProfile profile;

    public FormData create() {
        final FormData formData = new FormData();
        loadServiceTypes(formData);
        loadMfaProviders(formData);
        loadDelegatedClientTypes(formData);
        loadAvailableAttributes(formData);
        return formData;
    }

    @PostConstruct
    private void callForProfile() {
        try {
            final Map<String, String> params = new HashMap<>();
            final String url = casProperties.getServer().getPrefix() + "/status/discovery";
            final HttpResponse response = HttpUtils.executeGet(url, params);
            if (response.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
                final ObjectMapper mapper = new ObjectMapper();
                this.profile = mapper.readValue(response.getEntity().getContent(),
                        CasServerProfileWrapper.class).getProfile();
                LOGGER.info("FormData is populated with values from {}.", url);
            } else {
                LOGGER.info("CAS Server returned {} status code from endpoint {}. Using default FormData values.",
                        response.getStatusLine().getStatusCode(),
                        url);
            }
        } catch(Exception e) {
            LOGGER.error("An error occurred attempting to contact CAS Server to retrieve profile", e);
        }
    }

    private void loadServiceTypes(final FormData formData) {
        if (profile != null && profile.getRegisteredServiceTypes().size() > 0) {
            final List<FormData.Option> types = profile.getRegisteredServiceTypes().entrySet().stream()
                    .map(e -> new FormData.Option(e.getKey(),e.getValue().getTypeName()))
                    .collect(Collectors.toList());
            formData.setServiceTypes(types);
        } else {
            final List<FormData.Option> serviceTypes = new ArrayList<>();
            serviceTypes.add(new FormData.Option("CAS Client", RegexRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("OAuth2 Client", OAuthRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("SAML2 Service Provider", SamlRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("OpenID Connect Relying Party", OidcRegisteredService.class.getTypeName()));
            serviceTypes.add(new FormData.Option("WS Federation Relying Party", WSFederationRegisteredService.class.getTypeName()));
            formData.setServiceTypes(serviceTypes);
        }
    }

    private void loadMfaProviders(final FormData formData) {
        if (profile != null && profile.getMultifactorAuthenticationProviderTypes().size() > 0) {
            final List<FormData.Option> mfas = profile.getMultifactorAuthenticationProviderTypes().entrySet().stream()
                    .map(e -> new FormData.Option(e.getKey(),e.getValue()))
                    .collect(Collectors.toList());
            formData.setMfaProviders(mfas);
        } else {
            final List<FormData.Option> mfaProviders = new ArrayList<>();
            mfaProviders.add(new FormData.Option("Duo Security", "mfa-duo"));
            mfaProviders.add(new FormData.Option("Authy Authenticator", "mfa-authy"));
            mfaProviders.add(new FormData.Option("YubiKey", "mfa-yubikey"));
            mfaProviders.add(new FormData.Option("RSA/RADIUS", "mfa-radius"));
            mfaProviders.add(new FormData.Option("WiKID", "mfa-wikid"));
            mfaProviders.add(new FormData.Option("Google Authenitcator", "mfa-gauth"));
            mfaProviders.add(new FormData.Option("Microsoft Azure", "mfa-azure"));
            mfaProviders.add(new FormData.Option("FIDO U2F", "mfa-u2f"));
            mfaProviders.add(new FormData.Option("Swivel Secure", "mfa-swivel"));
            formData.setMfaProviders(mfaProviders);
        }
    }

    private void loadDelegatedClientTypes(final FormData formData) {
        if (profile != null && profile.getDelegatedClientTypes().size() > 0) {
            formData.setDelegatedAuthnProviders(profile.getDelegatedClientTypes());
        } else {
            final Set<String> delegatedAuthnProviders = new HashSet<>();
            delegatedAuthnProviders.add("Twitter");
            delegatedAuthnProviders.add("Paypal");
            delegatedAuthnProviders.add("Wordpress");
            delegatedAuthnProviders.add("Yahoo");
            delegatedAuthnProviders.add("Orcid");
            delegatedAuthnProviders.add("Dropbox");
            delegatedAuthnProviders.add("Github");
            delegatedAuthnProviders.add("Foursquare");
            delegatedAuthnProviders.add("WindowsLive");
            delegatedAuthnProviders.add("Google");
            formData.setDelegatedAuthnProviders(delegatedAuthnProviders);
        }
    }

    private void loadAvailableAttributes(final FormData formData) {
        if (profile != null && profile.getAvailableAttributes().size() > 0) {
            formData.setAvailableAttributes(profile.getAvailableAttributes());
        } else {
            formData.setAvailableAttributes(this.attributeRepository.getPossibleUserAttributeNames());
        }
    }

}
