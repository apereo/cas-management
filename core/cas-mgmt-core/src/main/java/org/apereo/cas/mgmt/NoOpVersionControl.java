package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.eclipse.jgit.diff.DiffEntry;
import org.pac4j.core.profile.CommonProfile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * No op impelentation of {@link VersionControl}.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class NoOpVersionControl implements VersionControl {
    @Override
    public void checkForRename(final RegisteredService service, final ServicesManager servicesManager) {
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

    @Override
    public void commitSingleFile(final CommonProfile profile, final String path, final String msg) {
       // do nothing
    }

    @Override
    public Stream<DiffEntry> scanWorkingDifferences() {
        return Stream.empty();
    }

    @Override
    public List getUnpublishedCommits() throws Exception {
        return new ArrayList();
    }

    @Override
    public void setPublished() {
        // do nothing
    }
}
