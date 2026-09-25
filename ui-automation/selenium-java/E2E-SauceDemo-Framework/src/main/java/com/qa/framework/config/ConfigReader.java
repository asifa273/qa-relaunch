package com.qa.framework.config;

import java.io.InputStream;
import java.util.Properties;

/**
 * Single source of truth for environment config.
 * Precedence: -D system property  >  config.properties  >  hard default.
 * That ordering is what lets Jenkins override URL/browser without a code change.
 */
public final class ConfigReader {

    private static final Properties PROPS = new Properties();

    static {
        try (InputStream in = ConfigReader.class.getClassLoader()
                .getResourceAsStream("config.properties")) {
            if (in != null) PROPS.load(in);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load config.properties", e);
        }
    }

    private ConfigReader() { }

    public static String get(String key, String defaultValue) {
        String sysProp = System.getProperty(key);
        if (sysProp != null && !sysProp.isBlank()) return sysProp;
        return PROPS.getProperty(key, defaultValue);
    }

    public static String get(String key) {
        String value = get(key, null);
        if (value == null) throw new IllegalArgumentException("Missing config key: " + key);
        return value;
    }

    public static int getInt(String key, int defaultValue) {
        return Integer.parseInt(get(key, String.valueOf(defaultValue)));
    }

    public static boolean getBoolean(String key, boolean defaultValue) {
        return Boolean.parseBoolean(get(key, String.valueOf(defaultValue)));
    }
}
