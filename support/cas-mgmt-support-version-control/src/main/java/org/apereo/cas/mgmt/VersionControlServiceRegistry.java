package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.resource.AbstractResourceBasedServiceRegistry;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.util.io.WatcherService;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.Resource;

import java.util.ArrayList;

/**
 * This is {@link VersionControlServiceRegistry}.
 *
 * @author Misagh Moayyed
 * @since 6.3.3
 */
public class VersionControlServiceRegistry extends AbstractResourceBasedServiceRegistry {
    public VersionControlServiceRegistry(final Resource configDirectory,
                                         final RegisteredServiceResourceNamingStrategy resourceNamingStrategy,
                                         final ConfigurableApplicationContext applicationContext) throws Exception {
        super(configDirectory,
            CollectionUtils.wrapList(CasManagementUtils.JSON_SERIALIZER),
            applicationContext, null, resourceNamingStrategy,
            new ArrayList<>(), WatcherService.noOp());
    }

    @Override
    protected String[] getExtensions() {
        return new String[]{"json"};
    }

}
