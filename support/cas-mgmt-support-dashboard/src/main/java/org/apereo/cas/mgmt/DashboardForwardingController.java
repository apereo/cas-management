package org.apereo.cas.mgmt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This controller is mapped to all allowed paths that the user can type into the Url bar of
 * the browser or hit the refresh button on so the app will stay in the requested state.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Controller("dashboardForwarding")
@Slf4j
public class DashboardForwardingController {

    /**
     *
     * @return string url
     */
    @RequestMapping({
            "dashboard/info",
            "dashboard/cache",
            "dashboard/resolve",
            "dashboard/release",
            "dashboard/audit",
            "dashboard/sessions",
            "dashboard/loggers",
            "dashboard/tokens",
            "dashboard"
    })
    public String forward() {
        return "dashboard/index.html";
    }
}
