package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.security.cert.X509Certificate;

@Data
@XmlRootElement(name = "X509Data")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class X509Data {

    @XmlElement(name = "X509Certificate", namespace = "http://www.w3.org/2000/09/xmldsig#")
    private X509Certificate x509Certificate;

}
