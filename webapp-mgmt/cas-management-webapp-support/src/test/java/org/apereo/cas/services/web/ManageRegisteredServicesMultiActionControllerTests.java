package org.apereo.cas.services.web;

import org.apereo.cas.authentication.principal.ServiceFactory;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.config.CasCoreServicesConfiguration;
import org.apereo.cas.config.CasCoreUtilConfiguration;
import org.apereo.cas.config.CasCoreWebConfiguration;
import org.apereo.cas.config.support.CasWebApplicationServiceFactoryConfiguration;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.CasManagementUtils;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.config.CasManagementAuditConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthenticationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementAuthorizationConfiguration;
import org.apereo.cas.mgmt.config.CasManagementWebAppConfiguration;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.ManageRegisteredServicesMultiActionController;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.InMemoryServiceRegistry;
import org.apereo.cas.services.RegexRegisteredService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
                CasManagementAuthenticationConfiguration.class,
                CasWebApplicationServiceFactoryConfiguration.class,
                CasManagementAuthorizationConfiguration.class,
                CasCoreWebConfiguration.class})
@DirtiesContext
@TestPropertySource(locations = "classpath:/mgmt.properties")
public class ManageRegisteredServicesMultiActionControllerTests {

    private static final String NAME = "name";
    private static final String UNIQUE_DESCRIPTION = "uniqueDescription";

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private ManageRegisteredServicesMultiActionController controller;

    private GitServicesManager servicesManager;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private ServerProperties serverProperties;


    @Autowired
    @Qualifier("webApplicationServiceFactory")
    private ServiceFactory<WebApplicationService> webApplicationServiceFactory;

    @Before
    public void init() throws Exception {
        this.servicesManager = new GitServicesManager(new DefaultServicesManager(new InMemoryServiceRegistry(), null), null);
        final CasUserProfile casUserProfile = mock(CasUserProfile.class);
        when(casUserProfile.isAdministrator()).thenReturn(true);
        final CasUserProfileFactory casUserProfileFactory = mock(CasUserProfileFactory.class);
        when(casUserProfileFactory.from(any(), any()))
                .thenReturn(casUserProfile);
        final RepositoryFactory repositoryFactory = new RepositoryFactory(casProperties, casUserProfileFactory);
        final ManagerFactory managerFactory = mock(ManagerFactory.class);
        when(managerFactory.from(any(HttpServletRequest.class), any(HttpServletResponse.class))).thenReturn(this.servicesManager);
        this.controller = new ManageRegisteredServicesMultiActionController(this.servicesManager,
                null, webApplicationServiceFactory, CasManagementUtils.getDefaultCallbackUrl(casProperties, serverProperties),
                 casProperties, casUserProfileFactory, managerFactory, repositoryFactory);

    }

    @Test
    public void verifyDeleteService() throws Exception {
        final RegexRegisteredService r = new RegexRegisteredService();
        r.setId(1200);
        r.setName(NAME);
        r.setServiceId("serviceId");
        r.setEvaluationOrder(1);

        this.servicesManager.save(r);

        final MockHttpServletResponse response = new MockHttpServletResponse();
        this.controller.manage(response);
        final MockHttpServletRequest request = new MockHttpServletRequest();
        this.controller.deleteRegisteredService(request, response, 1200);

        assertNull(this.servicesManager.findServiceBy(1200));
    }

    @Test
    public void verifyDeleteServiceNoService() throws Exception {
        final MockHttpServletResponse response = new MockHttpServletResponse();
        final MockHttpServletRequest request = new MockHttpServletRequest();
        final ResponseEntity entity = this.controller.deleteRegisteredService(request, response, 5000);
        assertNull(this.servicesManager.findServiceBy(5000));
        assertFalse(response.getContentAsString().contains("serviceName"));
        assertFalse(entity.getStatusCode().is2xxSuccessful());
    }

    @Test
    public void updateEvaluationOrderInvalidServiceId() throws Exception {
        final RegexRegisteredService r = new RegexRegisteredService();
        r.setId(1200);
        r.setName(NAME);
        r.setServiceId("test");
        r.setEvaluationOrder(2);

        this.thrown.expect(IllegalArgumentException.class);

        this.servicesManager.save(r);
        final RegisteredServiceItem[] svcs = new RegisteredServiceItem[2];
        RegisteredServiceItem rsb = new RegisteredServiceItem();
        rsb.setAssignedId("5000");
        svcs[0] = rsb;
        rsb = new RegisteredServiceItem();
        rsb.setAssignedId("1200");
        svcs[1] = rsb;
        this.controller.updateOrder(new MockHttpServletRequest(), new MockHttpServletResponse(), svcs);
    }

    @Test
    public void verifyManage() {
        final RegexRegisteredService r = new RegexRegisteredService();
        r.setId(1200);
        r.setName(NAME);
        r.setDescription(UNIQUE_DESCRIPTION);
        r.setServiceId("test");
        r.setEvaluationOrder(2);

        this.servicesManager.save(r);
        final ModelAndView mv = this.controller.manage(new MockHttpServletResponse());

        assertTrue(mv.getModel().containsKey("defaultServiceUrl"));
        assertTrue(mv.getModel().containsKey("status"));
    }
}
