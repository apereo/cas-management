package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.services.RegisteredServiceContact;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    private final CasUserProfileFactory casUserProfileFactory;

    /**
     * Method called to query and return a list of contacts.
     *
     * @param query - the query
     * @return - List of RegisteredServiceContact
     */
    @GetMapping
    public Collection<RegisteredServiceContact> lookupContact(final @RequestParam String query) {
        return contactLookup.query(query);
    }

    /**
     * Returns a RegisteredServiceContact representing the currently logged in user.
     *
     * @param request  - the request
     * @param response - the response
     * @return - RegisteredServiceContact
     */
    @GetMapping("/loggedIn")
    public RegisteredServiceContact loggedInContact(final HttpServletRequest request,
                                                    final HttpServletResponse response) {
        val user = casUserProfileFactory.from(request, response);
        return contactLookup.loggedInContact(user.getId());
    }
}
