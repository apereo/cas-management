package org.apereo.cas.mgmt.controller;

import org.apereo.cas.authentication.attribute.AttributeDefinition;
import org.apereo.cas.authentication.attribute.DefaultAttributeDefinitionStore;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
@Slf4j
public class AttributesController {

    private final CasUserProfileFactory casUserProfileFactory;
    private final DefaultAttributeDefinitionStore attributeDefinitionStore;
    private final CasConfigurationProperties casProperties;

    /**
     * Gets domains.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return the definitions
     * @throws IllegalAccessException - insufficient permissions
     */
    @GetMapping
    public Collection<AttributeDefinition> getAttributes(final HttpServletRequest request,
                                                         final HttpServletResponse response) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        LOGGER.warn("[{}]", attributeDefinitionStore.getAttributeDefinitions());
        return attributeDefinitionStore.getAttributeDefinitions();
    }

    @GetMapping("/{key}")
    public AttributeDefinition getAttribute(final HttpServletRequest request,
                                                   final HttpServletResponse response,
                                                   final @PathVariable String key) throws IllegalAccessException {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isUser()) {
            throw new IllegalAccessException("Insufficient permissions");
        }
        return attributeDefinitionStore.locateAttributeDefinition(key).get();
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
