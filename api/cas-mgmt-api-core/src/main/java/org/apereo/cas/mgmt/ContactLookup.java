package org.apereo.cas.mgmt;

import org.apereo.cas.services.RegisteredServiceContact;

import java.util.Collection;

/**
 * Interface implemented to provide a list of contacts from a query String.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public interface ContactLookup {

    /**
     * Method called by the ContactLoookUpController to retrieve contacts.
     *
     * @param query - the query
     * @return - the list of contacts
     */
    Collection<RegisteredServiceContact> query(String query);

    /**
     * Method called to create a contact for the logged in user.
     *
     * @return - the logged in user a contact.
     */
    RegisteredServiceContact loggedInContact(String id);

}
