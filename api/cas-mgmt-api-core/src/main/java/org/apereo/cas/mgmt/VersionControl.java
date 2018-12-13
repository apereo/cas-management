package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.eclipse.jgit.diff.DiffEntry;
import org.pac4j.core.profile.CommonProfile;

import java.util.List;
import java.util.stream.Stream;

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

    /**
     * Commits a single file.
     *
     * @param profile - the user
     * @param path - the path
     * @param msg - the message
     * @throws Exception - failed
     */
    void commitSingleFile(CommonProfile profile, String path, String msg) throws Exception;

    /**
     * Method returns a list of DiffEntry representing working changes.
     *
     * @return - Stream of DiffEntry
     */
    Stream<DiffEntry> scanWorkingDifferences();

    /**
     * Returns a list of commits that are unpublished.
     *
     * @return - list of commits
     * @throws Exception - failed
     */
    List getUnpublishedCommits() throws Exception;

    /**
     * Updates the published tag to latest commit.
     */
    void setPublished();
}
