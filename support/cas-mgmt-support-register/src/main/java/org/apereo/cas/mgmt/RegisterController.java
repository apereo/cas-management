package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.notifications.CommunicationsManager;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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

    public RegisterController(final VersionControlManagerFactory managerFactory,
                              final CasManagementConfigurationProperties managementProperties,
                              final CommunicationsManager communicationsManager,
                              final ServicesManager published){
        super(managerFactory, managementProperties, communicationsManager, published);
    }

    /**
     * Claim the service.
     *
     * @param authentication - the user
     * @param id - the service id
     * @throws Exception - failed
     */
    @GetMapping("claim/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void claim(final Authentication authentication,
                      final @PathVariable String id) throws Exception {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        service.getContacts().add(RegisterUtil.createContact(casUserProfile));
        saveService(service, id, casUserProfile);
    }

    /**
     * Unclaim an service.
     *
     * @param authentication - the user
     * @param id - the service id
     * @throws Exception - failed
     */
    @GetMapping("unclaim/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void unclaim(final Authentication authentication,
                        final @PathVariable String id) throws Exception {
        val casUserProfile = CasUserProfile.from(authentication);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        val contact = service.getContacts().stream()
                .filter(c -> c.getEmail().equalsIgnoreCase(casUserProfile.getEmail()))
                .findFirst().orElseThrow();
        service.getContacts().remove(contact);
        saveService(service, id, casUserProfile);
    }

    /**
     * Mapped method to return a list of services where the logged on user is currently a contact.
     *
     * @param authentication - the user
     * @return - List of RegisteredServiceItems
     * @throws Exception - failed
     */
    @GetMapping
    public List<RegisteredServiceItem> getRegisterServices(final Authentication authentication) throws Exception {
        val casUserProfile = CasUserProfile.from(authentication);
        val email = casUserProfile.getEmail();
        val manager = (ManagementServicesManager) managerFactory.master();
        return manager.getAllServices().stream()
                .filter(s -> s.getContacts().stream().anyMatch(c -> email != null && email.equals(c.getEmail())))
                .map(manager::createServiceItem)
                .collect(toList());
    }
}
