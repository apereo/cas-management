package org.apereo.cas.mgmt.web;

import org.apereo.cas.config.CasCoreUtilSerializationConfiguration;
import org.apereo.cas.config.CasDiscoveryProfileConfiguration;
import org.apereo.cas.config.CasPersonDirectoryConfiguration;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;

import lombok.NoArgsConstructor;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.actuate.autoconfigure.jdbc.DataSourceHealthIndicatorAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.MetricsAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.web.servlet.WebMvcMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

// import org.springframework.boot.actuate.autoconfigure.MetricsDropwizardAutoConfiguration;

/**
 * This is {@link CasManagementWebApplication}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
@SpringBootApplication(exclude = {
    HibernateJpaAutoConfiguration.class,
    JerseyAutoConfiguration.class,
    GroovyTemplateAutoConfiguration.class,
    JmxAutoConfiguration.class,
    CasPersonDirectoryConfiguration.class,
    CasDiscoveryProfileConfiguration.class,
    CasCoreUtilSerializationConfiguration.class,
    DataSourceAutoConfiguration.class,
    DataSourceHealthIndicatorAutoConfiguration.class,
    RedisAutoConfiguration.class,
    MongoAutoConfiguration.class,
    MongoDataAutoConfiguration.class,
    CassandraAutoConfiguration.class,
    DataSourceTransactionManagerAutoConfiguration.class,
    RedisRepositoriesAutoConfiguration.class,
    InfluxDbAutoConfiguration.class,
    WebMvcMetricsAutoConfiguration.class,
    MetricsAutoConfiguration.class

})
@EnableConfigurationProperties({CasManagementConfigurationProperties.class, CasConfigurationProperties.class})
@EnableAsync
@EnableTransactionManagement(proxyTargetClass = true)
@EnableScheduling
@NoArgsConstructor
public class CasManagementWebApplication {

    /**
     * Main entry point of the web application.
     *
     * @param args the args
     */
    public static void main(final String[] args) {
        new SpringApplicationBuilder(CasManagementWebApplication.class)
            .banner(new CasManagementBanner())
            .web(WebApplicationType.SERVLET)
            .logStartupInfo(true)
            .contextClass(CasManagementWebApplicationContext.class)
            .run(args);
    }
}
