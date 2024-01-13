package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.services.UnauthorizedServiceException;
import org.apereo.cas.util.http.HttpExecutionRequest;
import org.apereo.cas.util.http.HttpUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.io.IOUtils;
import org.apache.hc.core5.http.HttpEntityContainer;
import org.apache.hc.core5.http.HttpResponse;
import org.springframework.http.HttpMethod;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;

/**
 * Implementation of metadata aggregate resolver for InCommon.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Slf4j
public class UrlMetadataResolver {
    private final CasConfigurationProperties casProperties;

    public UrlMetadataResolver(final CasConfigurationProperties casProperties) {
        this.casProperties = casProperties;
    }

    @SneakyThrows
    public String xml(final String url) {
        val response = fetchMetadata(url);
        try (val content = ((HttpEntityContainer) response).getEntity().getContent()) {
            return IOUtils.toString(content, StandardCharsets.UTF_8);
        }
    }

    private HttpResponse fetchMetadata(final String metadataLocation) {
        val metadata = casProperties.getAuthn().getSamlIdp().getMetadata();
        val headers = new LinkedHashMap<String, String>();
        headers.put("Content-Type", metadata.getMdq().getSupportedContentType());
        headers.put("Accept", "*/*");

        LOGGER.debug("Fetching metadata via URL for [{}]", metadataLocation);
        val execution = HttpExecutionRequest.builder()
            .url(metadataLocation)
            .basicAuthUsername(metadata.getMdq().getBasicAuthnUsername())
            .basicAuthPassword(metadata.getMdq().getBasicAuthnPassword())
            .parameters(new HashMap<>())
            .method(HttpMethod.GET)
            .headers(headers)
            .build();
        val response = HttpUtils.execute(execution);
        if (response == null) {
            LOGGER.error("Unable to fetch metadata from [{}]", metadataLocation);
            throw UnauthorizedServiceException.denied("Unable to fetch metadata from " + metadataLocation);
        }
        return response;
    }

}
