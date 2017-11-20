package org.apereo.cas.services.web;

import org.apereo.cas.config.CasCoreServicesConfiguration;
import org.apereo.cas.config.CasCoreUtilConfiguration;
import org.apereo.cas.config.CasCoreWebConfiguration;
import org.apereo.cas.config.support.CasWebApplicationServiceFactoryConfiguration;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.config.CasManagementAuditConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthenticationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthorizationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementWebAppConfiguration;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.RegisteredServiceSimpleFormController;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.AbstractRegisteredService;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.InMemoryServiceRegistry;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.HashMap;
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
                CasManagementAuthenticationConfiguration.class,
                CasWebApplicationServiceFactoryConfiguration.class,
                CasManagementAuthorizationConfiguration.class,
                CasCoreWebConfiguration.class})
@DirtiesContext
@TestPropertySource(locations = "classpath:/mgmt.properties")
public class RegisteredServiceSimpleFormControllerTests {

    private static final String NAME = "name";
    private static final String SERVICE_ID = "serviceId";
    private static final String DESCRIPTION = "description";
    private static final String TEST_ID = "test";

    private RegisteredServiceSimpleFormController controller;

    private GitServicesManager manager;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Before
    public void setUp() throws Exception {
        this.manager = new GitServicesManager(new DefaultServicesManager(new InMemoryServiceRegistry(), null), null);
        final CasUserProfile casUserProfile = mock(CasUserProfile.class);
        when(casUserProfile.isAdministrator()).thenReturn(true);
        final CasUserProfileFactory casUserProfileFactory = mock(CasUserProfileFactory.class);
        when(casUserProfileFactory.from(any(), any()))
                .thenReturn(casUserProfile);
        final RepositoryFactory repositoryFactory = new RepositoryFactory(casProperties, casUserProfileFactory);
        final ManagerFactory managerFactory = mock(ManagerFactory.class);
        when(managerFactory.from(any(HttpServletRequest.class), any(HttpServletResponse.class))).thenReturn(this.manager);

        this.controller = new RegisteredServiceSimpleFormController(this.manager, managerFactory, casUserProfileFactory);
    }


    @Test
    public void verifyAddRegisteredServiceNoValues() {
        final BindingResult result = mock(BindingResult.class);
        when(result.getModel()).thenReturn(new HashMap<>());
        when(result.hasErrors()).thenReturn(true);
        assertTrue(result.hasErrors());
    }

    @Test
    public void verifyAddRegisteredServiceWithValues() throws Exception {
        final RegexRegisteredService svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId(SERVICE_ID);
        svc.setName(NAME);
        svc.setEvaluationOrder(123);

        assertTrue(this.manager.getAllServices().isEmpty());
        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, svc);

        final Collection<RegisteredService> services = this.manager.getAllServices();
        assertEquals(1, services.size());
        this.manager.getAllServices().forEach(rs -> assertTrue(rs instanceof RegexRegisteredService));
    }

    @Test
    public void verifyEditRegisteredServiceWithValues() throws Exception {
        final RegexRegisteredService r = new RegexRegisteredService();
        r.setId(1000);
        r.setName("Test Service");
        r.setServiceId(TEST_ID);
        r.setDescription(DESCRIPTION);

        this.manager.save(r);

        final RegexRegisteredService svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId("serviceId1");
        svc.setName(NAME);
        svc.setId(1000);
        svc.setEvaluationOrder(1000);

        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, svc);

        assertFalse(this.manager.getAllServices().isEmpty());
        final RegisteredService r2 = this.manager.findServiceBy(1000);

        assertEquals("serviceId1", r2.getServiceId());
    }

    @Test
    public void verifyAddRegexRegisteredService() throws Exception {
        final RegexRegisteredService svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId("^serviceId");
        svc.setName(NAME);
        svc.setId(1000);
        svc.setEvaluationOrder(1000);

        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, svc);

        final Collection<RegisteredService> services = this.manager.getAllServices();
        assertEquals(1, services.size());
        this.manager.getAllServices().forEach(rs -> assertTrue(rs instanceof RegexRegisteredService));
    }

    @Test
    public void verifyAddMultipleRegisteredServiceTypes() throws Exception {
        AbstractRegisteredService svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId("^serviceId");
        svc.setName(NAME);
        svc.setId(1000);
        svc.setEvaluationOrder(1000);

        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, svc);

        svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId("^serviceId");
        svc.setName(NAME);
        svc.setId(100);
        svc.setEvaluationOrder(100);

        this.controller.saveService(request, response, svc);

        final Collection<RegisteredService> services = this.manager.getAllServices();
        assertEquals(2, services.size());
    }

    @Test
    public void verifyAddMockRegisteredService() throws Exception {

        final RegexRegisteredService svc = new RegexRegisteredService();
        svc.setDescription(DESCRIPTION);
        svc.setServiceId("^serviceId");
        svc.setName(NAME);
        svc.setId(1000);
        svc.setEvaluationOrder(1000);

        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, svc);

        final Collection<RegisteredService> services = this.manager.getAllServices();
        assertEquals(1, services.size());
        this.manager.getAllServices().forEach(rs -> assertTrue(rs instanceof RegexRegisteredService));
    }

    @Test
    public void verifyEditMockRegisteredService() throws Exception {

        final RegexRegisteredService r = new RegexRegisteredService();
        r.setId(1000);
        r.setName("Test Service");
        r.setServiceId(TEST_ID);
        r.setDescription(DESCRIPTION);

        this.manager.save(r);

        r.setServiceId("serviceId1");
        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.saveService(request, response, r);

        assertFalse(this.manager.getAllServices().isEmpty());
        final RegisteredService r2 = this.manager.findServiceBy(1000);

        assertEquals("serviceId1", r2.getServiceId());
        assertTrue(r2 instanceof RegexRegisteredService);
    }
}
