package org.apereo.cas.mgmt.services.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;

/**
 * This controller is mapped to all allowed paths that the user can type into the Url bar of
 * the browser or hit the refresh button on so the app will stay in the requested state.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Controller("forwarding")
public class ForwardingController {

    /**
     * This mapping is used for all routes in the management that should be
     * handled when the browser is refreshed or user types in the url bar.
     *
     * @return - String manage.html
     */
    @RequestMapping({
            "services",
            "services/{id:.*}",
            "registerForm/{id:.*}",
            "form/{id:.*}",
            "domains",
            "duplicate/{id:.*}",
            "view/{id:.*}",
            "search/{query:.*}",
            "history/{fileName:.*}",
            "json/{fileId:.*}",
            "localChanges",
            "wizzard",
            "pulls"})
    public String forward(final HttpServletRequest request) {
        if (request.getSession().getAttribute("register").equals("true")) {
            return "register.html";
        } else {
            return "manage.html";
        }
    }
}
