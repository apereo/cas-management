package org.apereo.cas.mgmt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * Controller to handle initial request to register endpoint.
 *
 * @since 6.3.3
 * @author Travis Schmidt
 */
@Controller("registerViewController")
@RequiredArgsConstructor
@Slf4j
public class RegisterViewController {

    private static final String STATUS = "status";


    /**
     * Mapped method to return the register.html.
     *
     * @return - ModelAndView
     */
    @GetMapping({"register/index.html", "register/", "register"})
    public ModelAndView register() {
        val model = new HashMap<String, Object>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        return new ModelAndView("register/index", model);
    }
}
