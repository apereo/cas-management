package org.apereo.cas.services.web;

import lombok.val;
import org.apache.commons.io.FileUtils;
import org.apereo.cas.config.CasCoreServicesConfiguration;
import org.apereo.cas.config.CasCoreUtilConfiguration;
import org.apereo.cas.config.CasServiceRegistryInitializationConfiguration;
import org.apereo.cas.config.JsonServiceRegistryConfiguration;
import org.apereo.cas.config.support.CasWebApplicationServiceFactoryConfiguration;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.config.CasManagementAuditConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthenticationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthorizationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementWebAppConfiguration;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.services.web.RegisteredServiceSimpleFormController;
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
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.http.HttpStatus;
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
                CasCoreUtilConfiguration.class,
                CasCoreServicesConfiguration.class,
                CasServiceRegistryInitializationConfiguration.class,
                CasManagementAuthenticationConfiguration.class,
                CasWebApplicationServiceFactoryConfiguration.class,
                CasManagementAuthorizationConfiguration.class,
                JsonServiceRegistryConfiguration.class})
@DirtiesContext
@TestPropertySource(locations = "classpath:/mgmt.properties")
public class RegisteredServiceSimpleFormControllerTests {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private RegisteredServiceSimpleFormController controller;

    private ServicesManager servicesManager;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Before
    public void setUp() throws Exception {
        this.servicesManager = new DefaultServicesManager(new InMemoryServiceRegistry(), null);
        var svc = new RegexRegisteredService();
        svc.setServiceId("^https://.*");
        svc.setName("Wildcard");
        svc.setDescription("Wildacard defualt service");
        this.servicesManager.save(svc);
        svc = new RegexRegisteredService();
        svc.setServiceId("^https://www.apereo.org/.*");
        svc.setName("Apereo");
        svc.setDescription("Service for Apereo domain");
        this.servicesManager.save(svc);
        val casUserProfile = mock(CasUserProfile.class);
        when(casUserProfile.isAdministrator()).thenReturn(true);
        val casUserProfileFactory = mock(CasUserProfileFactory.class);
        when(casUserProfileFactory.from(any(), any()))
                .thenReturn(casUserProfile);
        val repositoryFactory = new RepositoryFactory(managementProperties, casUserProfileFactory);
        val managerFactory = new ManagerFactory(servicesManager, managementProperties,
            repositoryFactory, casUserProfileFactory, casProperties);
        managerFactory.initRepository();
        this.controller = new RegisteredServiceSimpleFormController(servicesManager, managerFactory, casUserProfileFactory, repositoryFactory);
    }

    @After
    public void tearDown() throws Exception {
        FileUtils.deleteDirectory(new File("/tmp/services-repo"));
    }

    @Test
    public void verifyGetService() throws Exception {
        val service = this.controller.getServiceById(new MockHttpServletRequest(),
                                                     new MockHttpServletResponse(),
                                                    2L).getBody();
        assertNotNull(service);
        assertEquals(2L, service.getId());
    }

    @Test
    public void verifyGetYaml() throws Exception {
        val yaml = this.controller.getYaml(new MockHttpServletRequest(),
                                           new MockHttpServletResponse(),
                                          2L).getBody();
        assertNotNull(yaml);
        assertTrue(yaml.contains("id: 2"));
    }

    @Test
    public void verifyGetJson() throws Exception {
        val json = this.controller.getYaml(new MockHttpServletRequest(),
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
        val request = new MockHttpServletRequest();
        val response = new MockHttpServletResponse();
        var service = (RegexRegisteredService) this.controller.getServiceById(request,
                                                                                                response,
                                                                                               2L).getBody();
        service.setTheme("myTheme");
        val resp = this.controller.saveService(request, response, service).getBody();
        assertEquals("2", resp);
        service = (RegexRegisteredService) this.controller.getServiceById(request, response, 2L).getBody();
        assertEquals("myTheme", service.getTheme());
    }

    @Test
    public void verifyAddService() throws Exception {
        val request = new MockHttpServletRequest();
        val response = new MockHttpServletResponse();
        val svc = new RegexRegisteredService();
        svc.setServiceId("^https://mytest.domain.com/.*");
        svc.setDescription("Test domain service");
        svc.setName("MyTest");
        val resp = this.controller.saveService(request,
                                                                        response,
                                                                        svc);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        val id = Long.valueOf(resp.getBody());
        val service = this.controller.getServiceById(request,
                                                                         response,
                                                                         id).getBody();
        assertEquals("MyTest", service.getName());
    }
}
