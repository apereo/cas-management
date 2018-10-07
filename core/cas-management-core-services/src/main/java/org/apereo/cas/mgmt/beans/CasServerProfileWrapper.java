package org.apereo.cas.mgmt.beans;

import org.apereo.cas.discovery.CasServerProfile;

import lombok.Getter;

/**
 * Class used unerap profile form cas discovery response.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Getter
public class CasServerProfileWrapper {
    private CasServerProfile profile;
}
