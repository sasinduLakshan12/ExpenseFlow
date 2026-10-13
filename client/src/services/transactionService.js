import API from './api';

// Fetch all transactions with optional filters (type, category, etc.)
export const getTransactions = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.type && filters.type !== 'all') params.append('type', filters.type);
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);

  const response = await API.get(`/transactions?${params.toString()}`);
  return response.data;
};

// Create new transaction (Income or Expense)
export const createTransaction = async (transactionData) => {
  const response = await API.post('/transactions', transactionData);
  return response.data;
};

// Update an existing transaction
export const updateTransaction = async (id, transactionData) => {
  const response = await API.put(`/transactions/${id}`, transactionData);
  return response.data;
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  const response = await API.delete(`/transactions/${id}`);
  return response.data;
};
