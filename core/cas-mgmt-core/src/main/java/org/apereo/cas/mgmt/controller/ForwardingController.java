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
            "registry/domains",
            "registry/services/{domain}",
            "registry/search",
            "registry/json/{id}",
            "registry/yaml/{id}",
            "registry/import",
            "version-control/history/{fileName}",
            "version-control/localChanges",
            "version-control/changes/{branch}",
            "version-control/repo-history",
            "version-control/commit-history/{id}",
            "form/edit/{id}",
            "form/duplicate/{id}",
            "form/view/{id}",
            "form/importService",
            "delegated/pulls",
            "delegated/submits",
            "delegated/notes/{id}"
    })
    public String forwardManagement() {
        return "index.html";
    }
}
