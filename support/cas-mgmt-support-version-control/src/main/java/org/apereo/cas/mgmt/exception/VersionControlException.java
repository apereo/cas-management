package org.apereo.cas.mgmt.exception;

/**
 * Exception to handle errors that occur with verison control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class VersionControlException extends Exception {

    public VersionControlException() {
        super("A version control error has occurred");
    }
}
