#!/bin/bash

# Spiritual Tracker - Repository Cleanup Script

echo "🧹 Cleaning up Spiritual Tracker repository..."

# Remove OS generated files
echo "Removing OS generated files..."
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete
find . -name "ehthumbs.db" -delete

# Remove node_modules (optional - uncomment if needed)
# echo "Removing node_modules..."
# find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove build directories
echo "Removing build directories..."
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "out" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove cache directories
echo "Removing cache directories..."
find . -name ".cache" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".parcel-cache" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".expo" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove log files
echo "Removing log files..."
find . -name "*.log" -delete
find . -name "npm-debug.log*" -delete
find . -name "yarn-debug.log*" -delete
find . -name "yarn-error.log*" -delete

# Remove temporary files
echo "Removing temporary files..."
find . -name "*.tmp" -delete
find . -name "*.temp" -delete
find . -name "*~" -delete

# Remove coverage reports
echo "Removing coverage reports..."
find . -name "coverage" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "*.lcov" -delete

echo "✅ Repository cleanup completed!"
echo ""
echo "To reinstall dependencies, run:"
echo "  npm run install:all"
echo ""
echo "To start development, run:"
echo "  npm run dev:web" 