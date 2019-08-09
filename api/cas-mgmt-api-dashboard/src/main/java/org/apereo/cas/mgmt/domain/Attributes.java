package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * Maps json return from /releaseAttributes endpoint in CAS.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attributes {
    private String uid;

    private Map<String, List<String>> attributes;
}
