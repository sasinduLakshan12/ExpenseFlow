const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add a transaction title'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount']
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Specify type: income or expense']
    },
    category: {
      type: String,
      required: [true, 'Please specify a category']
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
