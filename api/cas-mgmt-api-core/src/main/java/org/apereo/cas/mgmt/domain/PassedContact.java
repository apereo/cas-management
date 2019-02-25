package org.apereo.cas.mgmt.domain;

import org.apereo.cas.services.DefaultRegisteredServiceContact;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class for sending looked up contacts between the client and the server.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassedContact {
    private String[] services;
    private DefaultRegisteredServiceContact contact;
    private DefaultRegisteredServiceContact[] contacts;
}
