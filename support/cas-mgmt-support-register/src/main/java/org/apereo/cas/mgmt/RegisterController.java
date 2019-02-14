package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.LookupServiceItem;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Class will handle requests from the register endpoint.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RestController("casManagementRegisterController")
@RequestMapping(path = "api/register", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class RegisterController extends BaseRegisterController {

    public RegisterController(final CasUserProfileFactory casUserProfileFactory,
                              final MgmtManagerFactory managerFactory,
                              final CasManagementConfigurationProperties managementProperties,
                              final EmailManager communicationsManager,
                              final ServicesManager published){
        super(casUserProfileFactory, managerFactory, managementProperties, communicationsManager, published, managementProperties.getRegister().getNotifications());
    }

    /**
     * Claim the service.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the service id
     * @throws Exception - failed
     */
    @GetMapping("claim/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void claim(final HttpServletRequest request,
                      final HttpServletResponse response,
                      final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        service.getContacts().add(RegisterUtil.createContact(casUserProfile));
        saveService(service, id, casUserProfile);
    }

    /**
     * Unclaim an service.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the service id
     * @throws Exception - failed
     */
    @GetMapping("unclaim/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void unclaim(final HttpServletRequest request,
                        final HttpServletResponse response,
                        final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        val contact = service.getContacts().stream()
                .filter(c -> c.getEmail().equalsIgnoreCase(casUserProfile.getEmail()))
                .findFirst().get();
        service.getContacts().remove(contact);
        saveService(service, id, casUserProfile);
    }

    /**
     * Mapped method to return a list of services where the logged on user is currently a contact.
     *
     * @param response - the response
     * @param request - the request
     * @return - List of RegisteredServiceItems
     * @throws Exception - failed
     */
    @GetMapping
    public List<RegisteredServiceItem> getRegisterServices(final HttpServletResponse response,
                                                           final HttpServletRequest request) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val email = casUserProfile.getEmail();
        val manager = (ManagementServicesManager) managerFactory.master();
        return manager.getAllServices().stream()
                .filter(s -> s.getClass().getName().contains("RegexRegisteredService"))
                .filter(s -> s.getContacts().stream().anyMatch(c -> email != null && email.equals(c.getEmail())))
                .map(s -> manager.createServiceItem(s))
                .collect(toList());
    }

    /**
     * Lookup services by domain.
     *
     * @param domain - the domain
     * @return - List of services
     * @throws Exception -failed
     */
    @GetMapping("lookup")
    public List<LookupServiceItem> lookup(@RequestParam final String domain) throws Exception {
        val manager = (ManagementServicesManager) managerFactory.master();
        return manager.getAllServices().stream()
                .filter(s -> manager.extractDomain(s.getServiceId()).contains(domain))
                .map(this::createServiceItem)
                .collect(toList());
    }

    /**
     * Look up service by contact.
     *
     * @param query - the contact
     * @return - List of services
     * @throws Exception - failed
     */
    @GetMapping("lookupContact")
    public List<LookupServiceItem> lookupByContact(@RequestParam final String query) throws Exception {
        val manager = managerFactory.master();
        return manager.getAllServices().stream()
                .filter(s -> owner(s.getContacts(), query) != null)
                .map(this::createServiceItem)
                .collect(toList());
    }
}
