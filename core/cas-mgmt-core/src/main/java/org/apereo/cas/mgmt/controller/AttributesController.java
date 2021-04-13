package org.apereo.cas.mgmt.controller;

import org.apereo.cas.authentication.attribute.AttributeDefinition;
import org.apereo.cas.authentication.attribute.DefaultAttributeDefinitionStore;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * REST controller for attribute definitions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("attributesController")
@RequestMapping(path="api/attributes", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AttributesController {

    private final DefaultAttributeDefinitionStore attributeDefinitionStore;
    private final CasConfigurationProperties casProperties;

    /**
     * Gets domains.
     *
     * @param authentication  - the user
     * @return the definitions
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping
    public Collection<AttributeDefinition> getAttributes(final Authentication authentication) throws IllegalAccessException {
        if (!CasUserProfile.from(authentication).isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        return attributeDefinitionStore.getAttributeDefinitions();
    }

    @GetMapping("/{key}")
    public AttributeDefinition getAttribute(final Authentication authentication,
                                            @PathVariable final String key) throws IllegalAccessException {
        if (!CasUserProfile.from(authentication).isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        return attributeDefinitionStore.locateAttributeDefinition(key).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void save(@RequestBody final AttributeDefinition definition) {
        this.attributeDefinitionStore.registerAttributeDefinition(definition);
        this.attributeDefinitionStore.to(casProperties.getPersonDirectory().getAttributeDefinitionStore().getJson().getLocation().getFile());
    }

    @DeleteMapping("/{key}")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void delete(@PathVariable final String key) {
        this.attributeDefinitionStore.removeAttributeDefinition(key);
        this.attributeDefinitionStore.to(casProperties.getPersonDirectory().getAttributeDefinitionStore().getJson().getLocation().getFile());
    }
}
