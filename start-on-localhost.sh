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

# Set port explicitly to 5000
export PORT=5000
export HOST='0.0.0.0'

# Start the application
echo "Starting application on http://localhost:${PORT}"
npm run dev