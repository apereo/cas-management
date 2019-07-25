package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.services.RegexRegisteredService;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Release {

    private ReleaseAssertion assertion;

    private WebApplicationService service;
    private RegexRegisteredService registeredService;

}
