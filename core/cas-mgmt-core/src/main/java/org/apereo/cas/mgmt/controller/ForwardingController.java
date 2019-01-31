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
     *
     * @return string url
     */
    @RequestMapping({
            "register/form/edit/{id}",
            "register/form/wizard",
            "register/services",
            "register/lookup",
            "register/pending"
    })
    public String forwardRegister() {
        return "register/index.html";
    }

    /**
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
            "management/form/importService",
            "management/delegated/pulls",
            "management/delegated/submits",
            "management/delegated/notes/{id}",
            "management/submissions"
    })
    public String forwardManagement() {
        return "index.html";
    }
}
