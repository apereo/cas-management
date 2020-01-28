package org.apereo.cas.mgmt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Serializable class for Metadata to display in CAS Mangement client.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Metadata {

    /**
     * Flag if form mdq.
     */
    private boolean inCommon;

    /**
     * The metadata as string.
     */
    private String metadata;
}
