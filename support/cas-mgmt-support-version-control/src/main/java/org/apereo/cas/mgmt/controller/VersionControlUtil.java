package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.domain.Change;
import org.apereo.cas.mgmt.domain.Diff;
import org.apereo.cas.mgmt.util.CasManagementUtils;

import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.ObjectId;

import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Utility Class for Version Control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Slf4j
@UtilityClass
public class VersionControlUtil {

    /**
     * Restores a service into the service from at its original location.
     *
     * @param git  - GitUtil
     * @param path - path of the file
     */
    @SneakyThrows
    public static void insertService(final GitUtil git, final String path) {
        CasManagementUtils.JSON_SERIALIZER.from(git.readObject(git.history(path).get(0).getId()));
    }

    /**
     * Factory method used to create a Change object to be returned to the client.
     *
     * @param entry - DiffEntry
     * @param git   - GitUtil
     * @return - Change
     */
    public static Change createChange(final DiffEntry entry, final GitUtil git) {
        try {
            return entry.getChangeType() == DiffEntry.ChangeType.DELETE
                ? createDeleteChange(git, entry)
                : createModifyChange(git, entry);
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    /**
     * Creates a change for a delete file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change.
     * @return - Change
     */
    @SneakyThrows
    public static Change createDeleteChange(final GitUtil git, final DiffEntry entry) {
        val json = git.readObject(entry.getOldId().toObjectId());
        val svc = CasManagementUtils.fromJson(json);
        return new Change(String.valueOf(svc.getId()),
                entry.getOldPath(),
                DiffEntry.ChangeType.DELETE.toString(),
                svc.getName(),
                ObjectId.toString(entry.getOldId().toObjectId()),
                null,
                CasManagementUtils.getType(svc));
    }



    /**
     * Creates a change for a modified file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change
     * @return - Change
     */
    @SuppressWarnings("DefaultCharset")
    @SneakyThrows
    public static Change createModifyChange(final GitUtil git, final DiffEntry entry) {
        val file = git.repoPath() + '/' + entry.getNewPath();
        val json = new String(Files.readAllBytes(Paths.get(file)));
        val svc = CasManagementUtils.fromJson(json);
        return new Change(String.valueOf(svc.getId()),
                entry.getNewPath(),
                entry.getChangeType().toString(),
                svc.getName(),
                ObjectId.toString(entry.getOldId().toObjectId()),
                ObjectId.toString(entry.getNewId().toObjectId()),
                CasManagementUtils.getType(svc));
    }

    /**
     * Method creates a diff object to be returned to the client.
     *
     * @param diff - DiffEntry
     * @param git - GitUtil
     * @return - Diff
     */
    public static Diff createDiff(final DiffEntry diff, final GitUtil git) {
        try {
            val id = diff.getChangeType() == DiffEntry.ChangeType.ADD ? diff.getNewId().toObjectId() : diff.getOldId().toObjectId();
            val service = CasManagementUtils.fromJson(git.readObject(id));
            return new Diff(diff.getNewPath(),
                    diff.getOldId().toObjectId(),
                    diff.getNewId().toObjectId(),
                    diff.getChangeType().toString(),
                    service.getName());
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
