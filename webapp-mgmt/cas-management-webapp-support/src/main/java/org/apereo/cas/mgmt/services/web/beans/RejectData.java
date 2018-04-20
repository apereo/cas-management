package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Class used to serialize reject message between client and server.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RejectData implements Serializable {

    /**
     * Id of the commit to be rejected.
     */
    private String id;

    /**
     * Rejection message from admin.
     */
    private String note;
}
