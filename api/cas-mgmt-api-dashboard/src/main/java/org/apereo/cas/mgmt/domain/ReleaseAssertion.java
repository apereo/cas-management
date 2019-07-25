package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apereo.cas.authentication.Authentication;
import org.apereo.cas.authentication.DefaultAuthentication;
import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.authentication.principal.SimpleWebApplicationServiceImpl;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.validation.Assertion;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReleaseAssertion {

    private DefaultAuthentication primaryAuthentication;

    private WebApplicationService service;
}
