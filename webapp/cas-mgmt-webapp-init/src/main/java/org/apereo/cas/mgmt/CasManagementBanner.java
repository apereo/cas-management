package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.util.AsciiArtUtils;
import org.apereo.cas.util.CasVersion;
import org.apereo.cas.util.ResourceUtils;
import org.apereo.cas.util.SystemUtils;

import lombok.SneakyThrows;
import lombok.val;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.Banner;
import org.springframework.boot.info.GitProperties;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Formatter;
import java.util.LinkedHashMap;
import java.util.Properties;

/**
 * This is {@link CasManagementBanner}.
 *
 * @author Misagh Moayyed
 * @since 6.2.3
 */
public class CasManagementBanner implements Banner {
    private static final int SEPARATOR_REPEAT_COUNT = 60;

    private static final String SEPARATOR_CHAR = "-";

    /**
     * Line separator string.
     */
    protected static final String LINE_SEPARATOR = String.join(StringUtils.EMPTY, Collections.nCopies(SEPARATOR_REPEAT_COUNT, SEPARATOR_CHAR));

    private static final GitProperties GIT_PROPERTIES;

    static {
        GIT_PROPERTIES = new GitProperties(loadGitProperties());
    }

    @SneakyThrows
    private static Properties loadGitProperties() {
        var properties = new Properties();
        val resource = new ClassPathResource("mgmt-git.properties");
        if (ResourceUtils.doesResourceExist(resource)) {
            val loaded = PropertiesLoaderUtils.loadProperties(resource);
            for (val key : loaded.stringPropertyNames()) {
                if (key.startsWith("git.")) {
                    properties.put(key.substring("git.".length()), loaded.get(key));
                }
            }
        }
        return properties;
    }


    private static String collectEnvironmentInfo() {
        val properties = System.getProperties();
        if (properties.containsKey("CAS_BANNER_SKIP")) {
            try (val formatter = new Formatter()) {
                formatter.format("CAS Version: %s%n", CasVersion.getVersion());
                formatter.format("CAS Management Version: %s%n", CasManagementUtils.getVersion());
                return formatter.toString();
            }
        }

        try (val formatter = new Formatter()) {
            val sysInfo = new LinkedHashMap<String, Object>();
            sysInfo.put("CAS Management Version", CasManagementUtils.getVersion());
            sysInfo.put("CAS Management Commit Id", StringUtils.defaultString(GIT_PROPERTIES.getCommitId(), "Not Available"));
            sysInfo.put("CAS Management Branch", StringUtils.defaultString(GIT_PROPERTIES.getBranch(), "Not Available"));
            sysInfo.put("CAS Management Build Date/Time", CasManagementUtils.getDateTime());

            sysInfo.putAll(SystemUtils.getSystemInfo());

            sysInfo.forEach((k, v) -> {
                if (k.startsWith(SEPARATOR_CHAR)) {
                    formatter.format("%s%n", LINE_SEPARATOR);
                } else {
                    formatter.format("%s: %s%n", k, v);
                }
            });
            formatter.format("%s%n", LINE_SEPARATOR);
            return formatter.toString();
        }
    }

    @Override
    public void printBanner(final Environment environment, final Class<?> sourceClass, final PrintStream out) {
        AsciiArtUtils.printAsciiArt(out, getTitle(), collectEnvironmentInfo());
    }

    @SneakyThrows
    protected String getTitle() {
        return IOUtils.toString(new ClassPathResource("/mgmt-banner.txt").getInputStream(), StandardCharsets.UTF_8);
    }
}
