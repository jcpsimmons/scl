#!/bin/bash

# Build and test script for autism-simulator

echo "🎮 Starting autism-simulator test suite..."

# Step 1: Compile the latest Ink
echo "📝 Compiling Ink story..."
npm run compile:ink
if [ $? -ne 0 ]; then
    echo "❌ Ink compilation failed"
    exit 1
fi

# Step 2: Build the application
echo "🔨 Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Step 3: Run basic tests first
echo "🧪 Running basic functionality tests..."
npm run test:e2e -- tests/e2e/basic.spec.ts --project=chromium
if [ $? -ne 0 ]; then
    echo "❌ Basic tests failed"
    exit 1
fi

# Step 4: Run a limited set of multi-day tests (just one browser, shorter timeouts)
echo "🎯 Running multi-day gameplay tests (limited)..."
npm run test:e2e -- tests/e2e/multi-day-gameplay.spec.ts --project=chromium --max-failures=2 --timeout=45000 --grep "can play through multiple days with self-care focus"

# Step 5: Run failure scenario tests (just the essential ones)
echo "🔥 Running failure scenario tests (limited)..."
npm run test:e2e -- tests/e2e/failure-scenarios.spec.ts --project=chromium --max-failures=2 --timeout=30000 --grep "handles JavaScript errors without breaking|handles malformed save data|handles memory pressure"

echo "✅ Test suite completed!"