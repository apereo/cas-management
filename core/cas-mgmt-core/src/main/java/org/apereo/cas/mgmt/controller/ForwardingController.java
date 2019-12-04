package org.apereo.cas.mgmt.controller;

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
@Controller("forwarding")
@Slf4j
public class ForwardingController {

    /**
     * Forwards requests that match client routes back to the client.
     *
     * @return string url
     */
    @RequestMapping({
            "management/registry/domains",
            "management/registry/services/{domain}",
            "management/registry/search",
            "management/registry/json/{id}",
            "management/registry/yaml/{id}",
            "management/registry/import",
            "management/version-control/history/{fileName}",
            "management/version-control/localChanges",
            "management/version-control/changes/{branch}",
            "management/version-control/repo-history",
            "management/version-control/commit-history/{id}",
            "management/form/edit/{id}",
            "management/form/duplicate/{id}",
            "management/form/view/{id}",
            "management/form/importService"
    })
    public String forward() {
        return "management/index.html";
    }
}
