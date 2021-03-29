package org.apereo.cas.mgmt;

import org.apereo.cas.authentication.principal.DefaultPrincipalAttributesRepository;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.OidcRegisteredService;
import org.apereo.cas.services.ReturnAllAttributeReleasePolicy;
import org.apereo.cas.services.ReturnMappedAttributeReleasePolicy;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.util.gen.DefaultRandomStringGenerator;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
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
                              final VersionControlManagerFactory managerFactory,
                              final CasManagementConfigurationProperties managementProperties,
                              final EmailManager communicationsManager,
                              final ServicesManager published){
        super(casUserProfileFactory, managerFactory, managementProperties, communicationsManager, published);
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
                .findFirst().orElseThrow();
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
                .filter(s -> s.getContacts().stream().anyMatch(c -> email != null && email.equals(c.getEmail())))
                .map(manager::createServiceItem)
                .collect(toList());
    }

    /**
     * Generates a new random string used for client Id and Secrets.
     *
     * @return - Random String value
     */
    @GetMapping({"generateId", "generateSecret"})
    public String generateId() {
        return new DefaultRandomStringGenerator().getNewString();
    }

    /**
     * Endpoint to create a new OAuthRegisteredService with generated client id and secret along with a ReleasePolicy.
     *
     * @return - OAuthRegisteredService
     */
    @GetMapping("generate/oauth")
    public OAuthRegisteredService generateOauth() {
        val service = new OAuthRegisteredService();
        val rg = new DefaultRandomStringGenerator();
        service.setClientId(rg.getNewString());
        service.setClientSecret(rg.getNewString());
        val policy = new ReturnMappedAttributeReleasePolicy();
        val repos = new DefaultPrincipalAttributesRepository();
        repos.setAttributeRepositoryIds(CollectionUtils.wrapSet("cas"));
        policy.setPrincipalAttributesRepository(repos);
        service.setAttributeReleasePolicy(policy);
        val env = new HashSet<String>();
        env.add("staged");
        service.setEnvironments(env);
        return service;
    }

    /**
     * Creates and returns a new OidcRegisteredService with generated client id and secret.
     *
     * @return - OidcRegisteredService
     */
    @GetMapping("generate/oidc")
    public OidcRegisteredService generateOidc() {
        val service = new OidcRegisteredService();
        val rg = new DefaultRandomStringGenerator();
        service.setClientId(rg.getNewString());
        service.setClientSecret(rg.getNewString());
        val policy = new ReturnAllAttributeReleasePolicy();
        val repos = new DefaultPrincipalAttributesRepository();
        repos.setAttributeRepositoryIds(CollectionUtils.wrapSet("oidc"));
        policy.setPrincipalAttributesRepository(repos);
        service.setAttributeReleasePolicy(policy);
        val env = new HashSet<String>();
        env.add("staged");
        service.setEnvironments(env);
        return service;
    }
}
