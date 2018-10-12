package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;

/**
 * No op impelentation of {@link VersionControl}.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class NoOpVersionControl implements VersionControl {
    @Override
    public void checkForRename(final RegisteredService service, final ServicesManager servicesManager) throws Exception {
        // do nothing
    }

    @Override
    public RegisteredServiceItem attachStatus(final RegisteredServiceItem serviceItem) {
        return serviceItem;
    }

    @Override
    public void rebase() {
       // do nothing
    }
}
