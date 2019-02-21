package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@Data
@XmlRootElement(name = "EncryptionMethod")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class EncryptionMethod {

    @XmlAttribute(name = "Algorithm")
    private String algorithm;

    @XmlElement(name = "KeySize", namespace = "http://www.w3.org/2001/04/xmlenc#")
    private Integer keySize;

}
