package org.apereo.cas.mgmt.web;

import org.apereo.cas.mgmt.CasManagementUtils;
import org.apereo.cas.util.spring.boot.AbstractCasBanner;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.env.Environment;

import java.util.Formatter;

/**
 * This is {@link CasManagementBanner}.
 *
 * @author Misagh Moayyed
 * @since 5.0.0
 */
public class CasManagementBanner extends AbstractCasBanner {
    @Override
    protected String getTitle() {
        return "CAS Management";
    }

    @Override
    protected void injectEnvironmentInfoIntoBanner(final Formatter formatter, final Environment environment, final Class<?> sourceClass) {
        formatter.format("CAS Management Version: %s%n", StringUtils.defaultString(CasManagementUtils.getVersion(), "Not Available"));
        formatter.format("CAS Management Commit Id: %s%n", StringUtils.defaultString(CasManagementUtils.getSpecificationVersion(), "Not Available"));
        super.injectEnvironmentInfoIntoBanner(formatter, environment, sourceClass);
    }
}
