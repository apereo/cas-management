package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.xml.EntitiesDescriptor;
import org.apereo.cas.mgmt.xml.EntityDescriptor;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.saml.services.LdapSamlRegisteredServiceAttributeReleasePolicy;
import org.apereo.cas.support.saml.services.SamlRegisteredService;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

/**
 * Class will handle requests from the register endpoint.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RestController("casManagementRegisterController")
@RequestMapping(path = "api/saml", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class SamlController extends BaseRegisterController {

    private final List<EntityDescriptor> sps;

    public SamlController(final CasUserProfileFactory casUserProfileFactory,
                           final MgmtManagerFactory managerFactory,
                           final CasManagementConfigurationProperties managementProperties,
                           final EmailManager communicationsManager,
                           final ServicesManager published){
        super(casUserProfileFactory, managerFactory, managementProperties, null, published, managementProperties.getRegister().getNotifications());
        this.sps = fromInCommon().stream().filter(e -> e.getSPSSODescriptor() != null).collect(toList());
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
                .filter(s -> s instanceof SamlRegisteredService)
                .filter(s -> s.getContacts().stream().anyMatch(c -> email != null && email.equals(c.getEmail())))
                .map(s -> {
                    val si = manager.createServiceItem(s);
                    si.setCName(s.getClass().getName());
                    return si;
                })
                .collect(toList());
    }

    /**
     * Searches SPs from InCommon that match the passed string.
     *
     * @param query - the string to match
     * @return - List of Entity Ids
     */
    @GetMapping("search")
    public List<String> search(final @RequestParam String query) {
        return sps.stream().filter(e -> e.getEntityId().contains(query))
                .map(e -> e.getEntityId())
                .collect(Collectors.toList());
    }

    /**
     * Uploads a SAML Metadta from the client as XML string and creates a registered service from the parsed XML.
     *
     * @param xml - the metada as string.
     * @return - SamlRegistered Service
     */
    @PostMapping("upload")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public SamlRegisteredService upload(final @RequestBody String xml) {
        val entity = fromXML(xml);
        val service = createService(entity);
        val id = "metadata-" + new Date().getTime() + ".xml";
        Files.write(Path.of(managementProperties.getMetadataDir() + "/" + id), xml.getBytes());
        service.setMetadataLocation("file:/" + managementProperties.getMetadataDir() + "/" + id);
        return service;
    }

    /**
     * Creates a new SamlRegistered Service from metadata from InCommon represented by the passed Entity Id.
     *
     * @param id - the entity id of the SP
     * @return - SamlRegisteredService
     */
    @GetMapping("add")
    public SamlRegisteredService add(final @RequestParam String id) {
        val entity = sps.stream()
                .filter(e -> e.getEntityId().equals(id))
                .findFirst().get();
        val service = createService(entity);
        service.setMetadataCriteriaPattern(id);
        service.setMetadataLocation("file:/" + managementProperties.getMetadataDir() + "/InCommon-metadata.xml");
        return service;
    }

    private SamlRegisteredService createService(final EntityDescriptor entity) {
        val service = new SamlRegisteredService();
        service.setServiceId(entity.getEntityId());
        val spDescriptor = entity.getSPSSODescriptor();
        service.setSignAssertions(spDescriptor.isWantAssertionsSigned());
        service.setRequiredNameIdFormat(spDescriptor.getNameIDFormat());
        val policy = new LdapSamlRegisteredServiceAttributeReleasePolicy();
        if (spDescriptor.getAttributeConsumingService() != null) {
            val map = new HashMap<String, Object>();
            spDescriptor.getAttributeConsumingService().getRequestedAttribute().forEach(ra -> {
                if (ra.getRequired() == null || ra.getRequired()) {
                    map.put(ra.getName(), ra.getName());
                }
            });
            policy.setAllowedAttributes(map);

            service.setName(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceName());
            service.setDescription(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceDescription());
        }
        if (spDescriptor.getKeyDescriptor() != null) {
            val kdEncryption = spDescriptor.getKeyDescriptor().stream().filter(k -> "encryption".equals(k.getUse())).findFirst();
            if (kdEncryption.isPresent()) {
                service.setEncryptAssertions(true);
            }
            val kdSigning = spDescriptor.getKeyDescriptor().stream().filter(k -> "signing".equals(k.getUse())).findFirst();
            if (kdSigning.isPresent()) {
                if (kdSigning.get().getKeyInfo().getX509Data() != null) {
                    service.setSigningCredentialType("X509");
                } else {
                    service.setSigningCredentialType("BASIC");
                }
            }
        }
        service.setAttributeReleasePolicy(policy);
        return service;
    }

    private EntityDescriptor fromXML(final String xml) {
        try {
            val jaxbContext = JAXBContext.newInstance(EntityDescriptor.class);
            val jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            return (EntityDescriptor) jaxbUnmarshaller.unmarshal(new ByteArrayInputStream(xml.getBytes()));
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    private List<EntityDescriptor> fromInCommon() {
        try {
            val jaxbContext = JAXBContext.newInstance(EntitiesDescriptor.class);
            val jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            val doc = (EntitiesDescriptor) jaxbUnmarshaller.unmarshal(new File(managementProperties.getMetadataDir() +"/InCommon-metadata.xml"));
            return doc.getEntityDescriptorList();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ArrayList<>();
    }

    /*
    @Override
    protected void saveService(final RegisteredService service, final String id, final CasUserProfile casUserProfile) throws Exception {
        val manager = managerFactory.master();
        manager.save(service);
    }
    */
}
