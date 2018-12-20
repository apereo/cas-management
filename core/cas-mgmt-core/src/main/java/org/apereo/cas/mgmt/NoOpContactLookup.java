package org.apereo.cas.mgmt;

import org.apereo.cas.services.RegisteredServiceContact;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Default NoOp version of contact lookup.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class NoOpContactLookup implements ContactLookup {

    @Override
    public Collection<RegisteredServiceContact> query(final String query) {
        return new ArrayList<>();
    }
}
