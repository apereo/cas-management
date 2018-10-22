package org.apereo.cas.mgmt.web;

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
public class ForwardingController {

    /**
     * This mapping is used for all routes in the management that should be
     * handled when the browser is refreshed or user types in the url bar.
     *
     * @return - String manage.html
     */
    @RequestMapping({
        //"services",
        //"services/{id:.*}",
        "form/{id:.*}",
        "domains",
        "duplicate/{id:.*}",
        "view/{id:.*}",
        "search",
        "history/{fileName:.*}",
        "json/{fileId:.*}",
        "localChanges",
        "pulls",
        "import",
        "repo-history",
        "search"})
    public String forward() {
        return "manage.html";
    }
}
