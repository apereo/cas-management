package org.apereo.cas.services.web;

import org.apache.commons.io.FileUtils;
import org.apereo.cas.authentication.principal.ServiceFactory;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.config.CasCoreServicesConfiguration;
import org.apereo.cas.config.CasCoreUtilConfiguration;
import org.apereo.cas.config.CasCoreWebConfiguration;
import org.apereo.cas.config.CasServiceRegistryInitializationConfiguration;
import org.apereo.cas.config.JsonServiceRegistryConfiguration;
import org.apereo.cas.config.support.CasWebApplicationServiceFactoryConfiguration;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.config.CasManagementAuditConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthenticationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthorizationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementWebAppConfiguration;
import org.apereo.cas.mgmt.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.services.web.ManageRegisteredServicesMultiActionController;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.InMemoryServiceRegistry;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * @author Scott Battaglia
 * @since 3.1
 */
@RunWith(SpringRunner.class)
@SpringBootTest(
        classes = {
                AopAutoConfiguration.class,
                RefreshAutoConfiguration.class,
                CasManagementAuditConfiguration.class,
                CasManagementWebAppConfiguration.class,
                ServerPropertiesAutoConfiguration.class,
                CasCoreUtilConfiguration.class,
                CasCoreServicesConfiguration.class,
                CasServiceRegistryInitializationConfiguration.class,
                CasManagementAuthenticationConfiguration.class,
                CasWebApplicationServiceFactoryConfiguration.class,
                CasManagementAuthorizationConfiguration.class,
                CasCoreWebConfiguration.class,
                JsonServiceRegistryConfiguration.class})
@DirtiesContext
@TestPropertySource(locations = "classpath:mgmt.properties")
public class ManageRegisteredServicesMultiActionControllerTests {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private ManageRegisteredServicesMultiActionController controller;

    private ServicesManager servicesManager;

    @Autowired
    private CasManagementConfigurationProperties casProperties;

    @Autowired
    @Qualifier("webApplicationServiceFactory")
    private ServiceFactory<WebApplicationService> webApplicationServiceFactory;

    @Before
    public void init() throws Exception {
        FileUtils.deleteDirectory(new File("/tmp/services-repo"));
        this.servicesManager = new DefaultServicesManager(new InMemoryServiceRegistry(), null);
        RegexRegisteredService svc = new RegexRegisteredService();
        svc.setServiceId("^https://.*");
        svc.setName("Wildcard");
        svc.setDescription("Wildacard defualt service");
        this.servicesManager.save(svc);
        svc = new RegexRegisteredService();
        svc.setServiceId("^https://www.apereo.org/.*");
        svc.setName("Apereo");
        svc.setDescription("Service for Apereo domain");
        this.servicesManager.save(svc);
        final CasUserProfile casUserProfile = mock(CasUserProfile.class);
        when(casUserProfile.isAdministrator()).thenReturn(true);
        final CasUserProfileFactory casUserProfileFactory = mock(CasUserProfileFactory.class);
        when(casUserProfileFactory.from(any(), any()))
                .thenReturn(casUserProfile);
        final RepositoryFactory repositoryFactory = new RepositoryFactory(casProperties, casUserProfileFactory);
        final ManagerFactory managerFactory = new ManagerFactory(this.servicesManager, casProperties, repositoryFactory, casUserProfileFactory);
        this.controller = new ManageRegisteredServicesMultiActionController(this.servicesManager,
                null, webApplicationServiceFactory, "^https://.*",
                 casProperties, casUserProfileFactory, managerFactory, repositoryFactory);
    }

    @After
    public void tearDown() throws Exception {
        FileUtils.deleteDirectory(new File("/tmp/services-repo"));
    }

    @Test
    public void verifyGetUser() throws Exception {
        final ResponseEntity<CasUserProfile> user = this.controller.getUser(new MockHttpServletRequest(),
                                                                            new MockHttpServletResponse());
        assertTrue(user.getBody().isAdministrator());
    }

    @Test
    public void verifyDomainList() throws Exception {
        final Collection<String> domains = this.controller.getDomains(new MockHttpServletRequest(),
                                                                      new MockHttpServletResponse()).getBody();
        assertFalse(domains.isEmpty());
        assertTrue(domains.contains("default"));
    }

    @Test
    public void verifyGetServices() throws Exception {
        final List<RegisteredServiceItem> services = this.controller.getServices(new MockHttpServletRequest(),
                                                                                 new MockHttpServletResponse(),
                                                                                "default").getBody();
        assertFalse(services.isEmpty());
        assertEquals(2, services.size());
    }

    @Test
    public void verifySearch() throws Exception {
        final List<RegisteredServiceItem> services = this.controller.search(new MockHttpServletRequest(),
                                                                            new MockHttpServletResponse(),
                                                                            "apereo").getBody();
        assertFalse(services.isEmpty());
        assertEquals(1, services.size());
    }

    @Test
    public void verifyUpdateOrder() throws Exception {
        List<RegisteredServiceItem> services = this.controller.getServices(new MockHttpServletRequest(),
                                                                                 new MockHttpServletResponse(),
                                                                                 "default").getBody();
        services.get(0).setEvalOrder(1);
        services.get(1).setEvalOrder(0);
        final RegisteredServiceItem[] svcs = new RegisteredServiceItem[2];
        services.toArray(svcs);
        this.controller.updateOrder(new MockHttpServletRequest(), new MockHttpServletResponse(), svcs);
        services = this.controller.getServices(new MockHttpServletRequest(),
                                               new MockHttpServletResponse(),
                                               "default").getBody();
        assertTrue(services.get(0).getName().startsWith("Wildcard"));
        assertTrue(services.get(1).getName().startsWith("Apereo"));
    }


    @Test
    public void verifyDeleteService() throws Exception {
        final ResponseEntity<String> resp = this.controller.deleteRegisteredService(new MockHttpServletRequest(),
                                                                                    new MockHttpServletResponse(),
                                                                                   2L);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertTrue(resp.getBody().contains("Apereo"));
    }

    @Test
    public void verifyCantDelteDefault() throws Exception {
        final ResponseEntity<String> resp = this.controller.deleteRegisteredService(new MockHttpServletRequest(),
                                                                                    new MockHttpServletResponse(),
                                                                                   1L);
        assertEquals(HttpStatus.BAD_REQUEST, resp.getStatusCode());
        assertTrue(resp.getBody().startsWith("The default service"));
    }

    @Test
    public void verifyDeleteNonExistentService() throws Exception {
        final ResponseEntity<String> resp = this.controller.deleteRegisteredService(new MockHttpServletRequest(),
                                                                                    new MockHttpServletResponse(),
                                                                                   3L);
        assertEquals(HttpStatus.BAD_REQUEST, resp.getStatusCode());
        assertTrue(resp.getBody().startsWith("Service id"));
    }
}
