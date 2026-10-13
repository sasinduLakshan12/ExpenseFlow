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

// Curated Title Presets for Quick Selection in Transactions
export const TITLE_PRESETS = {
  expense: [
    {
      category: 'Food & Dining',
      titles: [
        'Supermarket / Groceries',
        'Dining Out / Restaurant',
        'Coffee & Bakery',
        'Food Delivery (Uber Eats / PickMe)',
        'Office Lunch & Snacks',
      ],
    },
    {
      category: 'Rent & Housing',
      titles: [
        'House Rent / Apartment Lease',
        'Home Maintenance / Repairs',
        'Furniture & Home Decor',
      ],
    },
    {
      category: 'Utilities & Bills',
      titles: [
        'Electricity Bill (CEB / LECO)',
        'Water Bill (NWSDB)',
        'Home Broadband / Wi-Fi Bill',
        'Mobile Reload / Postpaid Bill',
        'LP Gas Cylinder Refill',
      ],
    },
    {
      category: 'Transportation',
      titles: [
        'Fuel / Petrol / Diesel',
        'Uber / PickMe Ride Fare',
        'Bus & Train Commute Fare',
        'Vehicle Service & Maintenance',
        'Highway Toll Fee',
        'Parking Charges',
      ],
    },
    {
      category: 'Shopping',
      titles: [
        'Clothing & Apparel',
        'Electronics & Gadgets',
        'Online Shopping (Daraz / Ali)',
        'Personal Care & Grooming',
        'Gifts & Souvenirs',
      ],
    },
    {
      category: 'Health & Medical',
      titles: [
        'Pharmacy & Medicine',
        'Doctor Consultation / Channeling',
        'Dental Care / Optical',
        'Medical Lab Tests',
      ],
    },
    {
      category: 'Education',
      titles: [
        'Tuition / Class Fees',
        'Course / University Fee',
        'Books & Stationery',
      ],
    },
    {
      category: 'Entertainment',
      titles: [
        'Movie / Cinema Tickets',
        'Streaming Services (Netflix / Spotify)',
        'Weekend Outing / Trip',
        'Gaming / Hobby Supplies',
      ],
    },
    {
      category: 'Other Expense',
      titles: [
        'Bank Charges & Card Fees',
        'Insurance Premium',
        'Donation / Charity',
        'Pet Supplies & Care',
      ],
    },
  ],
  income: [
    {
      category: 'Salary',
      titles: [
        'Monthly Salary',
        'Overtime (OT) Pay',
        'Company Allowance',
        'Festival / Performance Bonus',
      ],
    },
    {
      category: 'Freelance',
      titles: [
        'Freelance Project Payment',
        'Consulting / Advisory Fee',
        'Contract Design / Dev Work',
        'Upwork / Fiverr Payout',
      ],
    },
    {
      category: 'Investments',
      titles: [
        'Bank Fixed Deposit (FD) Interest',
        'Stock Market Dividends',
        'Treasury Bills / Bonds Return',
        'Rental Property Income',
      ],
    },
    {
      category: 'Business',
      titles: [
        'Business Sales Revenue',
        'Client Invoice Settlement',
        'E-commerce Store Sales',
      ],
    },
    {
      category: 'Gifts',
      titles: [
        'Gift / Cash Received',
        'Birthday / Wedding Cash Gift',
      ],
    },
    {
      category: 'Other Income',
      titles: [
        'Refund / Cash Reimbursement',
        'Sale of Used Items',
        'Side Hustle Revenue',
      ],
    },
  ],
};

