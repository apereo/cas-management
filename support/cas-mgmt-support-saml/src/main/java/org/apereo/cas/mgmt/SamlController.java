package org.apereo.cas.mgmt;

import lombok.Data;
import lombok.SneakyThrows;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.core.appender.ManagerFactory;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.RegisterNotifications;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.LookupServiceItem;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.mgmt.xml.EntitiesDescriptor;
import org.apereo.cas.mgmt.xml.EntityDescriptor;
import org.apereo.cas.services.AbstractRegisteredService;
import org.apereo.cas.services.DefaultRegisteredServiceExpirationPolicy;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.RegisteredServiceContact;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.support.oauth.services.OAuthRegisteredService;
import org.apereo.cas.support.saml.services.LdapSamlRegisteredServiceAttributeReleasePolicy;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.util.DigestUtils;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
public class SamlController {

    private final CasUserProfileFactory casUserProfileFactory;
    private final MgmtManagerFactory<ManagementServicesManager> managerFactory;
    private final CasManagementConfigurationProperties managementProperties;
    //private final EmailManager communicationsManager;
    private final ServicesManager published;
    private final RegisterNotifications notifications;

    public SamlController(final CasUserProfileFactory casUserProfileFactory,
                           final MgmtManagerFactory managerFactory,
                           final CasManagementConfigurationProperties managementProperties,
                           //final EmailManager communicationsManager,
                           final ServicesManager published){
        this.casUserProfileFactory = casUserProfileFactory;
        this.managerFactory = managerFactory;
        this.managementProperties = managementProperties;
        //this.communicationsManager = communicationsManager;
        this.published = published;
        this.notifications = managementProperties.getRegister().getNotifications();
    }

    /**
     * Mapped method that accepts a submitted service by end user and adds is to Submissions queue.
     *
     * @param response - the response
     * @param request - the request
     * @param service - the Service to be submitted
     * @throws Exception - failed
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void submit(final HttpServletResponse response,
                       final HttpServletRequest request,
                       final @RequestBody RegisteredService service) throws Exception {
        val id = service.getId() > 0 ? service.getId() : new Date().getTime();
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/submit-" + id +".json");
        val out = Files.newOutputStream(path);
        CasManagementUtils.jsonTo(out, service);
        out.close();
        val casUserProfile = casUserProfileFactory.from(request, response);
        setSubmitter(path, casUserProfile);
        sendMessage(casUserProfile, notifications.getSubmit(), service.getName(), service.getName());
    }

    /**
     * Mapped method to handle updating a service submitted by a user.
     *
     * @param response - the response
     * @param request - the request
     * @param pair- the Service to update
     * @throws Exception - failed
     */
    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void registerSave(final HttpServletResponse response,
                             final HttpServletRequest request,
                             final @RequestBody DataPair pair) throws Exception {
        val service = pair.getRight();
        val id = pair.getLeft();
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.from(request, casUserProfile);
        manager.save(service);
    }

    @Data
    private static class DataPair {
        private Long left;
        private SamlRegisteredService right;
    }

    /*
    private void saveService(final RegisteredService service, final String id, final CasUserProfile casUserProfile) throws Exception {
        val serializer = new DefaultRegisteredServiceJsonSerializer();
        val path = isNumber(id) ? Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/edit-" + service.getId() + ".json") :
                Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        val out = Files.newOutputStream(path);
        serializer.to(out, service);
        out.close();
        setSubmitter(path, casUserProfile);
        //sendMessage(casUserProfile, notifications.getChange(), service.getName(), service.getName());
    }
    */


    private boolean isNumber(final String id) {
        try {
            Long.parseLong(id);
            return true;
        } catch (final Exception e) {
            return false;
        }
    }

    /**
     * Request to delete a service.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the id
     * @throws Exception -failed
     */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(final HttpServletRequest request,
                       final HttpServletResponse response,
                       final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/remove-" + service.getId() + ".json");
        val out = Files.newOutputStream(path);
        CasManagementUtils.jsonTo(out, service);
        out.close();
        setSubmitter(path, casUserProfile);
        sendMessage(casUserProfile, notifications.getRemove(), service.getName(), service.getName());
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
        val manager = managerFactory.from(request,casUserProfile);
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
     * Mapped method that returns the RegisteredService by the passed Id form the master repo.
     *
     * @param response - the response
     * @param request - the request
     * @param id - assigned id of the service
     * @return - the requested RegisteredService
     * @throws Exception - failed
     */
    @GetMapping("{id}")
    public RegisteredService getRegisterService(final HttpServletResponse response,
                                                final HttpServletRequest request,
                                                final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val email = casUserProfile.getEmail();
        val manager = managerFactory.master();
        val svc = manager.findServiceBy(Long.parseLong(id));
        checkOwner(svc.getContacts(), email);
        return svc;
    }

    @DeleteMapping("cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancel(final HttpServletResponse response,
                       final HttpServletRequest request,
                       final @RequestParam String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val service = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        if (!isSubmitter(service, casUserProfile)) {
            throw new Exception("You are not the original submitter of the request");
        }
        Files.delete(service);
    }

    private boolean isSubmitter(final Path p, final CasUserProfile casUserProfile) {
        return getSubmitter(p)[0].equals(casUserProfile.getEmail());
    }

    private String[] getSubmitter(final Path path) {
        try {
            val email = new byte[100];
            Files.getFileAttributeView(path, UserDefinedFileAttributeView.class)
                    .read("original_author", ByteBuffer.wrap(email));
            return new String(email).trim().split(":");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new String[] {"", ""};
        }
    }

    private void sendMessage(final CasUserProfile user,
                             final EmailProperties emailProperties,
                             final String textArg,
                             final String subjectArg) {
        /*
        if (communicationsManager.isMailSenderDefined()) {
            communicationsManager.email(
                    MessageFormat.format(emailProperties.getText(), textArg),
                    emailProperties.getFrom(),
                    MessageFormat.format(emailProperties.getSubject(), subjectArg),
                    user.getEmail(),
                    emailProperties.getCc(),
                    emailProperties.getBcc());
        }
        */
    }

    private RegisteredServiceContact owner(final List<RegisteredServiceContact> contacts, final String email) {
        return contacts.stream().filter(c -> email.equalsIgnoreCase(c.getEmail())).findAny().orElse(null);
    }

    private void checkOwner(final List<RegisteredServiceContact> contacts, final String email) throws Exception {
        if (owner(contacts, email) == null) {
            throw new IllegalAccessException("You do not own this service.");
        }
    }

    private LookupServiceItem createServiceItem(final RegisteredService service) {
        val serviceItem = new LookupServiceItem();
        serviceItem.setAssignedId(String.valueOf(service.getId()));
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
        serviceItem.setContacts(names(service.getContacts().stream()));
        return serviceItem;
    }

    private String names(final Stream<RegisteredServiceContact> stream) {
        return stream
                .map(s -> s.getName() != null ? s.getName() : s.getEmail())
                .collect(Collectors.joining(", "));
    }

    private void setSubmitter(final Path path, final CasUserProfile casUserProfile) throws Exception {
        val payload = casUserProfile.getEmail() + ":" + casUserProfile.getFirstName() + " "
                + casUserProfile.getFamilyName();
        Files.getFileAttributeView(path, UserDefinedFileAttributeView.class)
                .write("original_author", ByteBuffer.wrap(payload.getBytes()));
    }

    @PostMapping("upload")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public SamlRegisteredService upload(final @RequestBody String xml) {
        val entity = fromXML(xml);
        SamlRegisteredService service = new SamlRegisteredService();
        service.setServiceId(entity.getEntityId());
        service.setSignAssertions(entity.getSPSSODescriptor().isWantAssertionsSigned());
        service.setRequiredNameIdFormat(entity.getSPSSODescriptor().getNameIDFormat());
        System.out.println(entity.getSPSSODescriptor().getAttributeConsumingService());
        val policy = new LdapSamlRegisteredServiceAttributeReleasePolicy();
        if (entity.getSPSSODescriptor().getAttributeConsumingService() != null) {
            val map = new HashMap<String, Object>();
            entity.getSPSSODescriptor().getAttributeConsumingService().getRequestedAttribute().forEach(ra -> {
                map.put(ra.getName(), ra.getName());
            });
            policy.setAllowedAttributes(map);

            service.setName(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceName());
            service.setDescription(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceDescription());
        }
        service.setAttributeReleasePolicy(policy);

        val id = "metadata-" + new Date().getTime() + ".xml";
        Files.write(Path.of(managementProperties.getMetadataDir() + "/" + id), xml.getBytes());

        service.setMetadataLocation("file:/" + managementProperties.getMetadataDir() + "/" + id);
        return service;
    }


    public EntityDescriptor fromXML(final String xml) {
        try {
            val jaxbContext = JAXBContext.newInstance(EntityDescriptor.class);
            val jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            return (EntityDescriptor) jaxbUnmarshaller.unmarshal(new ByteArrayInputStream(xml.getBytes()));
        } catch (final Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("search")
    public List<String> search(final @RequestParam String query) {
        val ent = fromInCommon();
        return ent.stream().filter(e -> e.getEntityId().contains(query))
                .map(e -> e.getEntityId())
                .collect(Collectors.toList());
    }

    public List<EntityDescriptor> fromInCommon() {
        try {
            val jaxbContext = JAXBContext.newInstance(EntitiesDescriptor.class);
            val jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            val doc = (EntitiesDescriptor) jaxbUnmarshaller.unmarshal(new File(managementProperties.getMetadataDir() +"/InCommon-metadata.xml"));
            return doc.getEntityDescriptorList();
        } catch (final Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("add")
    public SamlRegisteredService add(final @RequestParam String id) {
        val entity = fromInCommon().stream()
                .filter(e -> e.getEntityId().equals(id))
                .findFirst().get();
        SamlRegisteredService service = new SamlRegisteredService();
        service.setServiceId(entity.getEntityId());
        service.setSignAssertions(entity.getSPSSODescriptor().isWantAssertionsSigned());
        service.setRequiredNameIdFormat(entity.getSPSSODescriptor().getNameIDFormat());
        val policy = new LdapSamlRegisteredServiceAttributeReleasePolicy();
        if (entity.getSPSSODescriptor().getAttributeConsumingService() != null) {
            val map = new HashMap<String, Object>();
            entity.getSPSSODescriptor().getAttributeConsumingService().getRequestedAttribute().forEach(ra -> {
                map.put(ra.getName(), ra.getName());
            });
            policy.setAllowedAttributes(map);

            service.setName(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceName());
            service.setDescription(entity.getSPSSODescriptor().getAttributeConsumingService().getServiceDescription());
        }
        service.setAttributeReleasePolicy(policy);
        service.setMetadataCriteriaPattern(id);
        service.setMetadataLocation("file:/" + managementProperties.getMetadataDir() + "/InCommon-metadata.xml");
        return service;
    }

}
