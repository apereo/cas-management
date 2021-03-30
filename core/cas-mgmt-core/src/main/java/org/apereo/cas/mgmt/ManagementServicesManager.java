package org.apereo.cas.mgmt;

import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.DefaultRegisteredServiceMultifactorPolicy;
import org.apereo.cas.services.DomainAwareServicesManager;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.util.DigestUtils;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.lang3.StringUtils;

import java.util.Collection;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Class used to manage services in Git repository.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Slf4j
@RequiredArgsConstructor
public class ManagementServicesManager implements ServicesManager, DomainAwareServicesManager {

    private final ServicesManager manager;
    private final RegisteredServiceResourceNamingStrategy namingStrategy;

    /**
     * Loads Services form an existing ServiceManger to initialize a new repository.
     *
     * @param manager - ServicesManger to load from
     */
    public void loadFrom(final ServicesManager manager) {
        manager.getAllServices().forEach(this::save);
    }

    public List<RegisteredServiceItem> getServiceItems(final Stream<RegisteredService> services) {
        return services.map(this::createServiceItem)
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
        if (service.getMultifactorPolicy() instanceof DefaultRegisteredServiceMultifactorPolicy) {
            serviceItem.setDuo(service.getMultifactorPolicy().getMultifactorAuthenticationProviders().contains("mfa-duo"));
        }
        serviceItem.setSso(service.getAccessStrategy().isServiceAccessAllowedForSso());
        serviceItem.setStaged(service.getEnvironments() != null && service.getEnvironments().contains("staged"));
        serviceItem.setCName(service.getClass().getCanonicalName());
        serviceItem.setType(CasManagementUtils.getType(service));
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
    public RegisteredService findServiceByName(final String name) {
        return this.manager.findServiceByName(name);
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
    public RegisteredService findServiceBy(final long l) {
        return this.manager.findServiceBy(l);
    }

    @Override
    public Collection<RegisteredService> getAllServices() {
        return this.manager.getAllServices();
    }

    @Override
    public Collection<RegisteredService> load() {
        LOGGER.debug("Loading registered services from CAS service registry...");
        return this.manager.load();
    }

    @Override
    public long count() {
        return this.manager.count();
    }

    @Override
    public Collection<RegisteredService> getServicesForDomain(final String domain) {
        LOGGER.warn("Services Manage = [{}]", this.manager);
        if (this.manager instanceof DomainAwareServicesManager) {
            return ((DomainAwareServicesManager) this.manager).getServicesForDomain(domain);
        }
        return this.manager.getAllServices();
    }

    @Override
    public Stream<String> getDomains() {
        return ((DomainAwareServicesManager) this.manager).getDomains();
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
     * Checks for existing service and if a name change will occur delete the existing service.
     *
     * @param service - the service
     */
    @SneakyThrows
    public void checkForRename(final RegisteredService service) {
        val existing = findServiceBy(service.getId());
        if (existing != null) {
            val oldName = this.namingStrategy.build(existing, StringUtils.EMPTY);
            val newName = this.namingStrategy.build(service, StringUtils.EMPTY);
            if (!oldName.equals(newName)) {
                delete(service.getId());
            }
        }
    }

    protected RegisteredServiceResourceNamingStrategy getNamingStrategy() {
        return namingStrategy;
    }
}
