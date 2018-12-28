package org.apereo.cas.configuration.model;

import lombok.Getter;
import lombok.Setter;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;

/**
 * Notification emails for delegated actions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Getter
@Setter
public class DelegatedNotifications implements Serializable {

    /**
     * Sumbit Notification.
     */
    @NestedConfigurationProperty
    private EmailProperties submit = new EmailProperties();

    /**
     * Accept Notification.
     */
    @NestedConfigurationProperty
    private EmailProperties accept = new EmailProperties();

    /**
     * Reject Notification.
     */
    @NestedConfigurationProperty
    private EmailProperties reject = new EmailProperties();
}
