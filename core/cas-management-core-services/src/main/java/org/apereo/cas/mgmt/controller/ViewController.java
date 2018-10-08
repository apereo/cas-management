package org.apereo.cas.mgmt.controller;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.apereo.cas.authentication.principal.Service;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 *
 */
@Controller("viewController")
@RequiredArgsConstructor
public class ViewController {

    private static final String STATUS = "status";

    private final Service defaultService;

    /**
     * Mapped method to return the manage.html.
     *
     * @return - ModelAndView
     */
    @GetMapping("/manage.html")
    public ModelAndView manage() {
        //ensureDefaultServiceExists();
        val model = new HashMap<String, Object>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        model.put("defaultServiceUrl", this.defaultService.getId());
        return new ModelAndView("manage", model);
    }
}
