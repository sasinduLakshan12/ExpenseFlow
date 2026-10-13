import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTransactions } from '../services/transactionService';
import { formatCurrency, formatDate } from '../utils/formatters';
import TransactionModal from '../components/TransactionModal';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  PieChart as PieChartIcon,
  BarChart3,
  RefreshCw,
  AlertCircle,
  PiggyBank,
  Sparkles,
  Calendar,
} from 'lucide-react';

// Unified category color palette for the Spending Donut Chart
const CATEGORY_COLORS = {
  'Food & Dining': '#f43f5e', // Rose
  'Rent & Housing': '#f59e0b', // Amber
  'Transportation': '#0ea5e9', // Sky
  'Utilities & Bills': '#8b5cf6', // Violet
  'Entertainment': '#ec4899', // Pink
  'Health & Medical': '#10b981', // Emerald
  'Shopping': '#6366f1', // Indigo
  'Education': '#14b8a6', // Teal
  'Other Expense': '#64748b', // Slate
};

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('expense');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenAddModal = (defaultType = 'expense') => {
    setModalInitialType(defaultType);
    setIsModalOpen(true);
  };

  // Calculations
  const incomeList = transactions.filter((t) => t.type === 'income');
  const expenseList = transactions.filter((t) => t.type === 'expense');

  const totalIncome = incomeList.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const totalExpense = expenseList.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const netBalance = totalIncome - totalExpense;

  // Savings rate calculation
  const savingsRate =
    totalIncome > 0
      ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100 * 10) / 10)
      : 0;

  // Category breakdown for the Donut Chart
  const categoryTotals = {};
  expenseList.forEach((t) => {
    const cat = t.category || 'Other Expense';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount || 0);
  });

  const categoryBreakdown = Object.keys(categoryTotals)
    .map((cat) => ({
      name: cat,
      amount: categoryTotals[cat],
      percent:
        totalExpense > 0
          ? Math.round((categoryTotals[cat] / totalExpense) * 100)
          : 0,
      color: CATEGORY_COLORS[cat] || '#6366f1',
    }))
    .sort((a, b) => b.amount - a.amount);

  // SVG Donut Chart geometry
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.7
  let cumulativePercent = 0;

  // Monthly Overview bar scaling
  const maxBarValue = Math.max(totalIncome, totalExpense, 1);
  const incomeBarHeight = Math.max(8, Math.round((totalIncome / maxBarValue) * 100));
  const expenseBarHeight = Math.max(8, Math.round((totalExpense / maxBarValue) * 100));

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="relative space-y-8">
      {/* Ambient Frosted Glass Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-64 left-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Banner & Header */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            <Sparkles size={14} className="text-indigo-600" />
            <span>Income and Expense Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Take control of your finances with real-time analytics and category insights.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleOpenAddModal('expense')}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all cursor-pointer text-sm"
          >
            <Plus size={16} />
            <span>Add Transaction</span>
          </button>
          <button
            onClick={fetchDashboardData}
            title="Refresh dashboard"
            className="p-2.5 text-slate-400 hover:text-slate-600 bg-white/80 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw size={16} />
          </button>
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
            onClick={fetchDashboardData}
            className="text-xs font-semibold hover:underline cursor-pointer flex items-center space-x-1"
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* 1. TOP 4 GLASS METRIC CARDS (Inspired by clean reference design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Balance */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Total Balance</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {formatCurrency(netBalance)}
            </h3>
          </div>
          <div className="flex items-center text-xs font-medium text-emerald-600 space-x-1">
            <span className={netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
              {netBalance >= 0 ? '↑ Net Positive' : '↓ Net Deficit'}
            </span>
            <span className="text-slate-400">• Available funds</span>
          </div>
        </div>

        {/* Card 2: Monthly Income */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Monthly Income</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl font-extrabold text-sky-600 tracking-tight">
              + {formatCurrency(totalIncome)}
            </h3>
          </div>
          <div className="flex items-center text-xs text-slate-400 space-x-1">
            <Calendar size={13} className="text-slate-400" />
            <span>This month ({incomeList.length} sources)</span>
          </div>
        </div>

        {/* Card 3: Monthly Expenses */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Monthly Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl font-extrabold text-rose-600 tracking-tight">
              - {formatCurrency(totalExpense)}
            </h3>
          </div>
          <div className="flex items-center text-xs text-slate-400 space-x-1">
            <Calendar size={13} className="text-slate-400" />
            <span>This month ({expenseList.length} spends)</span>
          </div>
        </div>

        {/* Card 4: Savings Rate */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Savings Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PiggyBank size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {savingsRate}%
            </h3>
          </div>
          <div className="flex items-center text-xs text-slate-400 space-x-1">
            <span>% of total income retained</span>
          </div>
        </div>

      </div>

      {/* 2. MID SECTION: TWO INTERACTIVE VISUAL ANALYTICS GLASS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Spending by Category (Interactive Donut Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Spending by Category
              </h2>
              <p className="text-xs text-slate-400">Expense distribution across categories</p>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <PieChartIcon size={18} />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-400">Calculating breakdown...</p>
            </div>
          ) : expenseList.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <PieChartIcon size={26} />
              </div>
              <p className="text-sm font-semibold text-slate-600">No expenses recorded yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Add your daily expenses to see an automated category breakdown.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto pt-2">
              
              {/* Pure SVG Donut Chart */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 140 140">
                  {/* Background track circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#f1f5f9"
                    strokeWidth="18"
                    fill="transparent"
                  />
                  {/* Donut Slices */}
                  {categoryBreakdown.map((slice, index) => {
                    const sliceFraction = slice.percent / 100;
                    const strokeDasharray = `${sliceFraction * circumference} ${circumference}`;
                    const strokeDashoffset = -cumulativePercent * circumference;
                    cumulativePercent += sliceFraction;

                    return (
                      <circle
                        key={slice.name}
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke={slice.color}
                        strokeWidth="18"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        fill="transparent"
                        className="transition-all duration-500 hover:opacity-85"
                      />
                    );
                  })}
                </svg>

                {/* Center Donut Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Total Spent
                  </span>
                  <span className="text-sm font-bold text-slate-800 tracking-tight mt-0.5">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>
              </div>

              {/* Category Legend List */}
              <div className="w-full sm:w-auto space-y-2 max-h-48 overflow-y-auto pr-1">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between sm:space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <span className="text-slate-700 font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-right">
                      <span className="font-semibold text-slate-800">{formatCurrency(cat.amount)}</span>
                      <span className="text-slate-400 text-[11px] w-8 text-right font-mono">
                        {cat.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Right Card: Monthly Overview (Comparative Income vs Expense Bar Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Monthly Overview
              </h2>
              <p className="text-xs text-slate-400">Cash Flow: Income vs. Expenses comparison</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Income</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Expenses</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="my-auto pt-4 pb-2">
            <div className="h-44 flex items-end justify-center space-x-10 sm:space-x-16 border-b border-slate-200/80 px-4">
              
              {/* Income Column */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(totalIncome)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-sky-500/20"
                  style={{ height: `${incomeBarHeight}%` }}
                ></div>
                <span className="text-xs font-semibold text-slate-600">Income</span>
              </div>

              {/* Expense Column */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(totalExpense)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-rose-500/20"
                  style={{ height: `${expenseBarHeight}%` }}
                ></div>
                <span className="text-xs font-semibold text-slate-600">Expenses</span>
              </div>

            </div>

            {/* Bottom Status Tag */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">Net Difference:</span>
              <span
                className={`font-bold px-3 py-1 rounded-full ${
                  netBalance >= 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {netBalance >= 0 ? '+ ' : ''}
                {formatCurrency(netBalance)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: RECENT TRANSACTIONS FEED (8 cols) & QUICK ACTIONS (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Recent Activity Feed (8 cols) */}
        <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">Recent Transactions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Your latest 5 financial activities</p>
            </div>
            <Link
              to="/transactions"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-400">Loading activity...</p>
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Receipt size={24} />
              </div>
              <h3 className="text-sm font-semibold text-slate-700">No transactions recorded yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Start tracking your cash flow by adding your first income or expense entry.
              </p>
              <button
                onClick={() => handleOpenAddModal('expense')}
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Plus size={14} />
                <span>Add First Transaction</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentTransactions.map((item) => {
                const isIncome = item.type === 'income';

                return (
                  <div
                    key={item._id}
                    className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isIncome
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-rose-100 text-rose-600'
                        }`}
                      >
                        {isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {formatDate(item.date)} •{' '}
                          <span className="font-medium text-slate-500">{item.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-xs sm:text-sm font-bold ${
                          isIncome ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Quick Action Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Quick Shortcuts</h3>

            <div className="space-y-2.5">
              <button
                onClick={() => handleOpenAddModal('expense')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-rose-200 bg-rose-50/40 hover:bg-rose-50/80 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <TrendingDown size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Add New Expense</p>
                    <p className="text-[11px] text-slate-400">Record bill, groceries, etc.</p>
                  </div>
                </div>
                <Plus size={16} className="text-slate-400 group-hover:text-rose-600" />
              </button>

              <button
                onClick={() => handleOpenAddModal('income')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-sky-200 bg-sky-50/40 hover:bg-sky-50/80 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Add New Income</p>
                    <p className="text-[11px] text-slate-400">Record salary, freelance, etc.</p>
                  </div>
                </div>
                <Plus size={16} className="text-slate-400 group-hover:text-sky-600" />
              </button>

              <Link
                to="/budgets"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50/80 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <PieChartIcon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Monthly Budgets</p>
                    <p className="text-[11px] text-slate-400">Set limits for categories</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Modal for adding transactions */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboardData}
        transactionToEdit={null}
      />
    </div>
  );
};

export default Dashboard;
