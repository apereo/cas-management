package org.apereo.cas.mgmt.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

/**
 * Class to handle email.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RequiredArgsConstructor
@Slf4j
public class EmailManager {

    private final JavaMailSender mailSender;

    public boolean isMailSenderDefined() {
        return this.mailSender != null;
    }

    /**
     * Email boolean.
     *
     * @param text    the text
     * @param from    the from
     * @param subject the subject
     * @param to      the to
     * @return the boolean
     */
    public boolean email(final String text, final String from,
                         final String subject, final String to) {
        return email(text, from, subject, to, null, null);
    }

    /**
     * Email.
     *
     * @param text    the text
     * @param from    the from
     * @param subject the subject
     * @param to      the to
     * @param cc      the cc
     * @param bcc     the bcc
     * @return the boolean
     */
    public boolean email(final String text, final String from,
                         final String subject, final String to,
                         final String cc, final String bcc) {
        try {
            if (!isMailSenderDefined() || StringUtils.isBlank(text) || StringUtils.isBlank(from)
                    || StringUtils.isBlank(subject) || StringUtils.isBlank(to)) {
                LOGGER.warn("Could not send email to [{}] because either no address/subject/text is found or email settings are not configured.", to);
                return false;
            }

            val message = this.mailSender.createMimeMessage();
            val helper = new MimeMessageHelper(message);
            helper.setTo(to.split(","));
            helper.setText(text);
            helper.setSubject(subject);
            helper.setFrom(from);
            helper.setPriority(1);

            if (StringUtils.isNotBlank(cc)) {
                helper.setCc(cc.split(","));
            }

            if (StringUtils.isNotBlank(bcc)) {
                helper.setBcc(bcc.split(","));
            }
            this.mailSender.send(message);
            return true;
        } catch (final Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
        }
        return false;
    }
}
