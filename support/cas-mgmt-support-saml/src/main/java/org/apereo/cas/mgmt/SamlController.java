package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.domain.FormData;
import org.apereo.cas.services.PrincipalAttributeRegisteredServiceUsernameProvider;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ReturnAllowedAttributeReleasePolicy;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.support.saml.OpenSamlConfigBean;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.util.DigestUtils;
import org.apereo.cas.util.ResourceUtils;
import org.apereo.cas.util.model.TriStateBoolean;

import com.mchange.io.FileUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.opensaml.saml.common.xml.SAMLConstants;
import org.opensaml.saml.ext.saml2mdui.UIInfo;
import org.opensaml.saml.saml2.metadata.AttributeConsumingService;
import org.opensaml.saml.saml2.metadata.EntityDescriptor;
import org.opensaml.xmlsec.signature.support.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.opensaml.saml.saml2.core.NameID.*;

/**
 * Class will handle requests from the saml endpoint.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@RestController("casManagementSamlController")
@RequestMapping(path = "api/saml", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class SamlController {

    private static final String EPPN_NAME_ID = "urn:oid:1.3.6.1.4.1.5923.1.1.1.6";

    /**
     * Manager Factory.
     */
    protected final MgmtManagerFactory<? extends ServicesManager> managerFactory;

    /**
     * Management Configuration properties.
     */
    protected final CasManagementConfigurationProperties managementProperties;

    private final MetadataAggregateResolver sps;

    private final FormData formData;

    private final OpenSamlConfigBean configBean;

    private final UrlMetadataResolver urlMetadataResolver;

    private List<String> entities;


    public SamlController(final MgmtManagerFactory<? extends ServicesManager> managerFactory,
                          final CasManagementConfigurationProperties managementProperties,
                          final FormData formData,
                          final OpenSamlConfigBean configBean,
                          final MetadataAggregateResolver sps,
                          final UrlMetadataResolver urlMetadataResolver) {
        this.managerFactory = managerFactory;
        this.managementProperties = managementProperties;
        this.formData = formData;
        this.configBean = configBean;
        this.sps = sps;
        this.urlMetadataResolver = urlMetadataResolver;
        try {
            val manager = (ManagementServicesManager) managerFactory.master();
            this.entities = manager.findServiceBy(s -> s instanceof SamlRegisteredService).stream()
                .map(RegisteredService::getServiceId)
                .collect(Collectors.toList());
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private static PrincipalAttributeRegisteredServiceUsernameProvider createUsernameProvider(final String format) {
        if (EMAIL.equals(format)) {
            val up = new PrincipalAttributeRegisteredServiceUsernameProvider();
            up.setUsernameAttribute("mailidMail");
            return up;
        }
        if (EPPN_NAME_ID.equals(format)) {
            val up = new PrincipalAttributeRegisteredServiceUsernameProvider();
            up.setUsernameAttribute("eduPersonPrincipalName");
            return up;
        }
        return null;
    }

    /**
     * Searches SPs from InCommon that match the passed string.
     *
     * @param query - the string to match
     * @return - List of Entity Ids
     */
    @GetMapping("find")
    @SneakyThrows
    public List<String> find(
        @RequestParam
        final String query) {
        return this.entities.stream()
            .filter(e -> e.contains(query))
            .collect(Collectors.toList());
    }

    /**
     * Searches SPs from InCommon that match the passed string.
     *
     * @param query - the string to match
     * @return - List of Entity Ids
     */
    @GetMapping("search")
    @SneakyThrows
    public List<String> search(
        @RequestParam
        final String query) {
        return sps.query(query);
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
    public SamlRegisteredService upload(
        @RequestBody
        final String xml) {
        val entity = MetadataUtil.fromXML(xml, configBean);
        val service = createService(entity);
        val entityId = entity.getEntityID();
        if (exists(entityId)) {
            throw new IllegalArgumentException("Service already registered");
        }
        val fileName = DigestUtils.sha(entityId) + ".xml";
        Files.write(Path.of(managementProperties.getMetadataRepoDir() + '/' + fileName), xml.getBytes(StandardCharsets.UTF_8));
        service.setMetadataLocation("file:/" + managementProperties.getMetadataDir() + '/' + fileName);
        return service;
    }

    /**
     * Creates a new SamlRegistered Service from metadata from InCommon represented by the passed Entity Id.
     *
     * @param id - the entity id of the SP
     * @return - SamlRegisteredService
     * @throws SignatureException - invalid metadata
     */
    @GetMapping("add")
    public SamlRegisteredService add(
        @RequestParam
        final String id) throws SignatureException {
        if (exists(id)) {
            throw new IllegalArgumentException("Service already registered");
        }
        val entityD = sps.find(id);
        val service = createService(entityD);
        service.setMetadataLocation(sps.location());
        service.setMetadataSignatureLocation(managementProperties.getInCommonCertLocation());
        return service;
    }

    @GetMapping("download")
    @SneakyThrows
    public SamlRegisteredService download(
        @RequestParam
        final String url) {
        val entity = this.urlMetadataResolver.xml(url);
        LOGGER.error(entity);
        val service = createService(MetadataUtil.fromXML(entity, configBean));
        service.setMetadataLocation(url);
        return service;
    }

    /**
     * Method to return the metadata for the saml service wih the passed id.
     *
     * @param id - the id of the service
     * @return - Metadata
     */
    @GetMapping("/metadata/{id}")
    @SneakyThrows
    public Metadata getMetadata(
        @PathVariable
        final Long id) {
        val service = (SamlRegisteredService) managerFactory.master().findServiceBy(id);
        if (!sps.query(service.getServiceId()).isEmpty()) {
            return new Metadata(true, sps.xml(service.getServiceId()));
        }
        val fileName = DigestUtils.sha(service.getServiceId()) + ".xml";
        val res = ResourceUtils.getResourceFrom("file:/" + managementProperties.getMetadataRepoDir() + '/' + fileName).getFile();
        return new Metadata(false, FileUtils.getContentsAsString(res));
    }

    /**
     * Saves changes made to local metadata by the management app.
     *
     * @param id       - the id of the service
     * @param metadata - the metadata to save
     */
    @PostMapping("/metadata/{id}")
    @SneakyThrows
    public void saveMetadata(
        @PathVariable
        final Long id,
        @RequestBody
        final String metadata) {
        val service = (SamlRegisteredService) managerFactory.master().findServiceBy(id);
        val fileName = DigestUtils.sha(service.getServiceId()) + ".xml";
        val res = Paths.get('/' + managementProperties.getMetadataRepoDir() + '/' + fileName);
        Files.writeString(res, metadata);
    }

    @SneakyThrows
    private boolean exists(final String id) {
        return this.managerFactory.master().findServiceByName(id, SamlRegisteredService.class) != null;
    }

    private SamlRegisteredService createService(final EntityDescriptor entity) {
        val service = new SamlRegisteredService();
        service.setServiceId(entity.getEntityID());
        val spDescriptor = entity.getSPSSODescriptor(SAMLConstants.SAML20P_NS);
        service.setSignAssertions(TriStateBoolean.fromBoolean(spDescriptor.getWantAssertionsSigned()));
        val nameFormats = spDescriptor.getNameIDFormats().stream().findFirst();
        if (nameFormats.isPresent()) {
            service.setRequiredNameIdFormat(nameFormats.get().toString());
            service.setUsernameAttributeProvider(createUsernameProvider(service.getRequiredNameIdFormat()));
        }
        val extensions = spDescriptor.getExtensions();
        if (extensions != null) {
            val uiInfo = Objects.requireNonNull(extensions.getOrderedChildren()).stream()
                .filter(c -> c instanceof UIInfo)
                .findFirst();
            if (uiInfo.isPresent()) {
                val info = (UIInfo) uiInfo.get();
                if (!info.getDisplayNames().isEmpty()) {
                    service.setName(info.getDisplayNames().get(0).getValue());
                }
                if (!info.getDescriptions().isEmpty()) {
                    service.setDescription(info.getDescriptions().get(0).getValue());
                }
            }
        }
        val attributeService = spDescriptor.getDefaultAttributeConsumingService();
        service.setAttributeReleasePolicy(createAttributePolicy(service, attributeService));
        if (attributeService != null) {
            if (StringUtils.isBlank(service.getName()) && !attributeService.getNames().isEmpty()) {
                service.setName(attributeService.getNames().get(0).getValue());
            }
            if (StringUtils.isBlank(service.getDescription()) && !attributeService.getDescriptions().isEmpty()) {
                service.setDescription(attributeService.getDescriptions().get(0).getValue());
            }
        }
        val keyDescriptors = spDescriptor.getKeyDescriptors();
        if (keyDescriptors != null) {
            val kdEncryption = keyDescriptors.stream().filter(k -> "encryption".equals(k.getUse().getValue())).findFirst();
            val kdSigning = keyDescriptors.stream().filter(k -> "signing".equals(k.getUse().getValue())).findFirst();
            if (kdEncryption.isPresent()) {
                service.setEncryptAssertions(true);
            }
            if (kdSigning.isPresent()) {
                if (!kdSigning.get().getKeyInfo().getX509Datas().isEmpty()) {
                    service.setSigningCredentialType("X509");
                } else {
                    service.setSigningCredentialType("BASIC");
                }
            }
            if (kdEncryption.isEmpty() && kdSigning.isEmpty() && !keyDescriptors.isEmpty()
                && !keyDescriptors.get(0).getKeyInfo().getX509Datas().isEmpty()) {
                service.setEncryptAssertions(true);
                service.setSignResponses(true);
                service.setSigningCredentialType("X509");
            }
        }
        return service;
    }

    private ReturnAllowedAttributeReleasePolicy createAttributePolicy(final SamlRegisteredService service,
                                                                      final AttributeConsumingService attributeService) {
        val policy = new ReturnAllowedAttributeReleasePolicy();
        policy.setAuthorizedToReleaseAuthenticationAttributes(false);
        val allowed = new HashSet<String>();

        if (service.getUsernameAttributeProvider() instanceof PrincipalAttributeRegisteredServiceUsernameProvider) {
            allowed.add(((PrincipalAttributeRegisteredServiceUsernameProvider) service.getUsernameAttributeProvider()).getUsernameAttribute());
        }
        if (attributeService != null) {
            attributeService.getRequestedAttributes().forEach(ra -> {
                val attr = mapAttribute(ra.getName());
                attr.ifPresent(allowed::add);
            });
        }
        if (!allowed.isEmpty()) {
            policy.setAllowedAttributes(new ArrayList<>(allowed));
        }
        policy.setExcludeDefaultAttributes(true);
        return policy;
    }

    private Optional<String> mapAttribute(final String oid) {
        return formData.getSamlIdpAttributeUriIds().entrySet().stream()
            .filter(e -> e.getValue().equals(oid))
            .map(Map.Entry::getKey)
            .findFirst();
    }
}
