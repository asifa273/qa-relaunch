#!/usr/bin/env bash
# Build and run the demo ShopCart class using Maven
set -euo pipefail

cd "$(dirname "$0")"

# Compile
mvn -U -DskipTests clean compile

# Run via exec plugin
mvn exec:java -Dexec.mainClass="eComm.ShopCart" -Dexec.cleanupDaemonThreads=false
