import API from './api';

// Fetch all budgets and live spending progress for a specific month
export const getBudgets = async (month) => {
  const query = month ? `?month=${month}` : '';
  const response = await API.get(`/budgets${query}`);
  return response.data;
};

// Create or update (upsert) a monthly category budget
export const setBudget = async (budgetData) => {
  const response = await API.post('/budgets', budgetData);
  return response.data;
};

// Update an existing budget limit by ID
export const updateBudget = async (id, budgetData) => {
  const response = await API.put(`/budgets/${id}`, budgetData);
  return response.data;
};

// Delete a budget by ID
export const deleteBudget = async (id) => {
  const response = await API.delete(`/budgets/${id}`);
  return response.data;
};
