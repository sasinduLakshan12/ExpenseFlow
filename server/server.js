const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
const connectDB = require('./config/db');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Middlewares
app.use(cors());
app.use(express.json());

// Ensure MongoDB connection is established before route handlers run
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Health Check API Route
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ExpenseFlow Backend API Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Project Info API Route
app.get(['/api/info', '/info'], (req, res) => {
  res.status(200).json({
    appName: 'ExpenseFlow – Expense & Budget Tracker',
    team: 'Software Engineering Team 405',
    status: 'Development Active',
    version: '1.0.0'
  });
});

// Authentication Routes
app.use(['/api/auth', '/auth'], require('./routes/authRoutes'));

// Transaction Routes (Income & Expense CRUD)
app.use(['/api/transactions', '/transactions'], require('./routes/transactionRoutes'));

// Budget Routes (Category Monthly Limits & Live Tracking)
app.use(['/api/budgets', '/budgets'], require('./routes/budgetRoutes'));

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 ExpenseFlow Backend Server running on port ${PORT}`);
  });
}

module.exports = app;

