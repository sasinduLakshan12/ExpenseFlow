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

// Health Check API Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ExpenseFlow Backend API Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Project Info API Route
app.get('/api/info', (req, res) => {
  res.status(200).json({
    appName: 'ExpenseFlow – Expense & Budget Tracker',
    team: 'Software Engineering Team 405',
    status: 'Development Active',
    version: '1.0.0'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 ExpenseFlow Backend Server running on port ${PORT}`);
});
