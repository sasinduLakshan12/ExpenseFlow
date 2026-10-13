const Transaction = require('../models/Transaction');

// @desc    Get all transactions for logged in user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const query = { user: req.user._id };

    // Optional query filters
    if (req.query.type && (req.query.type === 'income' || req.query.type === 'expense')) {
      query.type = req.query.type;
    }

    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Sort newest transactions first
    const transactions = await Transaction.find(query).sort({ date: -1, createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new transaction (Income or Expense)
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    // Field validations
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Transaction title is required' });
    }

    if (amount === undefined || amount === null || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number greater than 0' });
    }

    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Transaction type must be either income or expense' });
    }

    if (!category || category.trim() === '') {
      return res.status(400).json({ message: 'Category is required' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title: title.trim(),
      amount: Number(amount),
      type,
      category: category.trim(),
      date: date ? new Date(date) : Date.now(),
      note: note ? note.trim() : ''
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update existing transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify ownership: ensure logged-in user owns this transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this transaction' });
    }

    const { title, amount, type, category, date, note } = req.body;

    if (amount !== undefined && Number(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    if (type && !['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either income or expense' });
    }

    transaction.title = title ? title.trim() : transaction.title;
    transaction.amount = amount !== undefined ? Number(amount) : transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category ? category.trim() : transaction.category;
    transaction.date = date ? new Date(date) : transaction.date;
    transaction.note = note !== undefined ? note.trim() : transaction.note;

    const updatedTransaction = await transaction.save();

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify ownership: ensure logged-in user owns this transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this transaction' });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: 'Transaction deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
