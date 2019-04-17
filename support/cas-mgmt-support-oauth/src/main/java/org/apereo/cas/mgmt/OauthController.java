package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.services.ReturnMappedAttributeReleasePolicy;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.util.gen.DefaultRandomStringGenerator;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RestController("casManagementOauthController")
@RequestMapping(path = "api/oauth", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class OauthController extends BaseRegisterController {

    public OauthController(final CasUserProfileFactory casUserProfileFactory,
                           final MgmtManagerFactory managerFactory,
                           final CasManagementConfigurationProperties managementProperties,
                           final EmailManager communicationsManager,
                           final ServicesManager published){
        super(casUserProfileFactory, managerFactory, managementProperties, null, published, managementProperties.getRegister().getNotifications());
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
        val manager = (ManagementServicesManager) managerFactory.from(request, casUserProfile);
        return manager.getAllServices().stream()
                .filter(s -> s instanceof OAuthRegisteredService)
                .filter(s -> s.getContacts().stream().anyMatch(c -> email != null && email.equals(c.getEmail())))
                .map(s -> {
                    val si = manager.createServiceItem(s);
                    si.setCName(s.getClass().getName());
                    return si;
                })
                .collect(toList());
    }

    /**
     * Endpoint to create a new OAuthRegisteredService with generated client id and secret along with a ReleasePolicy.
     *
     * @return - OAuthRegisteredService
     */
    @GetMapping("generate")
    public OAuthRegisteredService generate() {
        val service = new OAuthRegisteredService();
        val rg = new DefaultRandomStringGenerator();
        service.setClientId(rg.getNewString());
        service.setClientSecret(rg.getNewString());
        service.setAttributeReleasePolicy(new ReturnMappedAttributeReleasePolicy());
        val env = new HashSet<String>();
        env.add("staged");
        service.setEnvironments(env);
        return service;
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

    /*
    @Override
    protected void saveService(final RegisteredService service, final String id, final CasUserProfile casUserProfile) throws Exception {
        val manager = managerFactory.master();
        manager.save(service);
    }
    */

}
