package org.apereo.cas.mgmt.services.web.beans;

import org.apereo.cas.discovery.CasServerProfile;

public class CasServerProfileWrapper {
    private CasServerProfile profile;

    public CasServerProfile getProfile() {
        return profile;
    }

    public void setProfile(CasServerProfile profile) {
        this.profile = profile;
    }
}
