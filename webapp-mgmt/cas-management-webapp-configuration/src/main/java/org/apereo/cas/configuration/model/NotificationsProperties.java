package org.apereo.cas.configuration.model;

import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;

/**
 * Properties to create text for notification emails.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
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

    public EmailProperties getSubmit() {
        return submit;
    }

    public void setSubmit(final EmailProperties submit) {
        this.submit = submit;
    }

    public EmailProperties getAccept() {
        return accept;
    }

    public void setAccept(final EmailProperties accept) {
        this.accept = accept;
    }

    public EmailProperties getReject() {
        return reject;
    }

    public void setReject(final EmailProperties reject) {
        this.reject = reject;
    }
}
