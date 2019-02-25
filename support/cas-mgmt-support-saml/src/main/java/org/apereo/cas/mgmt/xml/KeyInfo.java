package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * KeyInfo element from SAML Metadata.
 *
 * @author Travis Schmidt
 * @since 6.0.0
 */
@Data
@XmlRootElement(name = "KeyInfo")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class KeyInfo {

    @XmlElement(name = "X509Data", namespace ="http://www.w3.org/2000/09/xmldsig#")
    private String x509Data;
}
