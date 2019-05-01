package org.apereo.cas.mgmt;

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
@Controller("oauthForwarding")
@Slf4j
public class OAuthForwardingController {

    /**
     *
     * @return string url
     */
    @RequestMapping({
            "oauth/form/oauth/{id}",
            "oauth/form/oidc/{id}",
            "oauth/services",
            "oauth/pending"
    })
    public String forward() {
        return "oauth/index.html";
    }

}
