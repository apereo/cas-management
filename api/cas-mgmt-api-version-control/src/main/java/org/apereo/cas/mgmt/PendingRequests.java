package org.apereo.cas.mgmt;

import org.springframework.security.core.Authentication;

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
     * @param authentication - the user
     * @return - number of pull requests
     */
    int pendingSubmits(Authentication authentication);
}
