package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.controller.ApplicationDataController;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.*;

/**
 * Test class for ApplicationDataController.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class ApplicationDataControllerTests extends BaseCoreTests {

    @Autowired
    private ApplicationDataController applicationDataController;

    @Test
    public void managerType() {
        assertEquals("DEFAULT", applicationDataController.getManagerType());
    }

    @Test
    public void formData() {
        assertNotNull(applicationDataController.getFormData());
    }

    @Test
    public void footer() {
        assertNotNull(applicationDataController.footer());
    }

    @Test
    public void appConfig() {
        assertNotNull(applicationDataController.appConfig());
    }

}
