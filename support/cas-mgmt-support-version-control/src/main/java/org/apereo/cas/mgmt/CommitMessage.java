package org.apereo.cas.mgmt;

import lombok.Data;

import java.io.Serializable;


/**
 * Component to represent a commit message.
 *
 * @author Misagh Moayyed
 * @since 6.3
 */
@Data
public class CommitMessage implements Serializable {
    private String message;
    private String title;
}
