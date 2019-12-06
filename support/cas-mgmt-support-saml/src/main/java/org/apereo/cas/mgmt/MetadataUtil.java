package org.apereo.cas.mgmt;

import org.apereo.cas.support.saml.OpenSamlConfigBean;
import org.apereo.cas.support.saml.SamlUtils;
import org.apereo.cas.support.saml.StaticXmlObjectMetadataResolver;
import lombok.SneakyThrows;
import lombok.val;
import org.opensaml.core.xml.XMLObject;
import org.opensaml.core.xml.util.XMLObjectSource;
import org.opensaml.saml.saml2.metadata.EntityDescriptor;

import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * Static Utility class for Metadata.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
public class MetadataUtil {

    /**
     * Static util function to parse Metadata that is received as an xml string.
     *
     * @param xml - the metadata
     * @param configBean - open saml config bean
     * @return - parsed EntityDescriptor
     */
    @SneakyThrows
    public static EntityDescriptor fromXML(final String xml, final OpenSamlConfigBean configBean) {
        val xmlObject = SamlUtils.transformSamlObject(configBean, xml.getBytes(UTF_8), XMLObject.class);
        xmlObject.getObjectMetadata().put(new XMLObjectSource(xml.getBytes(UTF_8)));
        val resolver = new StaticXmlObjectMetadataResolver(xmlObject);
        resolver.setId("something");
        resolver.initialize();
        val entity = resolver.iterator().next();
        resolver.destroy();
        return entity;
    }
}
