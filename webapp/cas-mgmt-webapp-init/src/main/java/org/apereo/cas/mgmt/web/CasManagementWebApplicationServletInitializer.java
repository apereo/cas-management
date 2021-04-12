package org.apereo.cas.mgmt.web;

import org.apereo.cas.mgmt.CasManagementEmbeddedContainerUtils;

import lombok.val;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


/**
 * This is {@link CasManagementWebApplicationServletInitializer}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
public class CasManagementWebApplicationServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder builder) {
        //val properties = CasManagementEmbeddedContainerUtils.getRuntimeProperties(Boolean.FALSE);
        return builder
                .sources(CasManagementWebApplication.class)
          //      .properties(properties)
                .banner(CasManagementEmbeddedContainerUtils.getCasManagementBannerInstance());
    }
}
