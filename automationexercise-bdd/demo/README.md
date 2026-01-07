# Demo module

This demo module contains a simple Selenium WebDriver example `eComm.ShopCart`.

How to run

- Make sure you have ChromeDriver installed and accessible at `/Users/asifabegum/chromedriver` or update the path in `ShopCart.java`.

- Build and run using the provided script (on macOS/Linux):

```bash
cd automationexercise-bdd/demo
./run.sh
```

- Or run directly with Maven:

```bash
cd automationexercise-bdd/demo
mvn -U -DskipTests clean compile exec:java -Dexec.mainClass="eComm.ShopCart" -Dexec.cleanupDaemonThreads=false
```

Notes

- The demo module depends on Selenium (`org.seleniumhq.selenium:selenium-java:4.28.1`).
- The run script will compile the module first. Ensure `JAVA_HOME` is set to a JDK 21 installation if you upgraded to Java 21.

## Handling Chrome DevTools Protocol (CDP) Warnings

When running tests with Chrome 143+, you may see a warning:
```
WARNING: Unable to find CDP implementation matching 143. Using the closest version available: 142
```

This is a non-critical warning that occurs because Selenium doesn't yet have native Chrome 143 DevTools support.

**Workaround 1: Suppress the warning via logging configuration** (Recommended)

Run with the logging configuration to suppress CDP warnings:

```bash
mvn exec:java -Dexec.mainClass="eComm.ShopCart" \
  -Djava.util.logging.config.file=../../src/main/resources/logging.properties
```

**Workaround 2: Wait for Selenium update**

Future versions of Selenium (4.29+) will include native Chrome 143+ support. When available, upgrade the dependency in `pom.xml`:

```xml
<dependency>
  <groupId>org.seleniumhq.selenium</groupId>
  <artifactId>selenium-java</artifactId>
  <version>4.29.0</version> <!-- or later -->
</dependency>
```

The fallback mechanism works correctly, so tests execute successfully despite the warning.
