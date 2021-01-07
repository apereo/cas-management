package org.apereo.cas.mgmt.config;

import org.apereo.cas.audit.spi.resource.ShortenedReturnValueAsStringAuditResourceResolver;
import org.apereo.cas.mgmt.audit.Pac4jAuditablePrincipalResolver;
import org.apereo.cas.mgmt.audit.ServiceManagementResourceResolver;
import org.apereo.cas.util.CollectionUtils;
import lombok.val;
import org.apereo.inspektr.audit.AuditTrailManagementAspect;
import org.apereo.inspektr.audit.AuditTrailManager;
import org.apereo.inspektr.audit.spi.AuditActionResolver;
import org.apereo.inspektr.audit.spi.AuditResourceResolver;
import org.apereo.inspektr.audit.spi.support.DefaultAuditActionResolver;
import org.apereo.inspektr.audit.spi.support.ObjectCreationAuditActionResolver;
import org.apereo.inspektr.audit.support.Slf4jLoggingAuditTrailManager;
import org.apereo.inspektr.common.spi.PrincipalResolver;
import org.apereo.inspektr.common.web.ClientInfoThreadLocalFilter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

/**
 * This is {@link CasManagementAuditConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
@Configuration("casManagementAuditConfiguration")
public class CasManagementAuditConfiguration {
    private static final String AUDIT_ACTION_SUFFIX_FAILED = "_FAILED";
    private static final String AUDIT_ACTION_SUFFIX_SUCCESS = "_SUCCESS";

    @Bean
    @ConditionalOnMissingBean(name = "saveServiceResourceResolver")
    public AuditResourceResolver saveServiceResourceResolver() {
        return new ShortenedReturnValueAsStringAuditResourceResolver();
    }

    @Bean
    @ConditionalOnMissingBean(name = "deleteServiceResourceResolver")
    public AuditResourceResolver deleteServiceResourceResolver() {
        return new ServiceManagementResourceResolver();
    }

    @Bean
    @ConditionalOnMissingBean(name = "saveServiceActionResolver")
    public AuditActionResolver saveServiceActionResolver() {
        return new DefaultAuditActionResolver(AUDIT_ACTION_SUFFIX_SUCCESS, AUDIT_ACTION_SUFFIX_FAILED);
    }

    @Bean
    @ConditionalOnMissingBean(name = "deleteServiceActionResolver")
    public AuditActionResolver deleteServiceActionResolver() {
        return new ObjectCreationAuditActionResolver(AUDIT_ACTION_SUFFIX_SUCCESS, AUDIT_ACTION_SUFFIX_FAILED);
    }

    @Bean
    public PrincipalResolver auditablePrincipalResolver() {
        return new Pac4jAuditablePrincipalResolver();
    }

    @Bean
    public AuditTrailManagementAspect auditTrailManagementAspect() {
        return new AuditTrailManagementAspect("CAS_Management",
            auditablePrincipalResolver(), CollectionUtils.wrap(auditTrailManager()),
            auditActionResolverMap(),
            auditResourceResolverMap());
    }

    @Bean
    public AuditTrailManager auditTrailManager() {
        return new Slf4jLoggingAuditTrailManager();
    }

    @Bean
    public Map<String, AuditResourceResolver> auditResourceResolverMap() {
        val map = new HashMap<String, AuditResourceResolver>(2);
        map.put("DELETE_SERVICE_RESOURCE_RESOLVER", deleteServiceResourceResolver());
        map.put("SAVE_SERVICE_RESOURCE_RESOLVER", saveServiceResourceResolver());
        return map;
    }

    @Bean
    public Map<String, AuditActionResolver> auditActionResolverMap() {
        val map = new HashMap<String, AuditActionResolver>(2);
        map.put("DELETE_SERVICE_ACTION_RESOLVER", deleteServiceActionResolver());
        map.put("SAVE_SERVICE_ACTION_RESOLVER", saveServiceActionResolver());
        return map;
    }

    @Bean
    public FilterRegistrationBean casClientInfoLoggingFilter() {
        val bean = new FilterRegistrationBean();
        bean.setFilter(new ClientInfoThreadLocalFilter());
        bean.setUrlPatterns(CollectionUtils.wrap("/*"));
        bean.setName("CAS Client Info Logging Filter");
        bean.setAsyncSupported(true);
        return bean;
    }
}
