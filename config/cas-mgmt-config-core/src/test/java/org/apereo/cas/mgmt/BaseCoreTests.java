package org.apereo.cas.mgmt;

import org.apereo.cas.config.CasCoreServicesConfiguration;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.config.CasManagementAuthenticationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthorizationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementCoreServicesConfiguration;
import org.junit.ClassRule;
import org.junit.Rule;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Base class for running tests in core.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@SpringBootTest(classes = {
        CasManagementCoreServicesConfiguration.class,
        CasManagementAuthenticationConfiguration.class,
        CasManagementAuthorizationConfiguration.class,
        CasCoreServicesConfiguration.class,
        RefreshAutoConfiguration.class,
        AopAutoConfiguration.class
})
@EnableAspectJAutoProxy
@DirtiesContext
@EnableScheduling
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@TestPropertySource(properties = "mgmt.enableDiscoveryEndpointCall=false")
@WebAppConfiguration
public abstract class BaseCoreTests {

    @ClassRule
    public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();

    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

}
