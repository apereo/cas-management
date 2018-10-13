package org.apereo.cas.mgmt.domain;

import java.util.Set;

/**
 * Interface for serializing profile to client webapp.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public interface MgmtUserProfile {

    /**
     * The user id.
     *
     * @return - the user id.
     */
    String getId();

    /**
     * Permissions represented as domains.
     *
     * @return - Set of String
     */
    Set<String> getPermissions();

    /**
     * Email.
     *
     * @return - the user's email
     */
    String getEmail();

    /**
     * First Name.
     *
     * @return - the user's first name
     */
    String getFirstName();

    /**
     * Family Name.
     *
     * @return - the user's family name
     */
    String getFamilyName();

    /**
     * Username.
     *
     * @return - the user's username
     */
    String getUsername();

    /**
     * Phone.
     *
     * @return - the user's phone
     */
    String getPhone();

    /**
     * Department.
     *
     * @return - the user's department
     */
    String getDepartment();

    /**
     * Administrator.
     *
     * @return - true if user as ROLE_ADMIN
     */
    boolean isAdministrator();

}
