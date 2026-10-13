import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Tag,
  FileText,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { createTransaction, updateTransaction } from '../services/transactionService';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/formatters';

const TransactionModal = ({ isOpen, onClose, onSuccess, transactionToEdit = null }) => {
  const isEditing = Boolean(transactionToEdit);

  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state when editing an existing transaction or opening new
  useEffect(() => {
    if (transactionToEdit) {
      const editType = transactionToEdit.type || 'expense';
      setType(editType);
      setAmount(transactionToEdit.amount || '');
      setCategory(
        transactionToEdit.category ||
          (editType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0])
      );
      setDate(
        transactionToEdit.date
          ? new Date(transactionToEdit.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      );
      // Populate optional description from note or custom title
      const initialDesc =
        transactionToEdit.note ||
        (transactionToEdit.title && transactionToEdit.title !== transactionToEdit.category
          ? transactionToEdit.title
          : '');
      setDescription(initialDesc);
    } else {
      // Default reset
      setType('expense');
      setCategory(EXPENSE_CATEGORIES[0]);
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
    }
    setError('');
  }, [transactionToEdit, isOpen]);

  // When type changes (Income <-> Expense), switch default category
  const handleTypeChange = (newType) => {
    setType(newType);
    if (newType === 'income') {
      setCategory(INCOME_CATEGORIES[0]);
    } else {
      setCategory(EXPENSE_CATEGORIES[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    try {
      setLoading(true);
      const cleanDesc = description.trim();
      const payload = {
        title: cleanDesc || category,
        amount: numAmount,
        type,
        category,
        date,
        note: cleanDesc,
      };

      if (isEditing) {
        await updateTransaction(transactionToEdit._id, payload);
      } else {
        await createTransaction(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center space-x-2 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Type Selector (Expense vs Income Toggle) */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                type === 'expense'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowDownCircle size={18} />
              <span>Expense</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUpCircle size={18} />
              <span>Income</span>
            </button>
          </div>

          {/* Category & Amount Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18} />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  {currentCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Amount (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  LKR
                </span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Date & Optional Description Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Transaction Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18} />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Description / Note <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18} />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    type === 'income'
                      ? 'e.g. October Bonus, Client A'
                      : 'e.g. Keells Super, CEB Bill, Lunch'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-xs transition-all cursor-pointer flex items-center space-x-2 ${
                type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              } disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Add Transaction'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
