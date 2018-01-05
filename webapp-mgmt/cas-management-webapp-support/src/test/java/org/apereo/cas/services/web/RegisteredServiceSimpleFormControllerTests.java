package org.apereo.cas.services.web;

import org.apache.commons.io.FileUtils;
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
import org.apereo.cas.mgmt.services.web.RegisteredServiceSimpleFormController;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.InMemoryServiceRegistry;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
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
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Test cases for {@link RegisteredServiceSimpleFormController}.
 *
 * @author Scott Battaglia
 * @author Misagh Moayyed
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
@TestPropertySource(locations = "classpath:/mgmt.properties")
public class RegisteredServiceSimpleFormControllerTests {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private RegisteredServiceSimpleFormController controller;

    private ServicesManager servicesManager;

    @Autowired
    private CasManagementConfigurationProperties casProperties;

    @Before
    public void setUp() throws Exception {
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
        final ManagerFactory managerFactory = new ManagerFactory(servicesManager, casProperties, repositoryFactory, casUserProfileFactory);
        this.controller = new RegisteredServiceSimpleFormController(servicesManager, managerFactory, casUserProfileFactory);
    }

    @After
    public void tearDown() throws Exception {
        FileUtils.deleteDirectory(new File("/tmp/services-repo"));
    }

    @Test
    public void verifyGetService() throws Exception {
        final RegisteredService service = this.controller.getServiceById(new MockHttpServletRequest(),
                                                                         new MockHttpServletResponse(),
                                                                         2L).getBody();
        assertNotNull(service);
        assertEquals(2L, service.getId());
    }

    @Test
    public void verifyGetYaml() throws Exception {
        final String yaml = this.controller.getYaml(new MockHttpServletRequest(),
                                                    new MockHttpServletResponse(),
                                                   2L).getBody();
        assertNotNull(yaml);
        assertTrue(yaml.contains("id: 2"));
    }

    @Test
    public void verifyGetJson() throws Exception {
        final String json = this.controller.getYaml(new MockHttpServletRequest(),
                                                    new MockHttpServletResponse(),
                                                    2L).getBody();
        assertNotNull(json);
        assertTrue(json.contains("id: 2"));
    }

    @Test
    public void verifyNotFoundException() throws Exception {
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("Service id 3 cannot be found");

        this.controller.getServiceById(new MockHttpServletRequest(), new MockHttpServletResponse(), 3L);
    }

    @Test
    public void verifyEditService() throws Exception {
        final MockHttpServletRequest request = new MockHttpServletRequest();
        final MockHttpServletResponse response = new MockHttpServletResponse();
        RegexRegisteredService service = (RegexRegisteredService) this.controller.getServiceById(request,
                                                                                                response,
                                                                                               2L).getBody();
        service.setTheme("myTheme");
        final String resp = this.controller.saveService(request, response, service).getBody();
        assertEquals("2", resp);
        service = (RegexRegisteredService) this.controller.getServiceById(request, response, 2L).getBody();
        assertEquals("myTheme", service.getTheme());
    }

    @Test
    public void verifyAddService() throws Exception {
        final MockHttpServletRequest request = new MockHttpServletRequest();
        final MockHttpServletResponse response = new MockHttpServletResponse();
        final RegexRegisteredService svc = new RegexRegisteredService();
        svc.setServiceId("^https://mytest.domain.com/.*");
        svc.setDescription("Test domain service");
        svc.setName("MyTest");
        final ResponseEntity<String> resp = this.controller.saveService(request,
                                                                        response,
                                                                        svc);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        final long id = Long.valueOf(resp.getBody());
        final RegisteredService service = this.controller.getServiceById(request,
                                                                         response,
                                                                         id).getBody();
        assertEquals("MyTest", service.getName());
    }
}
