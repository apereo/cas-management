package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Version control implementation of ServicesManager.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
@Slf4j
public class VersionControlServicesManager extends ManagementServicesManager {

    private final GitUtil git;
    private long lastModified;

    public VersionControlServicesManager(final ServicesManager servicesManager,
                                         final RegisteredServiceResourceNamingStrategy namingStrategy,
                                         final GitUtil git) {
        super(servicesManager, namingStrategy);
        this.git = git;
        changed();
    }

    @Override
    public List<RegisteredServiceItem> getServiceItemsForDomain(final String domain) {
        return super.getServiceItemsForDomain(domain).stream()
                .map(this::attachStatus)
                .collect(Collectors.toList());
    }

    private RegisteredServiceItem attachStatus(final RegisteredServiceItem serviceItem) {
        try {
            val status = git.status();
            val added = new HashSet<String>();
            added.addAll(status.getAdded());
            added.addAll(status.getUntracked());
            if (added.stream().anyMatch(s -> s.contains(serviceItem.getAssignedId()))) {
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

    private boolean changed() {
        val max = Arrays.stream(git.getRepository().getWorkTree().getAbsoluteFile().listFiles())
                .map(f -> f.lastModified())
                .max(Long::compare).get();
        if (this.lastModified == max) {
            return false;
        }
        this.lastModified = max;
        return true;
    }

    @Override
    public Collection<RegisteredService> load() {
        return changed() ? super.load() : null;
    }

    /**
     * Method called to rebase a cloned repository.
     */
    public void rebase() {
        this.git.rebase();
    }

    /**
     * Method will check if the updated service will cause a filename change and handle appropriately.
     *
     * @param service - the service
     */
    @Override
    @SneakyThrows
    public void checkForRename(final RegisteredService service) {
        val existing = findServiceBy(service.getId());
        if (existing != null) {
            val oldName = getNamingStrategy().build(existing, ".json");
            val newName = getNamingStrategy().build(service, ".json");
            if (!oldName.equals(newName)) {
                try (git) {
                    git.move(oldName, newName);
                }
            }
        }
    }

    @Override
    public void deleteAll() {
        super.deleteAll();
        changed();
    }

    @Override
    public RegisteredService save(final RegisteredService registeredService) {
        val service = super.save(registeredService);
        changed();
        return service;
    }

    @Override
    public RegisteredService save(final RegisteredService registeredService, final boolean b) {
        val service = super.save(registeredService, b);
        changed();
        return service;
    }

    @Override
    public RegisteredService delete(final long l) {
        val service = super.delete(l);
        changed();
        return service;
    }

    @Override
    public RegisteredService delete(final RegisteredService registeredService) {
        val service = super.delete(registeredService);
        changed();
        return service;
    }
}
