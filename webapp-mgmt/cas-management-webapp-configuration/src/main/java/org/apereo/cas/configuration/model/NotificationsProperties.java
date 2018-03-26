package org.apereo.cas.configuration.model;

import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
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

    /**
     * Register Submision notification.
     */
    @NestedConfigurationProperty
    private EmailProperties registerSubmit = new EmailProperties();

    /**
     * Register Submission Acceptance.
     */
    @NestedConfigurationProperty
    private EmailProperties registerAccept = new EmailProperties();

    /**
     * Register Submission  Rejection.
     */
    @NestedConfigurationProperty
    private EmailProperties registerReject = new EmailProperties();

    /**
     * Register Submission Added.
     */
    @NestedConfigurationProperty
    private EmailProperties registerAdded = new EmailProperties();

    /**
     * Register Submission Change.
     */
    @NestedConfigurationProperty
    private EmailProperties registerChange = new EmailProperties();

    /**
     * Register Submission Reject Change.
     */
    @NestedConfigurationProperty
    private EmailProperties registerRejectChange = new EmailProperties();

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

    public EmailProperties getRegisterSubmit() {
        return registerSubmit;
    }

    public void setRegisterSubmit(final EmailProperties registerSubmit) {
        this.registerSubmit = registerSubmit;
    }

    public EmailProperties getRegisterAccept() {
        return registerAccept;
    }

    public void setRegisterAccept(final EmailProperties registerAccept) {
        this.registerAccept = registerAccept;
    }

    public EmailProperties getRegisterReject() {
        return registerReject;
    }

    public void setRegisterReject(final EmailProperties registerReject) {
        this.registerReject = registerReject;
    }

    public EmailProperties getRegisterAdded() {
        return registerAdded;
    }

    public void setRegisterAdded(final EmailProperties registerAdded) {
        this.registerAdded = registerAdded;
    }

    public EmailProperties getRegisterChange() {
        return registerChange;
    }

    public void setRegisterChange(final EmailProperties registerChange) {
        this.registerChange = registerChange;
    }

    public EmailProperties getRegisterRejectChange() {
        return registerRejectChange;
    }

    public void setRegisterRejectChange(final EmailProperties registerRejectChange) {
        this.registerRejectChange = registerRejectChange;
    }
}
