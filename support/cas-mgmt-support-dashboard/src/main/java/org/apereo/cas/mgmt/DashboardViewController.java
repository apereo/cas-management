package org.apereo.cas.mgmt;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * Controller to handle initial request to dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.3.3
 */
@Controller("dashboardViewController")
@RequiredArgsConstructor
public class DashboardViewController {

    private static final String STATUS = "status";

    /**
     * Mapped method to return the register.html.
     *
     * @return - ModelAndView
     */
    @GetMapping({"dashboard/index.html", "dashboard/", "dashboard"})
    public ModelAndView dashboard() {
        val model = new HashMap<String, Object>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        return new ModelAndView("dashboard/index", model);
    }
}
