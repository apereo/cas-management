package org.apereo.cas.configuration.model;

import org.apereo.cas.configuration.model.support.email.EmailProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

/**
 * Notification emails for submission actions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Getter
@Setter
public class SubmissionNotifications {
    /**
     * Register Submission Acceptance.
     */
    @NestedConfigurationProperty
    private EmailProperties accept = new EmailProperties();

    /**
     * Register Submission  Rejection.
     */
    @NestedConfigurationProperty
    private EmailProperties reject = new EmailProperties();

    /**
     * Register Submission Added.
     */
    @NestedConfigurationProperty
    private EmailProperties added = new EmailProperties();

    /**
     * Register Submission Reject Change.
     */
    @NestedConfigurationProperty
    private EmailProperties rejectChange = new EmailProperties();

    /**
     * Register Submission Reject Change.
     */
    @NestedConfigurationProperty
    private EmailProperties delete = new EmailProperties();

}
