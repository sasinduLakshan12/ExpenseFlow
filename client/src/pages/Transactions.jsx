import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ArrowUpRight, ArrowDownLeft, AlertCircle, RefreshCw, Receipt, RotateCcw, FileText } from 'lucide-react';
import { getTransactions, deleteTransaction } from '../services/transactionService';
import { formatCurrency, formatDate, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/formatters';
import { exportTransactionsToPDF } from '../utils/pdfExport';
import { useAuth } from '../context/AuthContext';
import TransactionModal from '../components/TransactionModal';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters and Search State
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Deleting State
  const [deletingId, setDeletingId] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTransactions({
        type: filterType,
        category: filterCategory,
      });
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filterType, filterCategory]);

  const handleOpenAddModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete transaction');
    } finally {
      setDeletingId(null);
    }
  };

  // Client-side real-time search filtering
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.note && item.note.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const hasActiveFilters = filterType !== 'all' || filterCategory !== 'All' || searchTerm.trim() !== '';

  const handleClearFilters = () => {
    setFilterType('all');
    setFilterCategory('All');
    setSearchTerm('');
  };

  const handleExportPDF = () => {
    if (filteredTransactions.length === 0) return;
    const scopeLabel = hasActiveFilters
      ? `Filtered (${filterType !== 'all' ? filterType.toUpperCase() : 'All Types'}, ${filterCategory})`
      : 'All Transactions';
    exportTransactionsToPDF({
      transactions: filteredTransactions,
      user,
      filterScope: scopeLabel,
    });
  };

  const allAvailableCategories = ['All', ...Array.from(new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track, filter, and manage all your income and expense records.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {transactions.length > 0 && (
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center justify-center space-x-1.5 bg-white hover:bg-slate-50 text-indigo-700 font-semibold px-3.5 sm:px-4 py-2.5 rounded-xl border border-indigo-200 transition-all shadow-xs hover:border-indigo-300 cursor-pointer shrink-0 text-xs sm:text-sm"
              title="Download official PDF financial statement"
            >
              <FileText size={16} className="text-indigo-600" />
              <span>Export PDF</span>
            </button>
          )}
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-500/25 hover:shadow-indigo-500/35 cursor-pointer shrink-0 text-xs sm:text-sm"
          >
            <Plus size={17} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or note..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Type Filter Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {['all', 'income', 'expense'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  filterType === t
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
            >
              {allAvailableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter & Reset Filter Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredTransactions.length}</span> of{' '}
            <span className="font-semibold text-slate-700">{transactions.length}</span> transactions
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center space-x-1.5 text-indigo-600 hover:text-indigo-800 font-semibold hover:underline cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw size={12} />
              <span>Reset active filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchTransactions}
            className="flex items-center space-x-1 text-xs font-semibold hover:underline cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Transactions List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-slate-500">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Receipt size={24} />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No transactions found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {searchTerm || filterType !== 'all' || filterCategory !== 'All'
                ? 'Try adjusting your filters or search keyword.'
                : 'Use the "+ Add Transaction" button above to record your first income or expense.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Transaction</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTransactions.map((item) => {
                  const isIncome = item.type === 'income';

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Title & Type Icon */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isIncome
                                ? 'bg-emerald-100 text-emerald-600'
                                : 'bg-rose-100 text-rose-600'
                            }`}
                          >
                            {isIncome ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{item.title}</p>
                            {item.note && item.note !== item.title && (
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.note}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${
                            isIncome
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {item.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-xs">
                        {formatDate(item.date)}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 text-right font-bold whitespace-nowrap">
                        <span className={isIncome ? 'text-emerald-600' : 'text-rose-600'}>
                          {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            title="Edit Transaction"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.title)}
                            disabled={deletingId === item._id}
                            title="Delete Transaction"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {deletingId === item._id ? (
                              <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTransactions}
        transactionToEdit={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
