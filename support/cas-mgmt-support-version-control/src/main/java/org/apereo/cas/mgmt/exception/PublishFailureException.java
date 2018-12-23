package org.apereo.cas.mgmt.exception;

/**
 * Exception for handling errors during publishing.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class PublishFailureException extends Exception {

    public PublishFailureException() {
        super("Services were not published because of a failure on the server");
    }
}
