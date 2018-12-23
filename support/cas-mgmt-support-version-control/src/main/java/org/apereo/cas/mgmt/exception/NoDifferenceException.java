package org.apereo.cas.mgmt.exception;

/**
 * Exception that represents no difference found when doing git diff.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class NoDifferenceException extends Exception {

    public NoDifferenceException(final String msg) {
        super(msg);
    }
}
