package org.apereo.cas.mgmt;

import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.query.RegisteredServiceQuery;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.util.DigestUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.Supplier;
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
public class ManagementServicesManager implements ServicesManager {

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

    public <T extends RegisteredService> List<RegisteredServiceItem> getServiceItems(final Stream<T> services) {
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
        var multifactorPolicy = service.getMultifactorAuthenticationPolicy();
        if (multifactorPolicy != null && multifactorPolicy.getMultifactorAuthenticationProviders() != null) {
            serviceItem.setDuo(multifactorPolicy.getMultifactorAuthenticationProviders().contains("mfa-duo"));
        }
        serviceItem.setSso(service.getAccessStrategy().isServiceAccessAllowedForSso(service));
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
    public void save(final Stream<RegisteredService> toSave) {
        this.manager.save(toSave);
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
    public void save(final Supplier<RegisteredService> supplier, final Consumer<RegisteredService> andThenConsume, final long countExclusive) {
        this.manager.save(supplier, andThenConsume, countExclusive);
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
    public <T extends RegisteredService> Collection<T> getAllServicesOfType(final Class<T> clazz) {
        return this.manager.getAllServicesOfType(clazz);
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
        return this.manager.getServicesForDomain(domain);
    }

    @Override
    public Stream<RegisteredService> findServicesBy(final RegisteredServiceQuery... queries) {
        return this.manager.findServicesBy(queries);
    }

    @Override
    public Stream<String> getDomains() {
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
