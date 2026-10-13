// Standardized currency formatter for Sri Lankan Rupee (LKR)
// Guarantees consistent "LKR X,XXX.XX" / "-LKR X,XXX.XX" output across all browsers, locales, and operating systems
export const formatCurrency = (amount) => {
  const numericAmount = Number(amount) || 0;
  const isNegative = numericAmount < 0;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numericAmount));

  return isNegative ? `-LKR ${formatted}` : `LKR ${formatted}`;
};

// Date formatter (e.g., "Oct 11, 2026")
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

// Standardized Income Categories
export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Business',
  'Gifts',
  'Other Income',
];

// Standardized Expense Categories
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Rent & Housing',
  'Transportation',
  'Utilities & Bills',
  'Entertainment',
  'Health & Medical',
  'Shopping',
  'Education',
  'Other Expense',
];
