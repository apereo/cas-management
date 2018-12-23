package org.apereo.cas.mgmt.exception;

/**
 * Handles Exception that occur when searching.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class SearchException extends Exception {

    public SearchException() {
        super("An occurred with your search");
    }
}
