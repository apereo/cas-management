package org.apereo.cas.mgmt;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apereo.cas.services.DefaultRegisteredServiceContact;
import org.apereo.cas.services.RegisteredServiceContact;
import org.ldaptive.ConnectionFactory;
import org.ldaptive.LdapEntry;
import org.ldaptive.SearchExecutor;

import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class DefaultContactLookup implements ContactLookup {
    private static final int MAX_RETURN_VALUES = 10;

    private final ConnectionFactory connectionFactory;

    @Override
    @SneakyThrows
    public Collection<RegisteredServiceContact> query(String query) {
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
