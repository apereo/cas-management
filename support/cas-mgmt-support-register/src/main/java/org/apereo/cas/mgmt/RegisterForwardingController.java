package org.apereo.cas.mgmt;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This controller is mapped to all allowed paths that the user can type into the Url bar of
 * the browser or hit the refresh button on so the app will stay in the requested state.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Controller("forwarding")
public class RegisterForwardingController {

    /**
     * @return string url
     */
    @RequestMapping({
        "register/form/edit/{id}",
        "register/form/wizard",
        "register/services",
        "register/lookup",
        "register/pending",
        "register/sessions",
        "register/tokens"
    })
    public String forward() {
        return "register/index.html";
    }

}
