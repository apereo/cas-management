package org.apereo.cas.mgmt.authentication;

import org.pac4j.core.client.DirectClient;
import org.pac4j.core.credentials.AnonymousCredentials;
import org.pac4j.core.profile.CommonProfile;

/**
 * This is {@link CasAnonymousClient}.
 *
 * @author Misagh Moayyed
 * @since 6.0.0
 */
public class CasAnonymousClient extends DirectClient<AnonymousCredentials, CommonProfile> {
    @Override
    public void clientInit() {
        defaultCredentialsExtractor(webContext -> AnonymousCredentials.INSTANCE);

        defaultAuthenticator((cred, ctx) -> {
            final CommonProfile profile = new CommonProfile();
            profile.setId(getClass().getSimpleName());
            profile.setClientName(getClass().getSimpleName());
            cred.setUserProfile(profile);
        });
    }
}
