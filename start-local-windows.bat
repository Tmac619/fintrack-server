@echo off
REM Set environment variables
set PORT=5000
set NODE_ENV=development

echo Building the application...
call npm run build

echo Starting local server on http://localhost:%PORT%
node server-local.js