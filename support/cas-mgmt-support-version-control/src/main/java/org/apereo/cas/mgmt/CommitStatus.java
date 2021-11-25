package org.apereo.cas.mgmt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * This is {@link CommitStatus}.
 *
 * @author Misagh Moayyed
 * @since 6.5.0
 */
@Getter
@RequiredArgsConstructor
public enum CommitStatus {
    SUBMITTED(1),

    ACCEPTED(2),

    REJECTED(4);

    private final int mode;

}

