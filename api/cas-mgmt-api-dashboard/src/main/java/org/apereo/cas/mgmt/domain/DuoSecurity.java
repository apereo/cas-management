package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 */
@Data
@NoArgsConstructor
public class DuoSecurity {

    private String status;

    private Details details;

    @Data
    @NoArgsConstructor
    public static class Details {

        private String duoApiHost;
    }
}
