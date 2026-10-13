const express = require('express');
const router = express.Router();
const {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// All budget routes require JWT authentication
router.use(protect);

router.route('/')
  .get(getBudgets)
  .post(setBudget);

router.route('/:id')
  .put(updateBudget)
  .delete(deleteBudget);

module.exports = router;
