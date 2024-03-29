package org.apereo.cas.mgmt.controller;

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
     * Forwards requests that match client routes back to the client.
     *
     * @return string url
     */
    @RequestMapping({
        "management/registry",
        "management/registry/domains",
        "management/registry/services/{domain}",
        "management/registry/search",
        "management/registry/json/{id}",
        "management/registry/yaml/{id}",
        "management/registry/import",
        "management/registry/oauth",
        "management/registry/saml",
        "management/registry/wsfed",
        "management/registry/metadata/{id}",
        "management/version-control/history/{fileName}",
        "management/version-control/localChanges",
        "management/version-control/changes/{branch}",
        "management/version-control/repo-history",
        "management/version-control/commit-history/{id}",
        "management/form/edit/{id}",
        "management/form/duplicate/{id}",
        "management/form/view/{id}",
        "management/form/importService",
        "management/form/oidc",
        "management/form/oauth",
        "management/form/wsfed",
        "management/delegated/pulls",
        "management/delegated/submits",
        "management/delegated/notes/{id}",
        "management/submissions",
        "management/definitions",
        "management/definitions/{def}",
        "management/user/current-user"
    })
    public String forward() {
        return "management/index.html";
    }
}
