package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.services.UnauthorizedServiceException;
import org.apereo.cas.support.saml.OpenSamlConfigBean;
import org.apereo.cas.support.saml.SamlUtils;
import org.apereo.cas.util.EncodingUtils;
import org.apereo.cas.util.HttpUtils;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;

import org.jasig.cas.client.util.XmlUtils;
import org.opensaml.saml.metadata.resolver.filter.FilterException;
import org.opensaml.saml.metadata.resolver.filter.impl.SignatureValidationFilter;
import org.opensaml.saml.saml2.metadata.EntityDescriptor;
import org.opensaml.xmlsec.signature.support.SignatureException;
import org.w3c.dom.Element;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of metadata aggregate resolver for InCommon.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Slf4j
public class InCommonMetadataAggregateResolver implements MetadataAggregateResolver {
    private final CasConfigurationProperties casProperties;
    private final CasManagementConfigurationProperties mgmtProperties;
    private final OpenSamlConfigBean configBean;
    private List<String> sps;
    private final SignatureValidationFilter signatureValidationFilter;

    @SneakyThrows
    public InCommonMetadataAggregateResolver(final CasConfigurationProperties casProperties,
                                             final CasManagementConfigurationProperties mgmtProperties,
                                             final OpenSamlConfigBean configBean) {
        this.casProperties = casProperties;
        this.mgmtProperties = mgmtProperties;
        this.configBean = configBean;
        this.sps = fromInCommon();
        this.signatureValidationFilter = SamlUtils.buildSignatureValidationFilter(mgmtProperties.getInCommonCert());
        this.signatureValidationFilter.setRequireSignedRoot(false);
    }

    @Override
    public List<String> query(final String regexp) {
        return sps.stream()
                .filter(e -> e.contains(regexp))
                .collect(Collectors.toList());
    }

    @Override
    public String location() {
        return mgmtProperties.getInCommonMDQUrl() + "/{0}";
    }

    @Override
    public EntityDescriptor find(final String entityId) throws SignatureException {
        val entity = MetadataUtil.fromXML(xml(entityId), configBean);
        try {
            this.signatureValidationFilter.filter(entity);
        } catch (final FilterException exception) {
            LOGGER.error(exception.getMessage(), exception);
            throw new SignatureException("Invalid metadata signature for [" + entityId + "]");
        }
        return entity;
    }

    @Override
    @SneakyThrows
    public String xml(final String entityId) {
        if (sps.contains(entityId)) {
            val resp = fetchMetadata(mgmtProperties.getInCommonMDQUrl() + "/" + EncodingUtils.urlEncode(entityId));

            try (val entity = resp.getEntity().getContent()) {
                return IOUtils.toString(entity, StandardCharsets.UTF_8);
            } catch (final Exception e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
        throw new IllegalArgumentException("Entity not found");
    }

    private HttpResponse fetchMetadata(final String metadataLocation) {
        val metadata = casProperties.getAuthn().getSamlIdp().getMetadata();
        val headers = new LinkedHashMap<String, Object>();
        headers.put("Content-Type", metadata.getSupportedContentTypes());
        headers.put("Accept", "*/*");

        LOGGER.debug("Fetching dynamic metadata via MDQ for [{}]", metadataLocation);
        val response = HttpUtils.executeGet(metadataLocation, metadata.getBasicAuthnUsername(),
                casProperties.getAuthn().getSamlIdp().getMetadata().getBasicAuthnPassword(), new HashMap<>(), headers);
        if (response == null) {
            LOGGER.error("Unable to fetch metadata from [{}]", metadataLocation);
            throw new UnauthorizedServiceException(UnauthorizedServiceException.CODE_UNAUTHZ_SERVICE);
        }
        return response;
    }

    @SneakyThrows
    private List<String> fromInCommon() {
        val resp = fetchMetadata(mgmtProperties.getInCommonMDQUrl());
        val entity = resp.getEntity();
        val result = IOUtils.toString(entity.getContent(), StandardCharsets.UTF_8);
        val doc = XmlUtils.newDocument(result);
        val list = new ArrayList<String>();
        val nodes = doc.getDocumentElement().getElementsByTagName("EntityDescriptor");
        for (int i = 0; i < nodes.getLength(); i++) {
            if (((Element) nodes.item(i)).getElementsByTagName("SPSSODescriptor").getLength() > 0) {
                list.add(((Element) nodes.item(i)).getAttribute("entityID"));
            }
        }
        return list;
    }
}
