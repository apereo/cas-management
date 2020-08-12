package org.apereo.cas.mgmt.web;

import org.apereo.cas.util.AsciiArtUtils;
import org.apereo.cas.util.DateTimeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import java.time.Instant;

/**
 * This is {@link DefaultCasManagementEventListener}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public class DefaultCasManagementEventListener {
    /**
     * Handle application ready event.
     *
     * @param event the event
     */
    @EventListener
    public void handleApplicationReadyEvent(final ApplicationReadyEvent event) {
        AsciiArtUtils.printAsciiArtReady(LOGGER, "READY");
        LOGGER.info("Ready to process requests @ [{}]", DateTimeUtils.zonedDateTimeOf(Instant.ofEpochMilli(event.getTimestamp())));
    }
}
