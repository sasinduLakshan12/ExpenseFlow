const mongoose = require('mongoose');

const connectDB = async () => {
  // If already connected, reuse connection
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoURI = process.env.MONGO_URI || 'mongodb+srv://sasindu125lakshan_db_user:sasindu321@itcentercluster.lekl7es.mongodb.net/expenseflow?retryWrites=true&w=majority&appName=ITCenterCluster';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
