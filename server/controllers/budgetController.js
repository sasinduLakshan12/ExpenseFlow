const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

/**
 * @desc    Get all budgets for user with live spending progress for selected month
 * @route   GET /api/budgets
 * @access  Private
 */
const getBudgets = async (req, res) => {
  try {
    // Current month format: YYYY-MM (e.g., 2026-10)
    const selectedMonth = req.query.month || new Date().toISOString().slice(0, 7);

    // Fetch user's configured budgets for this month
    const budgets = await Budget.find({
      user: req.user._id,
      month: selectedMonth
    }).sort({ createdAt: -1 });

    // Calculate start and end date for transaction aggregation
    const [yearStr, monthStr] = selectedMonth.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));

    // Fetch all expense transactions for the user within this month
    const expenses = await Transaction.find({
      user: req.user._id,
      type: 'expense',
      date: { $gte: startDate, $lt: endDate }
    });

    // Sum spending by category
    const categorySpending = {};
    expenses.forEach((tx) => {
      categorySpending[tx.category] = (categorySpending[tx.category] || 0) + tx.amount;
    });

    // Enrich each budget with live calculated spending metrics
    let totalBudgeted = 0;
    let totalSpent = 0;

    const enrichedBudgets = budgets.map((b) => {
      const spent = categorySpending[b.category] || 0;
      const limit = b.monthlyLimit;
      const remaining = Math.max(0, limit - spent);
      const isOver = spent > limit;
      const overAmount = isOver ? spent - limit : 0;
      const percentage = limit > 0 ? (spent / limit) * 100 : 0;

      totalBudgeted += limit;
      totalSpent += spent;

      // Status: safe (< 70%), warning (70-90%), alert (90-100%), exceeded (> 100%)
      let status = 'safe';
      if (percentage >= 100) {
        status = 'exceeded';
      } else if (percentage >= 90) {
        status = 'alert';
      } else if (percentage >= 70) {
        status = 'warning';
      }

      return {
        _id: b._id,
        category: b.category,
        monthlyLimit: limit,
        month: b.month,
        spent,
        remaining,
        isOver,
        overAmount,
        percentage: Number(percentage.toFixed(1)),
        status,
        createdAt: b.createdAt
      };
    });

    // Check for categories that have expenses but no budget defined yet
    const budgetedCategories = new Set(budgets.map((b) => b.category));
    const unbudgetedCategories = Object.keys(categorySpending)
      .filter((cat) => !budgetedCategories.has(cat))
      .map((cat) => ({
        category: cat,
        spent: categorySpending[cat]
      }));

    const totalRemaining = Math.max(0, totalBudgeted - totalSpent);
    const overallPercentage = totalBudgeted > 0 ? Number(((totalSpent / totalBudgeted) * 100).toFixed(1)) : 0;

    res.status(200).json({
      success: true,
      month: selectedMonth,
      summary: {
        totalBudgeted,
        totalSpent,
        totalRemaining,
        overallPercentage,
        budgetCount: budgets.length,
        isOverallExceeded: totalSpent > totalBudgeted && totalBudgeted > 0
      },
      budgets: enrichedBudgets,
      unbudgetedCategories
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve budgets',
      error: error.message
    });
  }
};

/**
 * @desc    Create or update a monthly budget (Upsert by user, category & month)
 * @route   POST /api/budgets
 * @access  Private
 */
const setBudget = async (req, res) => {
  try {
    const { category, monthlyLimit, month } = req.body;

    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const limitNum = Number(monthlyLimit);
    if (isNaN(limitNum) || limitNum <= 0) {
      return res.status(400).json({ message: 'Monthly limit must be a positive number' });
    }

    const budgetMonth = month || new Date().toISOString().slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(budgetMonth)) {
      return res.status(400).json({ message: 'Invalid month format. Expected YYYY-MM' });
    }

    // Upsert budget
    let budget = await Budget.findOne({
      user: req.user._id,
      category: category.trim(),
      month: budgetMonth
    });

    if (budget) {
      budget.monthlyLimit = limitNum;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user._id,
        category: category.trim(),
        monthlyLimit: limitNum,
        month: budgetMonth
      });
    }

    res.status(200).json({
      success: true,
      message: 'Budget saved successfully',
      budget
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save budget',
      error: error.message
    });
  }
};

/**
 * @desc    Update a specific budget by ID
 * @route   PUT /api/budgets/:id
 * @access  Private
 */
const updateBudget = async (req, res) => {
  try {
    const { monthlyLimit } = req.body;
    const limitNum = Number(monthlyLimit);

    if (isNaN(limitNum) || limitNum <= 0) {
      return res.status(400).json({ message: 'Monthly limit must be a positive number' });
    }

    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    budget.monthlyLimit = limitNum;
    await budget.save();

    res.status(200).json({
      success: true,
      message: 'Budget updated successfully',
      budget
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update budget',
      error: error.message
    });
  }
};

/**
 * @desc    Delete a budget by ID
 * @route   DELETE /api/budgets/:id
 * @access  Private
 */
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Budget deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete budget',
      error: error.message
    });
  }
};

module.exports = {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget
};
