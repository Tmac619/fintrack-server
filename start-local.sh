#!/bin/bash

# Check if .env.development exists and load it
if [ -f .env.development ]; then
  echo "Loading environment variables from .env.development"
  export $(grep -v '^#' .env.development | xargs)
else
  # Set environment variables manually if file doesn't exist
  echo "Setting environment variables manually"
  export PORT=5000
  export NODE_ENV=development
fi

# First build the app
echo "Building the application..."
npm run build

# Then start the simplified server for local development
echo "Starting local server on http://localhost:${PORT}"
node server-local.js