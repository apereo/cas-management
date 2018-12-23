package org.apereo.cas.mgmt;

import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.util.DigestUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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
public class ManagementServicesManager implements ServicesManager {

    private final ServicesManager manager;
    private final VersionControl versionControl;

    /**
     * Loads Services form an existing ServiceManger to initialize a new repository.
     *
     * @param manager - ServicesManger to load from
     */
    public void loadFrom(final ServicesManager manager) {
        manager.getAllServices().stream().forEach(this::save);
    }

    /**
     * Returns a list of RegisteredServiceItems for the passed domain.
     *
     * @param domain - Name of the domain to lookup.
     * @return - List of RegisteredServiceItems
     */
    public List<RegisteredServiceItem> getServiceItemsForDomain(final String domain) {
        LOGGER.debug("Loading services for domain [{}]", domain);
        val services = new ArrayList<RegisteredService>(getServicesForDomain(domain));
        return services.stream()
            .map(this::createServiceItem)
            .map(versionControl::attachStatus)
            .collect(Collectors.toList());
    }

    /**
     * Method creates a RegisteredServiceItem from the passed Service to send to the client.
     *
     * @param service - RegisteredService to create the item.
     * @return - RegisteredServiceItem
     */
    public RegisteredServiceItem createServiceItem(final RegisteredService service) {
        val serviceItem = new RegisteredServiceItem();
        serviceItem.setAssignedId(String.valueOf(service.getId()));
        serviceItem.setEvalOrder(service.getEvaluationOrder());
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
        service.getId();
        LOGGER.debug("Created service item [{}] based on registered service [{}]", serviceItem, service.getServiceId());
        return serviceItem;
    }

    @Override
    public void deleteAll() {
        this.manager.deleteAll();
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
    public Collection<RegisteredService> load() {
        LOGGER.debug("Loading registered services from CAS service registry...");
        return this.manager.load();
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

    /**
     * Extract domain string.
     *
     * @param service the service
     * @return the string
     */
    public String extractDomain(final String service) {
        return CasManagementUtils.extractDomain(service);
    }

    /**
     * Validate domain string.
     *
     * @param providedDomain the provided domain
     * @return the string
     */
    public String validateDomain(final String providedDomain) {
        return CasManagementUtils.validateDomain(providedDomain);
    }

    /**
     * Returns the versionControl.
     *
     * @return - VersionControl
     */
    public VersionControl getVersionControl() {
        return versionControl;
    }
}
