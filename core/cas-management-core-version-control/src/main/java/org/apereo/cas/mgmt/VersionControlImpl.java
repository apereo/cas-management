package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domains.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.lang3.StringUtils;

/**
 * Implementation of {@link VersionControl}.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RequiredArgsConstructor
@Slf4j
public class VersionControlImpl implements VersionControl {

    private final GitUtil git;

    @Override
    public void checkForRename(final RegisteredService service, final ServicesManager servicesManager) throws Exception {
        val oldSvc = servicesManager.findServiceBy(service.getId());
        if (oldSvc != null) {
            if (!service.getName().equals(oldSvc.getName())) {
                try (git) {
                    git.move(makeFileName(oldSvc), makeFileName(service));
                }
            }
        }
    }

    @Override
    public void attachStatus(final RegisteredServiceItem serviceItem) {

    }

    @Override
    public void rebase() {
        this.git.rebase();
    }

    private String makeFileName(final RegisteredService service) throws Exception {
        return StringUtils.remove(service.getName() + '-' + service.getId() + ".json", " ");
    }
}
