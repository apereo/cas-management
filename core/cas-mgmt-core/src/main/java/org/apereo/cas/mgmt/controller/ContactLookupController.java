package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
@Slf4j
@RequiredArgsConstructor
public class ContactLookupController {

    private final ContactLookup contactLookup;

    /**
     * Method called to query and return a list of contacts.
     *
     * @param query - the query
     * @return - List of RegisteredServiceContact
     * @throws Exception - failed
     */
    @GetMapping
    public Collection<RegisteredServiceContact> lookupContact(final @RequestParam String query) throws Exception {
        return contactLookup.query(query);
    }
}
