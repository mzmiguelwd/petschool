#!/usr/bin/env bash
# Run E2E tests using the `client/.env.test` file.
# Executes both dashboard and profile tests sequentially.
# Usage: from repository root: `cd client && ./run-e2e.sh`

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

if [ ! -f ".env.test" ]; then
  echo ".env.test not found in $HERE. Create it or copy from .env.test.example" >&2
  exit 1
fi

# Load env file (supports simple KEY=VALUE lines)
set -a
source .env.test
set +a

echo "Running E2E tests with BASE_URL=${BASE_URL}"

# Ensure node modules are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run dashboard tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running Dashboard Tests..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run test:e2e

# Run profile update tests
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running Profile Update Tests..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run test:e2e:profile

echo ""
echo "✅ All E2E tests completed successfully!"
