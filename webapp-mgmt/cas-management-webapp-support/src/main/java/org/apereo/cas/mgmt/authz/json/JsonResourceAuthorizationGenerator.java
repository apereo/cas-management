package org.apereo.cas.mgmt.authz.json;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apereo.cas.util.io.FileWatcherService;
import org.hjson.JsonValue;
import org.jooq.lambda.Unchecked;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.profile.CommonProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * This is {@link JsonResourceAuthorizationGenerator}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public class JsonResourceAuthorizationGenerator implements AuthorizationGenerator<CommonProfile> {

    private final ObjectMapper objectMapper;

    private Map<String, UserAuthorizationDefinition> rules = new LinkedHashMap<>();

    public JsonResourceAuthorizationGenerator(final Resource resource) {
        this.objectMapper = new ObjectMapper(getJsonFactory()).findAndRegisterModules();

        loadResource(resource);
        watchResource(resource);
    }

    private void watchResource(final Resource usersFile) {
        try {
            val watcher = new FileWatcherService(usersFile.getFile(),
                Unchecked.consumer(file -> loadResource(usersFile)));
            watcher.start(getClass().getSimpleName());
        } catch (final Exception e) {
            LOGGER.debug(e.getMessage(), e);
        }
    }

    private void loadResource(final Resource res) {
        try (Reader reader = new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8)) {
            val personList = new TypeReference<Map<String, UserAuthorizationDefinition>>() {
                };
            this.rules = this.objectMapper.readValue(JsonValue.readHjson(reader).toString(), personList);
        } catch (final Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public CommonProfile generate(final WebContext context, final CommonProfile profile) {
        val id = profile.getId();
        if (rules.containsKey(id)) {
            val defn = rules.get(id);
            profile.addRoles(defn.getRoles());
            profile.addPermissions(defn.getPermissions());
        }
        return profile;
    }

    protected JsonFactory getJsonFactory() {
        return null;
    }
}
