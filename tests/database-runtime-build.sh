#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/../.zscripts" && pwd)"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

EMPTY_BUILD="$TEST_ROOT/empty-build"
EXISTING_BUILD="$TEST_ROOT/existing-build"

BUILD_DIR="$EMPTY_BUILD" bash "$SCRIPT_DIR/database-runtime-build.sh"
BUILD_DIR="$EXISTING_BUILD" bash "$SCRIPT_DIR/database-runtime-build.sh"

test -d "$EMPTY_BUILD"
test -d "$EXISTING_BUILD"
test ! -e "$EMPTY_BUILD/db"
test ! -e "$EXISTING_BUILD/db"

echo "database runtime build tests passed"
