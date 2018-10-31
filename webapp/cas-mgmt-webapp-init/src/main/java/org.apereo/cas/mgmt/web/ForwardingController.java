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
            "domains",
            "services/{domain}",
            "search",
            "histrory/{fileName}",
            "diff",
            "diffSubmission",
            "json/{id}",
            "viewJson/{id}",
            "viewYaml/{id}",
            "localChanges",
            "pulls",
            "submits",
            "changes/{branches}",
            "notes/{id}",
            "import",
            "commit-history/{id}",
            "repo-history"
    })
    public String forward() {
        return "index.html";
    }
}
