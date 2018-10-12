package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;

/**
 * Interface to Git.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public interface VersionControl {
    /**
     * Performs git move if file renamed.
     *
     * @param service - the service
     * @param servicesManager - the servicesManager
     * @throws Exception - failed
     */
    void checkForRename(RegisteredService service, ServicesManager servicesManager) throws Exception;

    /**
     * Looks up git status for the passed item and sets it on the item.
     *
     * @param serviceItem - RegisteredServiceItems
     * @return - the service item
     */
    RegisteredServiceItem attachStatus(RegisteredServiceItem serviceItem);

    /**
     * Rebases the Git Repository for the user.
     */
    void rebase();
}
