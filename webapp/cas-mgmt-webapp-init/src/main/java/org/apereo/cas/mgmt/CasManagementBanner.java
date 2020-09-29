package org.apereo.cas.mgmt;

import org.apereo.cas.util.spring.boot.AbstractCasBanner;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import java.nio.charset.StandardCharsets;

/**
 * This is {@link CasManagementBanner}.
 *
 * @author Misagh Moayyed
 * @since 6.2.3
 */
public class CasManagementBanner extends AbstractCasBanner {
    @SneakyThrows
    protected String getTitle() {
        return IOUtils.toString(new ClassPathResource("/mgmt-banner.txt").getInputStream(), StandardCharsets.UTF_8);
    }
}
