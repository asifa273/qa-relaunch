#!/bin/bash
# Test script to verify CDP warning suppression
# Usage: ./test_cdp_suppression.sh

set -e

WORKSPACE="/Users/asifabegum/Library/Mobile Documents/com~apple~CloudDocs/GITHUB/qa-relaunch"
PROJECT_DIR="$WORKSPACE/automationexercise-bdd"

echo "📋 QA Relaunch - CDP Warning Suppression Test"
echo "=============================================="
echo ""

# Step 1: Build
echo "🔨 Step 1: Building project..."
cd "$PROJECT_DIR"
mvn clean compile -q
echo "✅ Build successful"
echo ""

# Step 2: Test without logging config
echo "🔍 Step 2: Checking for CDP warnings (without suppression)..."
cd "$PROJECT_DIR"
WARNING_COUNT=$(mvn exec:java \
  -Dexec.mainClass="eComm.ShopCart" \
  -DskipTests \
  -q 2>&1 | grep -ic "CDP" || echo "0")
echo "⚠️  Found $WARNING_COUNT CDP-related lines in output"
echo ""

# Step 3: Test with logging config
echo "🔕 Step 3: Checking for CDP warnings (WITH suppression)..."
cd "$PROJECT_DIR"
SUPPRESSED_COUNT=$(mvn exec:java \
  -Dexec.mainClass="eComm.ShopCart" \
  -DskipTests \
  -Djava.util.logging.config.file=src/main/resources/logging.properties \
  -q 2>&1 | grep -ic "CDP" || echo "0")
echo "✅ Found $SUPPRESSED_COUNT CDP-related lines in output (should be 0)"
echo ""

# Summary
echo "📊 Summary"
echo "=========="
if [ "$SUPPRESSED_COUNT" -eq "0" ]; then
  echo "✅ SUCCESS: CDP warning suppression is working!"
  echo ""
  echo "💡 Use this command to run tests cleanly:"
  echo "   mvn exec:java -Dexec.mainClass=\"eComm.ShopCart\" \\"
  echo "     -Djava.util.logging.config.file=src/main/resources/logging.properties"
else
  echo "⚠️  WARNING: CDP warnings still present. Check logging.properties configuration."
fi
echo ""
echo "📖 For more details, see: BUILD_NOTES.md"
