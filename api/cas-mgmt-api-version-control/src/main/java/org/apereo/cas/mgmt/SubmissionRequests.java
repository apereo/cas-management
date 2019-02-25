package org.apereo.cas.mgmt;

/**
 * Interface that provides a method to return number of pending submissions.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
public interface SubmissionRequests {

    /**
     * Method returns number of pending submissions.
     *
     * @return - number of submissions
     */
    int submissions();
}
