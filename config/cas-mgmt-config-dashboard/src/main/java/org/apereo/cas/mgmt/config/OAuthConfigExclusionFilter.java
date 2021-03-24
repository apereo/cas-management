package org.apereo.cas.mgmt.config;

import lombok.val;

import org.springframework.boot.autoconfigure.AutoConfigurationImportFilter;
import org.springframework.boot.autoconfigure.AutoConfigurationMetadata;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Class used to exclude AutoConfiguration classes from CAS dependencies.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class OAuthConfigExclusionFilter implements AutoConfigurationImportFilter {

    @Override
    public boolean[] match(final String[] autoConfigurationClasses, final AutoConfigurationMetadata autoConfigurationMetadata) {
        val list = new ArrayList<Boolean>();
        Arrays.stream(autoConfigurationClasses)
                .map(c -> !"org.apereo.cas.config.OAuthProtocolTicketCatalogConfiguration".equalsIgnoreCase(c))
                .forEach(m -> list.add(m));
        val matches = new boolean[list.size()];
        for (int i = 0; i < list.size(); i++) {
            matches[i] = list.get(i);
        }
        return matches;
    }
}
