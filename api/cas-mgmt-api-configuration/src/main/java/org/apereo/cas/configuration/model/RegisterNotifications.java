package org.apereo.cas.configuration.model;

import org.apereo.cas.configuration.model.support.email.EmailProperties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;


/**
 * Notification emails for client register actions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Getter
@Setter
public class RegisterNotifications implements Serializable {
    /**
     * Register Submision notification.
     */
    @NestedConfigurationProperty
    private EmailProperties submit = new EmailProperties();

    /**
     * Register Submission Reject Change.
     */
    @NestedConfigurationProperty
    private EmailProperties remove = new EmailProperties();

    /**
     * Register Submission Change.
     */
    @NestedConfigurationProperty
    private EmailProperties change = new EmailProperties();
}
