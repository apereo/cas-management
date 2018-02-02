package org.apereo.cas.mgmt.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.util.DigestUtils;
import org.eclipse.jgit.diff.DiffEntry;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Class used to manage services in Git repository.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Slf4j
@RequiredArgsConstructor
public class GitServicesManager implements ServicesManager {

    private final ServicesManager manager;
    private final GitUtil git;

    private Map<Long, String> uncommitted;

    /**
     * Loads Services form an existing ServiceManger to initialize a new repository.
     *
     * @param manager - ServicesManger to load from
     */
    public void loadFrom(final ServicesManager manager) {
        manager.getAllServices().stream().forEach(svc -> save(svc));
    }

    /**
     * Returns a list of RegisteredServiceItems for the passed domain.
     *
     * @param domain - Name of the domain to lookup.
     * @return - List of RegisteredServiceItems
     * @throws Exception -failed
     */
    public List<RegisteredServiceItem> getServiceItemsForDomain(final String domain) throws Exception {
        if (git.isNull()) {
            return new ArrayList<>();
        }
        this.uncommitted = new HashMap<>();
        git.scanWorkingDiffs().stream().forEach(d -> createChange(d));
        final List<RegisteredServiceItem> serviceItems = new ArrayList<>();
        final List<RegisteredService> services = new ArrayList<>(getServicesForDomain(domain));
        serviceItems.addAll(services.stream().map(this::createServiceItem).collect(Collectors.toList()));
        //serviceItems.addAll(checkForDeleted(git));
        return serviceItems;

    }

    private List<RegisteredServiceItem> checkForDeleted() {
        try {
            return git.checkForDeletes()
                    .map(d -> getService(d))
                    .collect(Collectors.toList());
        }catch (final Exception e) {
        }
        return new ArrayList<>();
    }

    private RegisteredServiceItem getService(final DiffEntry d) {
        try {
            final String json = git.readObject(d.getOldId().toObjectId());
            final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
            return createServiceItem(serializer.from(json));
        } catch (final Exception e) {
            return null;
        }
    }

    /**
     * Method creates a RegisteredServiceItem from the passed Service to send to the client.
     *
     * @param service - RegisteredService to create the item.
     * @return - RegisteredServiceItem
     */
    public RegisteredServiceItem createServiceItem(final RegisteredService service) {
        final RegisteredServiceItem serviceItem = new RegisteredServiceItem();
        serviceItem.setAssignedId(String.valueOf(service.getId()));
        serviceItem.setEvalOrder(service.getEvaluationOrder());
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
        if (uncommitted != null && uncommitted.containsKey(service.getId())) {
            serviceItem.setStatus(uncommitted.get(service.getId()));
        }
        return serviceItem;
    }

    private void createChange(final DiffEntry entry) {
        try {
            final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
            final RegisteredService svc;
            if (entry.getChangeType() == DiffEntry.ChangeType.DELETE) {
                svc = ser.from(git.readObject(entry.getOldId().toObjectId()));
            } else {
                svc = ser.from(new File(git.repoPath() + "/" + entry.getNewPath()));
            }
            if (this.uncommitted.containsKey(svc.getId())) {
                this.uncommitted.replace(svc.getId(), "MODIFY");
            } else {
                this.uncommitted.put(svc.getId(), entry.getChangeType().toString());
            }
        } catch (final Exception e) {
        }
    }

    @Override
    public RegisteredService save(final RegisteredService registeredService) {
        return this.manager.save(registeredService);
    }

    @Override
    public RegisteredService save(final RegisteredService registeredService, final boolean b) {
        return this.manager.save(registeredService, b);
    }

    @Override
    public RegisteredService delete(final long l) {
        return this.manager.delete(l);
    }

    @Override
    public RegisteredService delete(final RegisteredService registeredService) {
        return this.manager.delete(registeredService);
    }

    @Override
    public RegisteredService findServiceBy(final String s) {
        return this.manager.findServiceBy(s);
    }

    @Override
    public RegisteredService findServiceBy(final Service service) {
        return this.manager.findServiceBy(service);
    }

    @Override
    public Collection<RegisteredService> findServiceBy(final Predicate<RegisteredService> predicate) {
        return this.manager.findServiceBy(predicate);
    }

    @Override
    public <T extends RegisteredService> T findServiceBy(final Service service, final Class<T> aClass) {
        return this.manager.findServiceBy(service, aClass);
    }

    @Override
    public <T extends RegisteredService> T findServiceBy(final String s, final Class<T> aClass) {
        return this.manager.findServiceBy(s, aClass);
    }

    @Override
    public RegisteredService findServiceBy(final long l) {
        return this.manager.findServiceBy(l);
    }

    @Override
    public Collection<RegisteredService> getAllServices() {
        return this.manager.getAllServices();
    }

    @Override
    public boolean matchesExistingService(final Service service) {
        return this.manager.matchesExistingService(service);
    }

    @Override
    public boolean matchesExistingService(final String s) {
        return this.manager.matchesExistingService(s);
    }

    @Override
    public void load() {
        this.manager.load();
    }

    @Override
    public int count() {
        return this.manager.count();
    }

    @Override
    public Collection<RegisteredService> getServicesForDomain(final String domain) {
        return this.manager.getServicesForDomain(domain);
    }

    @Override
    public Collection<String> getDomains() {
        return this.manager.getDomains();
    }
}
