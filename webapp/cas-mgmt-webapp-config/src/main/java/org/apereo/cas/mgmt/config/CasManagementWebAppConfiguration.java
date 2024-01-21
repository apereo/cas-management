package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.controller.ViewController;
import org.apereo.cas.mgmt.web.DefaultCasManagementEventListener;
import org.apereo.cas.oidc.claims.BaseOidcScopeAttributeReleasePolicy;
import org.apereo.cas.oidc.claims.OidcCustomScopeAttributeReleasePolicy;
import org.apereo.cas.util.CollectionUtils;
import lombok.val;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter;
import org.springframework.web.servlet.mvc.UrlFilenameViewController;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Locale;
import java.util.Properties;
import java.util.stream.Collectors;

/**
 * This is {@link CasManagementWebAppConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@AutoConfiguration
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementWebAppConfiguration implements WebMvcConfigurer {


    @Bean
    public SimpleUrlHandlerMapping handlerMapping() {
        val mapping = new SimpleUrlHandlerMapping();
        mapping.setOrder(0);
        mapping.setAlwaysUseFullPath(true);
        val properties = new Properties();
        properties.put("/*.html", new UrlFilenameViewController());
        mapping.setMappings(properties);
        return mapping;
    }

    @ConditionalOnMissingBean(name = "localeResolver")
    @Bean
    public LocaleResolver casManagementLocaleResolver(final CasManagementConfigurationProperties managementProperties) {
        return new CookieLocaleResolver() {
            @Override
            protected Locale determineDefaultLocale(final HttpServletRequest request) {
                val locale = request.getLocale();
                if (StringUtils.isEmpty(managementProperties.getDefaultLocale())
                    || !locale.getLanguage().equals(managementProperties.getDefaultLocale())) {
                    return locale;
                }
                return new Locale(managementProperties.getDefaultLocale());
            }
        };
    }

    @Bean(name = "localeChangeInterceptor")
    public HandlerInterceptor casManagementLocaleChangeInterceptor(final CasConfigurationProperties casProperties) {
        val bean = new LocaleChangeInterceptor();
        bean.setParamName(casProperties.getLocale().getParamName());
        return bean;
    }

    @Bean
    public SimpleControllerHandlerAdapter casManagementSimpleControllerHandlerAdapter() {
        return new SimpleControllerHandlerAdapter();
    }

    @Bean
    public Collection<BaseOidcScopeAttributeReleasePolicy> userDefinedScopeBasedAttributeReleasePolicies(
        final CasConfigurationProperties casProperties) {
        val oidc = casProperties.getAuthn().getOidc();
        return oidc.getCore().getUserDefinedScopes().entrySet()
            .stream()
            .map(k -> new OidcCustomScopeAttributeReleasePolicy(k.getKey(), CollectionUtils.wrapList(k.getValue().split(","))))
            .collect(Collectors.toSet());
    }

    @Bean
    public DefaultCasManagementEventListener defaultCasManagementEventListener() {
        return new DefaultCasManagementEventListener();
    }

    @Bean
    public SpringResourceTemplateResolver casManagementTemplateResolver(
        final ConfigurableApplicationContext applicationContext) {
        val resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("classpath:/dist/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML");
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resolver.setCacheable(false);
        resolver.setOrder(1);
        resolver.setCheckExistence(true);
        resolver.setResolvablePatterns(CollectionUtils.wrapHashSet("management/**"));
        return resolver;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/dist/", "classpath:/static/");
    }

    @Bean
    public ViewController viewController() {
        return new ViewController();
    }

    @Bean
    protected UrlFilenameViewController passThroughController() {
        return new UrlFilenameViewController();
    }

}
