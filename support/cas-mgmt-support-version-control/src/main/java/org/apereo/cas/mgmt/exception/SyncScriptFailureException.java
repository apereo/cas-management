package org.apereo.cas.mgmt.exception;

/**
 * Exception that handles failures when executing sync script.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class SyncScriptFailureException extends Exception {

    public SyncScriptFailureException() {
        super("A failure occurred attempting to sync services to CAS servers.");
    }
}
