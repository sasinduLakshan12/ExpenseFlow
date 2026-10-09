const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: [true, 'Please specify a category for budget']
    },
    monthlyLimit: {
      type: Number,
      required: [true, 'Please set a monthly limit amount']
    },
    month: {
      type: String,
      required: [true, 'Format: YYYY-MM']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Budget', BudgetSchema);
