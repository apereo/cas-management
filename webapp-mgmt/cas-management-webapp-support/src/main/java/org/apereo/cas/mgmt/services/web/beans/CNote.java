package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Bean to serialize commit notes to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CNote {

    /**
     * Id of the note.
     */
    private String id;

    /**
     * Text of the note.
     */
    private String text;
}
