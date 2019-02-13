package org.apereo.cas.mgmt.xml;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@Data
@XmlRootElement(name = "EntityDescriptor")
@XmlAccessorType(XmlAccessType.FIELD)
@NoArgsConstructor
public class RequestedAttribute {

    @XmlAttribute(name = "FriendlyName")
    private String friendlyName;

    @XmlAttribute(name = "Name")
    private String name;

    @XmlAttribute(name = "NameFormat")
    private String nameFormat;
}
