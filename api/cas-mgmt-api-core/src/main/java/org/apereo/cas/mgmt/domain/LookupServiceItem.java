package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Class used to serialize service information to be used when presenting
 * lists of services.
 *
 * @author Travis Schmidt
 * @since 5.2
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LookupServiceItem implements Serializable {

    private static final long serialVersionUID = 4882440567964605644L;

    private String assignedId;
    private String serviceId;
    private String name;
    private String description;
    private String contacts;
}

