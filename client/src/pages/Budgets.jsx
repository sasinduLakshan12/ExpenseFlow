import React, { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  CheckCircle2,
  Info,
  Sparkles,
  X,
  PieChart,
  Tag,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import { getBudgets, setBudget, deleteBudget } from '../services/budgetService';
import { formatCurrency, EXPENSE_CATEGORIES } from '../utils/formatters';

// Category icon and styling map
const CATEGORY_META = {
  'Food & Dining': { color: 'rose', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', bar: 'bg-rose-500' },
  'Rent & Housing': { color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', bar: 'bg-amber-500' },
  'Transportation': { color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', bar: 'bg-blue-500' },
  'Utilities & Bills': { color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', bar: 'bg-purple-500' },
  'Entertainment': { color: 'pink', bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', bar: 'bg-pink-500' },
  'Health & Medical': { color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', bar: 'bg-emerald-500' },
  'Shopping': { color: 'cyan', bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', bar: 'bg-cyan-500' },
  'Education': { color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', bar: 'bg-indigo-500' },
  'Other Expense': { color: 'slate', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', bar: 'bg-slate-500' },
};

const getCategoryMeta = (cat) => {
  return CATEGORY_META[cat] || {
    color: 'slate',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-100',
    bar: 'bg-slate-500'
  };
};

const Budgets = () => {
  // Current month in YYYY-MM format (e.g. "2026-10")
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().toISOString().slice(0, 7);
  });

  const [budgets, setBudgets] = useState([]);
  const [summary, setSummary] = useState({
    totalBudgeted: 0,
    totalSpent: 0,
    totalRemaining: 0,
    overallPercentage: 0,
    budgetCount: 0,
    isOverallExceeded: false,
  });
  const [unbudgetedCategories, setUnbudgetedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [modalCategory, setModalCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [modalLimit, setModalLimit] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Delete Confirmation State
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  // Fetch Budgets from API
  const fetchBudgetData = async (monthToFetch = selectedMonth) => {
    try {
      setLoading(true);
      setError('');
      const data = await getBudgets(monthToFetch);
      setBudgets(data.budgets || []);
      setSummary(data.summary || {
        totalBudgeted: 0,
        totalSpent: 0,
        totalRemaining: 0,
        overallPercentage: 0,
        budgetCount: 0,
        isOverallExceeded: false,
      });
      setUnbudgetedCategories(data.unbudgetedCategories || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load budgets for the selected month');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData(selectedMonth);
  }, [selectedMonth]);

  // Month navigation helpers
  const handlePrevMonth = () => {
    const [y, m] = selectedMonth.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 2, 1));
    setSelectedMonth(date.toISOString().slice(0, 7));
  };

  const handleNextMonth = () => {
    const [y, m] = selectedMonth.split('-').map(Number);
    const date = new Date(Date.UTC(y, m, 1));
    setSelectedMonth(date.toISOString().slice(0, 7));
  };

  const formatMonthTitle = (monthStr) => {
    const [y, m] = monthStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, 1));
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
  };

  // Open Modal for Create or Edit
  const handleOpenAddModal = (presetCategory = null) => {
    setEditingBudget(null);
    setModalCategory(presetCategory || EXPENSE_CATEGORIES[0]);
    setModalLimit('');
    setModalError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (budget) => {
    setEditingBudget(budget);
    setModalCategory(budget.category);
    setModalLimit(budget.monthlyLimit.toString());
    setModalError('');
    setIsModalOpen(true);
  };

  // Handle Save Budget
  const handleSaveBudget = async (e) => {
    e.preventDefault();
    setModalError('');

    const limitNum = Number(modalLimit);
    if (!modalLimit || isNaN(limitNum) || limitNum <= 0) {
      setModalError('Please enter a valid monthly limit amount greater than 0');
      return;
    }

    try {
      setModalSubmitting(true);
      await setBudget({
        category: modalCategory,
        monthlyLimit: limitNum,
        month: selectedMonth,
      });

      setIsModalOpen(false);
      setSuccessMsg(
        editingBudget
          ? `Updated budget for ${modalCategory}`
          : `Successfully set ${modalCategory} budget to ${formatCurrency(limitNum)}`
      );
      setTimeout(() => setSuccessMsg(''), 4000);
      await fetchBudgetData(selectedMonth);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to save budget');
    } finally {
      setModalSubmitting(false);
    }
  };

  // Handle Delete Budget
  const handleDeleteBudget = async () => {
    if (!budgetToDelete) return;
    try {
      await deleteBudget(budgetToDelete._id);
      setSuccessMsg(`Budget for ${budgetToDelete.category} was removed`);
      setTimeout(() => setSuccessMsg(''), 4000);
      setBudgetToDelete(null);
      await fetchBudgetData(selectedMonth);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete budget');
      setBudgetToDelete(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 1. PAGE HEADER & MONTH SWITCHER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
              Planning & Spending Limits
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Monthly Budget Manager
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Track categorized spending against predefined limits with real-time Sri Lankan Rupee (LKR) utilization.
          </p>
        </div>

        {/* Month Selector + Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Month Navigator Pill */}
          <div className="flex items-center bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-1 shadow-2xs">
            <button
              onClick={handlePrevMonth}
              title="Previous month"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-3 py-1 flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-800 select-none">
              <Calendar size={15} className="text-indigo-600" />
              <span>{formatMonthTitle(selectedMonth)}</span>
            </div>
            <button
              onClick={handleNextMonth}
              title="Next month"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Add Budget Button */}
          <button
            onClick={() => handleOpenAddModal()}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Plus size={16} />
            <span>Set New Budget</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => fetchBudgetData(selectedMonth)}
            title="Refresh budgets"
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw size={16} />
          </button>

        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center space-x-2 text-xs sm:text-sm shadow-2xs animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchBudgetData(selectedMonth)}
            className="text-xs font-semibold hover:underline cursor-pointer flex items-center space-x-1"
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* 2. OVERALL MONTHLY BUDGET HEALTH & INFLOW POOL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Income Pool */}
        <div className="bg-white/85 backdrop-blur-xl border border-emerald-100 hover:border-emerald-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
            <span>Monthly Inflow</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
              + {formatCurrency(summary.totalIncome || 0)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Income pool to fund budgets</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
              Available
            </span>
          </div>
        </div>

        {/* Metric 2: Total Budget Allocated */}
        <div className="bg-white/85 backdrop-blur-xl border border-indigo-100 hover:border-indigo-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
            <span>Total Budgeted</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              {formatCurrency(summary.totalBudgeted)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Active category limits</span>
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
              {summary.budgetCount} {summary.budgetCount === 1 ? 'Limit' : 'Limits'}
            </span>
          </div>
        </div>

        {/* Metric 3: Total Spent in Budgeted Categories */}
        <div className="bg-white/85 backdrop-blur-xl border border-rose-100 hover:border-rose-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
            <span>Total Spent</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
              {formatCurrency(summary.totalSpent)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Utilization rate</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                summary.overallPercentage >= 100
                  ? 'bg-rose-50 text-rose-700'
                  : summary.overallPercentage >= 80
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {summary.overallPercentage}% Used
            </span>
          </div>
        </div>

        {/* Metric 4: Total Remaining Allowance */}
        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
            <span>Remaining Allowance</span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                summary.isOverallExceeded
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}
            >
              {summary.isOverallExceeded ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
            </div>
          </div>
          <div className="my-2">
            <h3
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                summary.isOverallExceeded ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {formatCurrency(summary.totalRemaining)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Monthly status</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                summary.isOverallExceeded
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {summary.isOverallExceeded ? 'Over Budget' : 'Within Budget'}
            </span>
          </div>
        </div>

      </div>

      {/* 3. OVERALL UTILIZATION PROGRESS BAR */}
      {summary.totalBudgeted > 0 && (
        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <div className="flex items-center space-x-2">
              <PieChart size={16} className="text-indigo-600" />
              <span>Overall Monthly Budget Utilization</span>
            </div>
            <span
              className={`font-black ${
                summary.overallPercentage >= 100
                  ? 'text-rose-600'
                  : summary.overallPercentage >= 80
                  ? 'text-amber-600'
                  : 'text-indigo-600'
              }`}
            >
              {summary.overallPercentage}% Consumed
            </span>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                summary.overallPercentage >= 100
                  ? 'bg-rose-500'
                  : summary.overallPercentage >= 80
                  ? 'bg-amber-500'
                  : 'bg-gradient-to-r from-indigo-500 to-emerald-500'
              }`}
              style={{ width: `${Math.min(100, summary.overallPercentage)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>0%</span>
            <span>50% Target</span>
            <span>80% Warning</span>
            <span>100% Maximum Limit</span>
          </div>
        </div>
      )}

      {/* 4. CATEGORY BUDGETS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal size={18} className="text-slate-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Category Spending Limits
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {budgets.length} {budgets.length === 1 ? 'category configured' : 'categories configured'}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white/60 border border-slate-200/60 rounded-2xl p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : budgets.length === 0 ? (
          /* Subtle, clean notice pointing to the top Add button */
          <div className="py-12 px-6 text-center border-2 border-dashed border-slate-200/80 rounded-2xl bg-white/40 backdrop-blur-xs">
            <p className="text-sm font-semibold text-slate-700">
              No category budgets configured for {formatMonthTitle(selectedMonth)}.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click the <span className="font-semibold text-indigo-600">"+ Set New Budget"</span> button above to add a monthly spending limit.
            </p>
          </div>
        ) : (
          /* Budgets Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {budgets.map((b) => {
              const meta = getCategoryMeta(b.category);
              const progressWidth = Math.min(100, b.percentage);

              // Status badge styling
              let statusLabel = 'On Track';
              let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              let barColor = 'bg-emerald-500';

              if (b.status === 'exceeded') {
                statusLabel = 'Exceeded';
                statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                barColor = 'bg-rose-500';
              } else if (b.status === 'alert') {
                statusLabel = 'Near Limit';
                statusBadgeClass = 'bg-orange-50 text-orange-700 border-orange-200';
                barColor = 'bg-orange-500';
              } else if (b.status === 'warning') {
                statusLabel = 'Warning';
                statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                barColor = 'bg-amber-500';
              }

              return (
                <div
                  key={b._id}
                  className="bg-white/85 backdrop-blur-xl border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  {/* Card Header: Category & Status */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-9 h-9 rounded-xl ${meta.bg} ${meta.text} border ${meta.border} flex items-center justify-center font-bold text-sm shrink-0`}>
                          <Tag size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                            {b.category}
                          </h4>
                          <span className="text-[11px] font-medium text-slate-500">
                            Monthly Limit
                          </span>
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusBadgeClass}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Spend vs Limit Figures */}
                    <div className="mt-4 mb-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-500">Spent:</span>
                        <div className="text-xl font-black text-slate-800 tracking-tight mt-0.5">
                          {formatCurrency(b.spent)}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-slate-500">Cap:</span>
                        <div className="text-sm font-bold text-slate-600 mt-0.5">
                          {formatCurrency(b.monthlyLimit)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 space-y-1.5">
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${progressWidth}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-medium">
                        <span className={b.isOver ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                          {b.percentage}% used
                        </span>
                        <span className={b.isOver ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                          {b.isOver
                            ? `Over by ${formatCurrency(b.overAmount)}`
                            : `${formatCurrency(b.remaining)} left`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Quick Actions */}
                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-slate-400">
                      Target: {selectedMonth}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEditModal(b)}
                        title="Edit limit"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setBudgetToDelete(b)}
                        title="Delete budget"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. UNBUDGETED EXPENSES DISCOVERY SECTION */}
      {unbudgetedCategories.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-amber-800">
            <Sparkles size={18} className="text-amber-600 shrink-0" />
            <h3 className="text-sm font-bold tracking-tight">
              Unbudgeted Spending Detected in {formatMonthTitle(selectedMonth)}
            </h3>
          </div>
          <p className="text-xs text-amber-700">
            You recorded expenses in the following categories without a monthly spending limit. Setting a limit helps keep your overall savings predictable:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {unbudgetedCategories.map((uc) => (
              <button
                key={uc.category}
                onClick={() => handleOpenAddModal(uc.category)}
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-amber-100/60 border border-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <span>{uc.category}:</span>
                <span className="font-bold text-amber-700">{formatCurrency(uc.spent)}</span>
                <Plus size={12} className="text-amber-600 ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. ADD / EDIT BUDGET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {editingBudget ? 'Edit Budget Limit' : 'Set Category Budget'}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Month: {formatMonthTitle(selectedMonth)}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveBudget} className="p-5 sm:p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Category Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Expense Category
                </label>
                <select
                  disabled={Boolean(editingBudget)}
                  value={modalCategory}
                  onChange={(e) => setModalCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-60 cursor-pointer"
                >
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Limit Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Monthly Limit (LKR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    LKR
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="e.g. 35000"
                    value={modalLimit}
                    onChange={(e) => setModalLimit(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center space-x-1.5 mt-2">
                  <span className="text-[10px] font-semibold text-slate-400 mr-1">Presets:</span>
                  {[10000, 25000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setModalLimit(amt.toString())}
                      className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      {amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Month (Readonly reference) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Target Period
                </label>
                <input
                  type="text"
                  readOnly
                  value={formatMonthTitle(selectedMonth)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {modalSubmitting ? 'Saving...' : editingBudget ? 'Update Limit' : 'Save Budget'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. DELETE CONFIRMATION MODAL */}
      {budgetToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm p-6 text-center animate-scale-up space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Remove {budgetToDelete.category} Budget?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This will delete the monthly spending limit of {formatCurrency(budgetToDelete.monthlyLimit)}. Your recorded transactions will not be deleted.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setBudgetToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Keep Budget
              </button>
              <button
                onClick={handleDeleteBudget}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Budgets;
