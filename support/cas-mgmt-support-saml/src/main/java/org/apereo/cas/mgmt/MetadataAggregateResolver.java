package org.apereo.cas.mgmt;

import org.opensaml.saml.saml2.metadata.EntityDescriptor;

import java.util.List;

/**
 * Interface for aggregate resolver.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
public interface MetadataAggregateResolver {

    /**
     * Method queries the aggregater for matching sps.
     *
     * @param regexp - matcher
     * @return - List of entity ids
     */
    List<String> query(String regexp);

    /**
     * Finds and returns the Entity from the passed id.
     *
     * @param entityId - Id of the SP
     * @return - EntityDescriptor
     */
    EntityDescriptor find(String entityId);

    /**
     * Returns location of the metadata for the aggregate.
     *
     * @return - location
     */
    String location();

    /**
     * Rerturns an SP Entity as XML.
     *
     * @param entityId - Id of the SP
     * @return - XML
     */
    String xml(String entityId);
}
