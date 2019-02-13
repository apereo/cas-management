package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@Data
@XmlRootElement(name = "SPSSODescriptor")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class AttributeConsumingService {

    @XmlAttribute(name = "index")
    private Integer index;

    @XmlElement(name = "ServiceName", namespace = "urn:oasis:names:tc:SAML:2.0:metadata")
    private String serviceName;

    @XmlElement(name = "ServiceDescription", namespace = "urn:oasis:names:tc:SAML:2.0:metadata")
    private String serviceDescription;

    @XmlElement(name = "RequestedAttribute", namespace = "urn:oasis:names:tc:SAML:2.0:metadata")
    private List<RequestedAttribute> requestedAttribute;
}
