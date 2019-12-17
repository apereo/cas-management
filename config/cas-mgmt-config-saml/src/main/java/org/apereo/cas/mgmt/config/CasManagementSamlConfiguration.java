package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.InCommonMetadataAggregateResolver;
import org.apereo.cas.mgmt.MetadataAggregateResolver;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.SamlController;
import org.apereo.cas.mgmt.UrlMetadataResolver;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.support.saml.OpenSamlConfigBean;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import net.shibboleth.utilities.java.support.xml.BasicParserPool;
import org.apache.commons.lang3.ClassUtils;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

/**
 *Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 6.1
 */
@Configuration("casManagementSamlConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementSamlConfiguration {

    private static final int POOL_SIZE = 200;

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<MgmtManagerFactory> managerFactory;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    @Qualifier("formDataFactory")
    private ObjectProvider<FormDataFactory> formDataFactory;

    @Bean
    public SamlController samlController() {
        return new SamlController(metadataAggregateResolver(),
                formDataFactory.getIfAvailable().create(),
                openSamlConfigBean(),
                managementProperties,
                managerFactory.getIfAvailable(),
                urlMetadataResolver());
    }

    @Bean
    public MetadataAggregateResolver metadataAggregateResolver() {
        return new InCommonMetadataAggregateResolver(casProperties, openSamlConfigBean());
    }

    @Bean
    public UrlMetadataResolver urlMetadataResolver() {
        return new UrlMetadataResolver(casProperties, openSamlConfigBean());
    }

    @Bean(name = "shibboleth.OpenSAMLConfig")
    public OpenSamlConfigBean openSamlConfigBean() {
        return new OpenSamlConfigBean(parserPool());
    }

    @SneakyThrows
    @Bean(name = "shibboleth.ParserPool", initMethod = "initialize")
    public BasicParserPool parserPool() {
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
}
