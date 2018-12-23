package org.apereo.cas.mgmt.authz;

import lombok.val;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.profile.CommonProfile;

import java.util.ArrayList;
import java.util.List;

/**
 * This is {@link ChainingAuthorizationGenerator}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
public class ChainingAuthorizationGenerator implements AuthorizationGenerator<CommonProfile> {
    private final List<AuthorizationGenerator<CommonProfile>> genenerators = new ArrayList<>();

    @Override
    public CommonProfile generate(final WebContext webContext, final CommonProfile commonProfile) {
        var profile = commonProfile;
        val it = this.genenerators.iterator();

        while (it.hasNext()) {
            val authz = it.next();
            profile = authz.generate(webContext, profile);
        }
        return profile;
    }

    /**
     * Add authorization generator.
     *
     * @param g the generator.
     */
    public void addAuthorizationGenerator(final AuthorizationGenerator<CommonProfile> g) {
        this.genenerators.add(g);
    }
}
