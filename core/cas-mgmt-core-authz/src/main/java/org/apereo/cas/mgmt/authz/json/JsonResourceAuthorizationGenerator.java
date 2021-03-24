package org.apereo.cas.mgmt.authz.json;

import org.apereo.cas.util.io.FileWatcherService;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.hjson.JsonValue;
import org.jooq.lambda.Unchecked;
import org.pac4j.core.authorization.generator.AuthorizationGenerator;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.profile.UserProfile;
import org.springframework.core.io.Resource;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

/**
 * This is {@link JsonResourceAuthorizationGenerator}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public class JsonResourceAuthorizationGenerator implements AuthorizationGenerator {

    private final ObjectMapper objectMapper;

    private Map<String, UserAuthorizationDefinition> rules = new LinkedHashMap<>();

    @SneakyThrows
    public JsonResourceAuthorizationGenerator(final Resource resource) {
        this.objectMapper = new ObjectMapper(getJsonFactory()).findAndRegisterModules();

        loadResource(resource);
        val watcher = new FileWatcherService(resource.getFile(),
                Unchecked.consumer(file -> loadResource(resource)));
        watcher.start(getClass().getSimpleName());
    }

    @SneakyThrows
    private void loadResource(final Resource res) {
        try (Reader reader = new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8)) {
            val personList = new TypeReference<Map<String, UserAuthorizationDefinition>>() {
            };
            this.rules = this.objectMapper.readValue(JsonValue.readHjson(reader).toString(), personList);
        }
    }

    @Override
    public Optional<UserProfile> generate(final WebContext context, final UserProfile profile) {
        val id = profile.getId();
        if (rules.containsKey(id)) {
            val defn = rules.get(id);
            profile.addRoles(defn.getRoles());
            profile.addPermissions(defn.getPermissions());
        }
        return Optional.of(profile);
    }

    protected JsonFactory getJsonFactory() {
        return null;
    }
}
