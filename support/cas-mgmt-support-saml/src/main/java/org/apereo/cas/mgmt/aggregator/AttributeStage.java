package org.apereo.cas.mgmt.aggregator;

import net.shibboleth.metadata.Item;
import net.shibboleth.metadata.dom.DOMElementItem;
import net.shibboleth.metadata.pipeline.Stage;
import net.shibboleth.metadata.pipeline.StageProcessingException;
import net.shibboleth.utilities.java.support.annotation.constraint.NonnullElements;
import net.shibboleth.utilities.java.support.component.ComponentInitializationException;
import net.shibboleth.utilities.java.support.xml.ElementSupport;
import org.w3c.dom.Element;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Created by tschmidt on 6/10/16.
 */
public class AttributeStage implements Stage<Element> {
    @Override
    public void execute(@Nonnull @NonnullElements Collection<Item<Element>> collection) throws StageProcessingException {
        ArrayList items = new ArrayList(collection);
        collection.clear();
        Iterator var4 = items.iterator();
        System.out.println("Collection size = "+items.size());
        while(var4.hasNext()) {
            collection.add(new DOMElementItem((Element)((Item)var4.next()).unwrap()));
        }
    }

    protected void unwrap(Collection<Item<Element>> collection, Element element) {
        List children = ElementSupport.getChildElements(element);
        Iterator var4 = children.iterator();
        while(var4.hasNext()) {
            unwrap(collection,(Element)var4.next());
        }
        System.out.println("---- "+element.toString());
        collection.add(new DOMElementItem(element));
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
