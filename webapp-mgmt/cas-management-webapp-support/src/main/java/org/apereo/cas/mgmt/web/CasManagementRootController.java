package org.apereo.cas.mgmt.web;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.ParameterizableViewController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This is {@link CasManagementRootController}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
@Slf4j
public class CasManagementRootController extends ParameterizableViewController {
    @Override
    protected ModelAndView handleRequestInternal(final HttpServletRequest request,
                                                 final HttpServletResponse response) {
        val url = request.getContextPath() + "/manage.html";
        LOGGER.debug("Initial url is [{}]", url);

        val encodedUrl = response.encodeURL(url);
        LOGGER.debug("Encoded url is [{}]", encodedUrl);

        return new ModelAndView(new RedirectView(encodedUrl));
    }
}
