package config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    private static Properties properties;
    private static final String CONFIG_PATH = "src/test/resources/config.properties";

    static {
        loadProperties();
    }

    private static void loadProperties() {
        properties = new Properties();
        try (FileInputStream fis = new FileInputStream(CONFIG_PATH)) {
            properties.load(fis);
        } catch (IOException e) {
            System.err.println("Error loading config.properties: " + e.getMessage());
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    public static String getBrowser() {
        return getProperty("browser");
    }

    public static String getBaseUrl() {
        return getProperty("baseUrl");
    }

    public static int getImplicitWait() {
        return Integer.parseInt(getProperty("implicitWait"));
    }

    public static int getExplicitWait() {
        return Integer.parseInt(getProperty("explicitWait"));
    }

    public static int getPageLoadTimeout() {
        return Integer.parseInt(getProperty("pageLoadTimeout"));
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(getProperty("headless"));
    }
}
