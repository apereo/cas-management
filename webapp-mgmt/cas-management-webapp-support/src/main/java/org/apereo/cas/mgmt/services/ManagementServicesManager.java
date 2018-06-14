package org.apereo.cas.mgmt.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.util.DigestUtils;
import org.apereo.cas.util.RegexUtils;
import org.eclipse.jgit.diff.DiffEntry;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    private final GitUtil git;

    private Map<Long, String> uncommitted;

    private final Pattern domainExtractor = RegexUtils.createPattern("^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)");
    private final Pattern domainPattern = RegexUtils.createPattern("^[a-z0-9-.]*$");

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
     * @throws Exception -failed
     */
    public List<RegisteredServiceItem> getServiceItemsForDomain(final String domain) {
        LOGGER.debug("Loading services for domain [{}]", domain);
        final List<RegisteredService> services = new ArrayList<>(getServicesForDomain(domain));
        final List<RegisteredServiceItem> items = services.stream()
            .map(this::createServiceItem)
            .collect(Collectors.toList());
        this.uncommitted = new HashMap<>();
        git.scanWorkingDiffs().stream().forEach(this::createChange);
        return items;
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
        if (!git.isUndefined()) {
            if (uncommitted != null && uncommitted.containsKey(service.getId())) {
                serviceItem.setStatus(uncommitted.get(service.getId()));
            }
        }
        LOGGER.debug("Created service item [{}] based on registered service [{}]", serviceItem, service.getServiceId());
        return serviceItem;
    }

    private void createChange(final DiffEntry entry) {
        try {
            final DefaultRegisteredServiceJsonSerializer ser = new DefaultRegisteredServiceJsonSerializer();
            final RegisteredService svc;
            if (entry.getChangeType() == DiffEntry.ChangeType.DELETE) {
                svc = ser.from(git.readObject(entry.getOldId().toObjectId()));
            } else {
                svc = ser.from(new File(git.repoPath() + '/' + entry.getNewPath()));
            }
            LOGGER.debug("Created change entry for service [{}]", svc.getServiceId());

            if (this.uncommitted.containsKey(svc.getId())) {
                this.uncommitted.replace(svc.getId(), "MODIFY");
            } else {
                this.uncommitted.put(svc.getId(), entry.getChangeType().toString());
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
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

    public GitUtil getGit() {
        return git;
    }

    /**
     * Extract domain string.
     *
     * @param service the service
     * @return the string
     */
    public String extractDomain(final String service) {
        final Matcher extractor = this.domainExtractor.matcher(service.toLowerCase());
        return extractor.lookingAt() ? validateDomain(extractor.group(1)) : "default";
    }

    /**
     * Validate domain string.
     *
     * @param providedDomain the provided domain
     * @return the string
     */
    public String validateDomain(final String providedDomain) {
        final String domain = StringUtils.remove(providedDomain, "\\");
        final Matcher match = domainPattern.matcher(StringUtils.remove(domain, "\\"));
        return match.matches() ? domain : "default";
    }
}
