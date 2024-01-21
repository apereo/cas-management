package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.InCommonMetadataAggregateResolver;
import org.apereo.cas.mgmt.MetadataAggregateResolver;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.SamlController;
import org.apereo.cas.mgmt.UrlMetadataResolver;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.saml.OpenSamlConfigBean;
import org.apereo.cas.support.saml.SamlUtils;
import org.apereo.cas.util.ResourceUtils;
import lombok.val;
import org.opensaml.saml.metadata.resolver.filter.MetadataFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

/**
 * Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 6.1
 */
@AutoConfiguration
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementSamlConfiguration {

    private static MetadataFilter getMetadataAggregateFilter(final CasManagementConfigurationProperties managementProperties) throws Exception {
        if (ResourceUtils.doesResourceExist(managementProperties.getInCommonCert())) {
            val signatureValidationFilter = SamlUtils.buildSignatureValidationFilter(managementProperties.getInCommonCert());
            signatureValidationFilter.setRequireSignedRoot(false);
            return signatureValidationFilter;
        }
        return null;
    }

    @Bean
    public SamlController samlController(
        @Qualifier("urlMetadataResolver")
        final UrlMetadataResolver urlMetadataResolver,
        @Qualifier("metadataAggregateResolver")
        final MetadataAggregateResolver metadataAggregateResolver,
        @Qualifier("managerFactory")
        final MgmtManagerFactory<? extends ServicesManager> managerFactory,
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("formDataFactory")
        final FormDataFactory formDataFactory) {
        return new SamlController(
            managerFactory,
            managementProperties,
            formDataFactory.create(),
            openSamlConfigBean,
            metadataAggregateResolver,
            urlMetadataResolver);
    }

    @Bean
    public MetadataAggregateResolver metadataAggregateResolver(
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties) throws Exception {
        return new InCommonMetadataAggregateResolver(casProperties, managementProperties,
            openSamlConfigBean, getMetadataAggregateFilter(managementProperties));

    }

    @Bean
    public UrlMetadataResolver urlMetadataResolver(final CasConfigurationProperties casProperties) {
        return new UrlMetadataResolver(casProperties);
    }
}
