package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * EntityDescriptor element from SAML Metadata.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
@Data
@XmlRootElement(name = "EntityDescriptor", namespace = "urn:oasis:names:tc:SAML:2.0:metadata")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class EntityDescriptor {

    @XmlAttribute(name = "entityID")
    private String entityId;

    @XmlElement(name = "SPSSODescriptor", namespace = "urn:oasis:names:tc:SAML:2.0:metadata")
    private SPSSODescriptor sPSSODescriptor;

}

