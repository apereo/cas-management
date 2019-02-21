package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@Data
@XmlRootElement(name = "KeyDescriptor")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class KeyDescriptor {

    @XmlAttribute( name = "use")
    private String use;

    @XmlElement(name = "KeyInfo", namespace = "http://www.w3.org/2000/09/xmldsig#")
    private KeyInfo keyInfo;

    @XmlElement(name = "EncryptionMethod")
    private EncryptionMethod encryptionMethod;


}
