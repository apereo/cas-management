package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.lang3.StringUtils;
import org.eclipse.jgit.diff.DiffEntry;
import org.pac4j.core.profile.CommonProfile;

import java.util.List;
import java.util.stream.Stream;

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
    public RegisteredServiceItem attachStatus(final RegisteredServiceItem serviceItem) {
        try {
            val status = git.status();
            if (status.getAdded().stream().anyMatch(s -> s.contains(serviceItem.getAssignedId()))) {
                serviceItem.setStatus("ADD");
            } else if (status.getModified().stream().anyMatch(s -> s.contains(serviceItem.getAssignedId()))) {
                serviceItem.setStatus("MODIFY");
            } else if (status.getRemoved().stream().anyMatch(s -> s.contains(serviceItem.getAssignedId()))) {
                serviceItem.setStatus("DELETE");
            }
        } catch (final Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
        }
        return serviceItem;
    }

    @Override
    public void rebase() {
        this.git.rebase();
    }

    private String makeFileName(final RegisteredService service) throws Exception {
        return StringUtils.remove(service.getName() + '-' + service.getId() + ".json", " ");
    }

    @Override
    public void commitSingleFile(final CommonProfile profile, final String path, final String msg) throws Exception {
        git.commitSingleFile((CasUserProfile) profile, path, msg);
    }

    @Override
    public Stream<DiffEntry> scanWorkingDifferences() {
        return git.scanWorkingDiffs().stream();
    }

    @Override
    public List getUnpublishedCommits() throws Exception {
        return git.getUnpublishedCommits();
    }

    @Override
    public void setPublished() {
        git.setPublished();
    }
}
