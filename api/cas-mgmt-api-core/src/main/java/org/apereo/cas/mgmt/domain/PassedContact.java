package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apereo.cas.services.DefaultRegisteredServiceContact;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassedContact {
    private String[] services;
    private DefaultRegisteredServiceContact contact;
    private DefaultRegisteredServiceContact[] contacts;
}
