package org.apereo.cas.mgmt;

import org.apereo.cas.services.DefaultRegisteredServiceContact;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.ldaptive.ConnectionFactory;
import org.ldaptive.LdapEntry;
import org.ldaptive.SearchExecutor;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * Default implementation of the ContactLookup interface.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
@Slf4j
@RequiredArgsConstructor
public class DefaultContactLookup implements ContactLookup {
    private static final int MAX_RETURN_VALUES = 10;

    private final ConnectionFactory connectionFactory;

    @Override
    @SneakyThrows
    public RegisteredServiceContact loggedInContact(final String id) {
        val executor = new SearchExecutor();
        executor.setBaseDn("ou=People,dc=ucdavis,dc=edu");
        val result = executor.search(connectionFactory,"(uid="+id+")").getResult();
        return createContact(result.getEntry());
    }

    @Override
    @SneakyThrows
    public Collection<RegisteredServiceContact> query(final String query) {
        val executor = new SearchExecutor();
        executor.setBaseDn("ou=People,dc=ucdavis,dc=edu");
        val result = executor.search(connectionFactory,
                "(&(cn=*" + query + "*)(|(eduPersonAffiliation=staff)(eduPersonAffiliation=faculty)))").getResult();
        val entry = result.getEntries();
        return entry.stream().limit(MAX_RETURN_VALUES).map(this::createContact).collect(Collectors.toList());
    }

    private RegisteredServiceContact createContact(final LdapEntry entry) {
        val contact = new DefaultRegisteredServiceContact();
        contact.setName(name(entry));
        contact.setEmail(entry.getAttribute("mail") != null ? entry.getAttribute("mail").getStringValue() : "");
        contact.setPhone(entry.getAttribute("telephoneNumber") != null ? entry.getAttribute("telephoneNumber").getStringValue() : "");
        contact.setDepartment(entry.getAttribute("ou") != null ? entry.getAttribute("ou").getStringValue() : "");
        return contact;
    }

    private String name(final LdapEntry entry) {
        return (entry.getAttribute("givenName") != null ? entry.getAttribute("givenName").getStringValue() : "")
                + " "
                + (entry.getAttribute("sn") != null ? entry.getAttribute("sn").getStringValue() : "");
    }
}
