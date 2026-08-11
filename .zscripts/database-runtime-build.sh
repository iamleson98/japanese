#!/bin/bash

set -euo pipefail

BUILD_DIR="${BUILD_DIR:?BUILD_DIR is required}"

mkdir -p "$BUILD_DIR"

echo "ℹ️  当前部署使用 PostgreSQL，跳过打包 SQLite 数据库步骤"
echo "✅ 构建产物无需内置数据库文件"
