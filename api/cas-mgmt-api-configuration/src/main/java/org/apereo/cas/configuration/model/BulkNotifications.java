package org.apereo.cas.configuration.model;

import lombok.Getter;
import lombok.Setter;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;

/**
 * Notification emails for Bulk client actions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Getter
@Setter
public class BulkNotifications implements Serializable {

    /**
     * Register Bulk Remove submission.
     */
    @NestedConfigurationProperty
    private EmailProperties remove = new EmailProperties();

    /**
     * Register Bulk Add Submission.
     */
    @NestedConfigurationProperty
    private EmailProperties add = new EmailProperties();

    /**
     * Register Bulk Remove Accept Change.
     */
    @NestedConfigurationProperty
    private EmailProperties removeAccepted = new EmailProperties();

    /**
     * Register Bulk Add Accept Change.
     */
    @NestedConfigurationProperty
    private EmailProperties addAccepted = new EmailProperties();

    /**
     * Register Bulk Remove Accept Change.
     */
    @NestedConfigurationProperty
    private EmailProperties removeRejected = new EmailProperties();

    /**
     * Register Bulk Add Accept Change.
     */
    @NestedConfigurationProperty
    private EmailProperties addRejected = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties removeContact = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties removeContactAccepted = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties removeContactRejected = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties addContact = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties addContactAccepted = new EmailProperties();

    /**
     * Register Bulk Remove Contact Change.
     *
     */
    @NestedConfigurationProperty
    private EmailProperties addContactRejected = new EmailProperties();

}
