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
import org.apereo.cas.services.ServicesManagerRegisteredServiceLocator;
import org.apereo.cas.support.saml.OpenSamlConfigBean;
import org.apereo.cas.support.saml.SamlUtils;
import org.apereo.cas.support.saml.services.SamlIdPServicesManagerRegisteredServiceLocator;
import org.apereo.cas.support.saml.services.idp.metadata.cache.SamlRegisteredServiceCachingMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.SamlRegisteredServiceDefaultCachingMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.SamlRegisteredServiceMetadataResolverCacheLoader;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.ClasspathResourceMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.FileSystemResourceMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.GroovyResourceMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.JsonResourceMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.MetadataQueryProtocolMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.cache.resolver.UrlResourceMetadataResolver;
import org.apereo.cas.support.saml.services.idp.metadata.plan.DefaultSamlRegisteredServiceMetadataResolutionPlan;
import org.apereo.cas.support.saml.services.idp.metadata.plan.SamlRegisteredServiceMetadataResolutionPlan;
import org.apereo.cas.support.saml.services.idp.metadata.plan.SamlRegisteredServiceMetadataResolutionPlanConfigurer;
import org.apereo.cas.util.ResourceUtils;
import org.apereo.cas.util.http.HttpClient;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import net.shibboleth.utilities.java.support.xml.BasicParserPool;
import org.apache.commons.lang3.ClassUtils;
import org.opensaml.saml.metadata.resolver.filter.MetadataFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.HashMap;

/**
 * Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 6.1
 */
@Configuration(value = "casManagementSamlConfiguration", proxyBeanMethods = false)
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementSamlConfiguration {

    private static final int POOL_SIZE = 200;

    private static MetadataFilter getMetadataAggregateFilter(final CasManagementConfigurationProperties managementProperties) throws Exception {
        if (ResourceUtils.doesResourceExist(managementProperties.getInCommonCert())) {
            val signatureValidationFilter = SamlUtils.buildSignatureValidationFilter(managementProperties.getInCommonCert());
            signatureValidationFilter.setRequireSignedRoot(false);
            return signatureValidationFilter;
        }
        return (xmlObject, metadataFilterContext) -> xmlObject;
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
    @SneakyThrows
    public MetadataAggregateResolver metadataAggregateResolver(
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties) {
        return new InCommonMetadataAggregateResolver(casProperties, managementProperties,
            openSamlConfigBean, getMetadataAggregateFilter(managementProperties));

    }

    @Bean
    public UrlMetadataResolver urlMetadataResolver(final CasConfigurationProperties casProperties) {
        return new UrlMetadataResolver(casProperties);
    }

    @Bean(name = OpenSamlConfigBean.DEFAULT_BEAN_NAME)
    public OpenSamlConfigBean openSamlConfigBean(
        @Qualifier("shibboleth.ParserPool")
        final BasicParserPool parserPool) {
        return new OpenSamlConfigBean(parserPool);
    }

    @SneakyThrows
    @Bean(name = "shibboleth.ParserPool", initMethod = "initialize")
    public BasicParserPool parserPool(final CasConfigurationProperties casProperties) {
        val pool = new BasicParserPool();
        pool.setMaxPoolSize(POOL_SIZE);
        pool.setCoalescing(true);
        pool.setIgnoreComments(true);
        pool.setXincludeAware(false);
        pool.setExpandEntityReferences(false);
        pool.setIgnoreComments(true);
        pool.setNamespaceAware(true);

        val attributes = new HashMap<String, Object>();
        val clazz = ClassUtils.getClass(casProperties.getSamlCore().getSecurityManager());
        attributes.put("http://apache.org/xml/properties/security-manager", clazz.getDeclaredConstructor().newInstance());
        pool.setBuilderAttributes(attributes);

        val features = new HashMap<String, Boolean>();
        features.put("http://apache.org/xml/features/disallow-doctype-decl", Boolean.TRUE);
        features.put("http://apache.org/xml/features/validation/schema/normalized-value", Boolean.FALSE);
        features.put("http://javax.xml.XMLConstants/feature/secure-processing", Boolean.TRUE);
        features.put("http://xml.org/sax/features/external-general-entities", Boolean.FALSE);
        features.put("http://xml.org/sax/features/external-parameter-entities", Boolean.FALSE);
        pool.setBuilderFeatures(features);
        return pool;
    }

    @ConditionalOnMissingBean(name = "samlRegisteredServiceMetadataResolvers")
    @Bean
    public SamlRegisteredServiceMetadataResolutionPlan samlRegisteredServiceMetadataResolvers(
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        final ConfigurableApplicationContext applicationContext,
        final CasConfigurationProperties casProperties) {
        val plan = new DefaultSamlRegisteredServiceMetadataResolutionPlan();

        val samlIdp = casProperties.getAuthn().getSamlIdp();
        plan.registerMetadataResolver(new MetadataQueryProtocolMetadataResolver(samlIdp, openSamlConfigBean));
        plan.registerMetadataResolver(new JsonResourceMetadataResolver(samlIdp, openSamlConfigBean));
        plan.registerMetadataResolver(new FileSystemResourceMetadataResolver(samlIdp, openSamlConfigBean));
        plan.registerMetadataResolver(new UrlResourceMetadataResolver(samlIdp, openSamlConfigBean));
        plan.registerMetadataResolver(new ClasspathResourceMetadataResolver(samlIdp, openSamlConfigBean));
        plan.registerMetadataResolver(new GroovyResourceMetadataResolver(samlIdp, openSamlConfigBean));

        val configurers = applicationContext.getBeansOfType(SamlRegisteredServiceMetadataResolutionPlanConfigurer.class, false, true);

        configurers.values().forEach(c -> {
            LOGGER.trace("Configuring saml metadata resolution plan [{}]", c.getName());
            c.configureMetadataResolutionPlan(plan);
        });
        return plan;
    }

    @ConditionalOnMissingBean(name = "chainingMetadataResolverCacheLoader")
    @Bean
    public SamlRegisteredServiceMetadataResolverCacheLoader chainingMetadataResolverCacheLoader(
        @Qualifier("samlRegisteredServiceMetadataResolvers")
        final SamlRegisteredServiceMetadataResolutionPlan samlRegisteredServiceMetadataResolvers,
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        @Qualifier(HttpClient.BEAN_NAME_HTTPCLIENT_NO_REDIRECT)
        final HttpClient httpClient) {
        return new SamlRegisteredServiceMetadataResolverCacheLoader(
            openSamlConfigBean,
            httpClient,
            samlRegisteredServiceMetadataResolvers);
    }

    @ConditionalOnMissingBean(name = "defaultSamlRegisteredServiceCachingMetadataResolver")
    @Bean
    public SamlRegisteredServiceCachingMetadataResolver defaultSamlRegisteredServiceCachingMetadataResolver(
        @Qualifier("chainingMetadataResolverCacheLoader")
        final SamlRegisteredServiceMetadataResolverCacheLoader chainingMetadataResolverCacheLoader,
        @Qualifier(OpenSamlConfigBean.DEFAULT_BEAN_NAME)
        final OpenSamlConfigBean openSamlConfigBean,
        final CasConfigurationProperties casProperties) {
        return new SamlRegisteredServiceDefaultCachingMetadataResolver(
            Duration.parse(casProperties.getAuthn().getSamlIdp().getMetadata().getCore().getCacheExpiration()),
            chainingMetadataResolverCacheLoader, openSamlConfigBean
        );
    }

    @Bean
    @ConditionalOnMissingBean(name = "samlIdPServicesManagerRegisteredServiceLocator")
    public ServicesManagerRegisteredServiceLocator samlIdPServicesManagerRegisteredServiceLocator(
        @Qualifier("defaultSamlRegisteredServiceCachingMetadataResolver")
        final SamlRegisteredServiceCachingMetadataResolver defaultSamlRegisteredServiceCachingMetadataResolver) {
        return new SamlIdPServicesManagerRegisteredServiceLocator(defaultSamlRegisteredServiceCachingMetadataResolver);
    }
}
