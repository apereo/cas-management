package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Rest Controller used to look up contacts.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RestController("contactLookup")
@RequestMapping(path = "/api/contacts", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ContactLookupController {

    private final ContactLookup contactLookup;

    /**
     * Method called to query and return a list of contacts.
     *
     * @param query - the query
     * @return - List of RegisteredServiceContact
     */
    @GetMapping
    public Collection<RegisteredServiceContact> lookupContact(@RequestParam final String query) {
        return contactLookup.query(query);
    }

    /**
     * Returns a RegisteredServiceContact representing the currently logged in user.
     *
     * @param authentication - the user
     * @return - RegisteredServiceContact
     */
    @GetMapping("/loggedIn")
    public RegisteredServiceContact loggedInContact(final Authentication authentication) {
        val user = CasUserProfile.from(authentication);
        return contactLookup.loggedInContact(user.getId());
    }
}
