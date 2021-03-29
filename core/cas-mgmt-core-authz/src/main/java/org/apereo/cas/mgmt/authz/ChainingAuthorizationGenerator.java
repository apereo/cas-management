package org.apereo.cas.mgmt.authz;

import lombok.val;

import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.profile.UserProfile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This is {@link ChainingAuthorizationGenerator}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
public class ChainingAuthorizationGenerator implements AuthorizationGenerator {
    private final List<AuthorizationGenerator> genenerators = new ArrayList<>();

    @Override
    public Optional<UserProfile> generate(final WebContext webContext, final UserProfile commonProfile) {

        for (val authz : this.genenerators) {
            return authz.generate(webContext, commonProfile);
        }
        return Optional.empty();
    }

    /**
     * Add authorization generator.
     *
     * @param g the generator.
     */
    public void addAuthorizationGenerator(final AuthorizationGenerator g) {
        this.genenerators.add(g);
    }
}
