package org.apereo.cas.mgmt;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Interface to return number of pending requests.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@FunctionalInterface
public interface PendingRequests {

    /**
     * Returns number pending pull requests.
     *
     * @param request - the request
     * @param response - the response
     * @return - number of pull requests
     */
    int pendingSubmits(HttpServletRequest request, HttpServletResponse response);
}
