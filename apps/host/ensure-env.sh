#!/bin/bash
# Ensure environment variables are set for Module Federation

echo "Setting environment variables..."
export NEXT_PRIVATE_LOCAL_WEBPACK=true
echo "NEXT_PRIVATE_LOCAL_WEBPACK set to: $NEXT_PRIVATE_LOCAL_WEBPACK"

# Install webpack explicitly
echo "Installing webpack..."
npm install webpack@^5.103.0

echo "Environment setup complete"