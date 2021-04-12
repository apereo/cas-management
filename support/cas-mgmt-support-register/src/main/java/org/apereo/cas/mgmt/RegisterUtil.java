package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.services.DefaultRegisteredServiceContact;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.val;

/**
 * Utility class for Register functionality.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class RegisterUtil {

    /**
     * Creates a {@link DefaultRegisteredServiceContact}.
     *
     * @param casUserProfile - casuser
     * @return -new contact.
     */
    public static RegisteredServiceContact createContact(final CasUserProfile casUserProfile) {
        val contact = new DefaultRegisteredServiceContact();
        contact.setName(casUserProfile.getFirstName() + ' ' + casUserProfile.getFamilyName());
        contact.setDepartment(casUserProfile.getDepartment());
        contact.setEmail(casUserProfile.getEmail());
        contact.setPhone(casUserProfile.getPhone());
        return contact;
    }
}
