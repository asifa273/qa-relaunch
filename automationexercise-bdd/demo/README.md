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

- The demo module depends on Selenium (`org.seleniumhq.selenium:selenium-java:4.38.0`).
- The run script will compile the module first. Ensure `JAVA_HOME` is set to a JDK 21 installation if you upgraded to Java 21.
