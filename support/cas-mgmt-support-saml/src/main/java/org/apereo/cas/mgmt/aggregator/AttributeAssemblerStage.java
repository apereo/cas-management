package org.apereo.cas.mgmt.aggregator;

import net.shibboleth.metadata.Item;
import net.shibboleth.metadata.dom.DOMElementItem;
import net.shibboleth.metadata.dom.saml.SAMLMetadataSupport;
import net.shibboleth.metadata.pipeline.Stage;
import net.shibboleth.metadata.pipeline.StageProcessingException;
import net.shibboleth.utilities.java.support.annotation.constraint.NonnullElements;
import net.shibboleth.utilities.java.support.component.ComponentInitializationException;
import net.shibboleth.utilities.java.support.xml.ElementSupport;
import net.shibboleth.utilities.java.support.xml.NamespaceSupport;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.DocumentType;
import org.w3c.dom.Element;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.xml.namespace.QName;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Created by tschmidt on 6/10/16.
 */
public class AttributeAssemblerStage implements Stage<Element> {
    @Override
    public void execute(@Nonnull @NonnullElements Collection<Item<Element>> collection) throws StageProcessingException {

        DOMImplementation domImpl = ((Element)((Item)collection.iterator().next()).unwrap()).getOwnerDocument().getImplementation();
        Document attributeDocument = domImpl.createDocument((String)null, (String)null, (DocumentType)null);
        Element attributeGroup = attributeDocument.createElement("AttributeFilterPolicyGroup");
        attributeGroup.setAttribute("xmlns","urn:mace:shibboleth:2.0:afp");
        attributeGroup.setAttribute("xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
        attributeGroup.setAttribute("id","ShibbolethFilterPolicy");
        attributeGroup.setAttribute("xsi:schemaLocation","urn:mace:shibboleth:2.0:afp http://shibboleth.net/schema/idp/shibboleth-afp.xsd");
        attributeDocument.appendChild(attributeGroup);

        List orderedItems = new ArrayList(collection);
        Iterator item = orderedItems.iterator();
        collection.clear();
        while(item.hasNext()) {
            Item item1 = (Item)item.next();
            Element policy = (Element)item1.unwrap();
            policy = (Element)attributeDocument.importNode(policy, true);
            attributeGroup.appendChild(policy);
            ElementSupport.appendTextContent(attributeGroup, "\n");
        }
        collection.add(new DOMElementItem(attributeDocument));
    }

    @Override
    public boolean isDestroyed() {
        return false;
    }

    @Override
    public void destroy() {

    }

    @Nullable
    @Override
    public String getId() {
        return null;
    }

    @Override
    public boolean isInitialized() {
        return false;
    }

    @Override
    public void initialize() throws ComponentInitializationException {

    }
}
