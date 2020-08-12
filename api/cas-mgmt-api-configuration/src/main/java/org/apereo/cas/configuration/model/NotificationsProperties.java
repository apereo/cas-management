package org.apereo.cas.configuration.model;

import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.apereo.cas.configuration.support.RequiresModule;
import lombok.Getter;
import lombok.Setter;
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
@RequiresModule(name = "cas-management-config-delegated")
public class NotificationsProperties implements Serializable {
    private static final long serialVersionUID = -7616426966125636166L;

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
