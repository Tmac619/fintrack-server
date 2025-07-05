import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.development' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
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

// Serve static files from the client build
app.use(express.static(join(__dirname, '../dist/public')));

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// In-memory storage for development (replace with database later)
let transactions: any[] = [];
let users = [
  { id: 1, username: 'demo', password: 'demo', createdAt: new Date().toISOString() }
];

// Transaction API endpoints
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

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Financial Management App ready at http://localhost:${PORT}`);
  
  // Load sample data for development
  if (transactions.length === 0) {
    const sampleData = [
      {
        id: 1,
        type: 'income',
        category: 'Salary',
        description: 'Vibes Salary May 2023',
        amount: 350,
        date: '2023-05-09',
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
    console.log('📝 Loaded sample transaction data');
  }
});