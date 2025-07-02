# Financial Management Application

A cutting-edge personal financial management web application that transforms money tracking into an intuitive and engaging experience through advanced transaction handling and intelligent payment tracking.

## Features

- React.js frontend with TypeScript
- Node.js backend
- Tailwind CSS for responsive styling
- AI-powered transaction management
- Advanced partial payment and carry-over tracking
- Comprehensive financial visualization
- Dynamic month-to-month transaction allocation
- Vibes Salary data management functionality
- Enhanced timing and status tracking for payments
- Intelligent payment reallocation system

## Running the Application

### Option 1: Using the Standard Start Script

You can use the provided start script to run the application on localhost:5000:

```bash
# Make the script executable (first time only)
chmod +x start-on-localhost.sh

# Run the application
./start-on-localhost.sh
```

### Option 2: Using the Local Development Server (Recommended for Local Setup)

If you're encountering issues with Vite or other dependencies when running locally, use this simplified approach:

```bash
# Make the script executable (first time only)
chmod +x start-local.sh

# Run the application
./start-local.sh
```

This option builds the application first and then serves it using a simplified Express server.

### Option 3: Manually Running the Application

Alternatively, you can run the application manually:

```bash
# Set the port environment variable
export PORT=5000
export NODE_ENV=development

# Start the application
npm run dev
```

The application will be available at [http://localhost:5000](http://localhost:5000)

### Troubleshooting

If you encounter errors related to missing packages like Vite:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. If the error persists, use the simplified local development server (Option 2 above).

## Key Features

- **Advanced Transaction Management**: Track and categorize all your financial transactions with ease
- **Vibes Salary Tracking**: Specialized tracking for salary payments with intelligent allocation
- **Payment Status Monitoring**: Visual indicators for fully paid, partially paid, and unpaid entries
- **Cascading Payment System**: Large payments automatically cascade to cover multiple months
- **Days Calculation**: Shows days late or days before due date for each payment entry