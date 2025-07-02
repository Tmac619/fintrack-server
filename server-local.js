// Simple Express server for local development without Vite
// This file uses CommonJS module format for compatibility
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Set the port to listen on
const PORT = process.env.PORT || 5000;

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// In-memory storage for local development
let transactions = [];
let users = [
  { id: 1, username: 'demo', password: 'demo', createdAt: new Date().toISOString() }
];

// Add CORS headers for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Serve static files
app.use(express.static('dist'));

// Basic API endpoints
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running locally' });
});

// API endpoints for transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const transaction = req.body;
  transaction.id = transactions.length + 1;
  transaction.date = transaction.date || new Date().toISOString().split('T')[0];
  transactions.push(transaction);
  console.log('Created transaction:', transaction);
  res.status(201).json(transaction);
});

app.put('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...req.body, id };
    console.log('Updated transaction:', transactions[index]);
    res.json(transactions[index]);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    const deleted = transactions.splice(index, 1)[0];
    console.log('Deleted transaction:', deleted);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ id: user.id, username: user.username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} in your browser`);
  
  // Load some sample data
  if (transactions.length === 0) {
    const sampleData = [
      {
        id: 1,
        type: 'income',
        category: 'Salary',
        description: 'Vibes Salary May 2023',
        amount: 350,
        date: '2025-05-09',
        isVibesSalary: true,
        expectedDate: '2023-05-31'
      },
      {
        id: 2,
        type: 'income',
        category: 'Salary',
        description: 'Vibes Salary May 2023',
        amount: 50,
        date: '2023-05-30',
        isVibesSalary: true,
        expectedDate: '2023-05-31'
      },
      {
        id: 3,
        type: 'income',
        category: 'Salary',
        description: 'Vibes Salary June 2023',
        amount: 100,
        date: '2023-06-29',
        isVibesSalary: true,
        expectedDate: '2023-06-30'
      },
      {
        id: 4,
        type: 'income',
        category: 'Salary',
        description: 'Vibes Salary July 2023',
        amount: 150,
        date: '2023-07-28',
        isVibesSalary: true,
        expectedDate: '2023-07-31'
      }
    ];
    transactions = sampleData;
    console.log('Loaded sample transactions data');
  }
});