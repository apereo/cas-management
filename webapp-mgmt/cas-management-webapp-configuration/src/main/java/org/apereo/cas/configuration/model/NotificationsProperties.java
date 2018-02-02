package org.apereo.cas.configuration.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;

/**
 * Properties to create text for notification emails.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Getter
@Setter
@Slf4j
public class NotificationsProperties implements Serializable {

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
