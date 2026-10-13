import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTransactions } from '../services/transactionService';
import { formatCurrency, formatDate } from '../utils/formatters';
import TransactionModal from '../components/TransactionModal';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  PieChart as PieChartIcon,
  RefreshCw,
  AlertCircle,
  PiggyBank,
  Calendar,
  Wifi,
  Sparkles,
  CreditCard,
} from 'lucide-react';

// Cohesive, vibrant fintech palette for spending categories
const CATEGORY_COLORS = {
  'Food & Dining': '#f43f5e', // Rose
  'Rent & Housing': '#f59e0b', // Amber
  'Transportation': '#3b82f6', // Royal Blue
  'Utilities & Bills': '#8b5cf6', // Violet
  'Entertainment': '#ec4899', // Pink
  'Health & Medical': '#10b981', // Emerald
  'Shopping': '#06b6d4', // Cyan
  'Education': '#6366f1', // Indigo
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
  const incomeBarHeight = Math.max(10, Math.round((totalIncome / maxBarValue) * 100));
  const expenseBarHeight = Math.max(10, Math.round((totalExpense / maxBarValue) * 100));

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="relative space-y-8 pt-1">
      {/* Ambient Soft Frosted Glass Background Lights */}
      <div className="absolute top-[-30px] left-[10%] w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
      <div className="absolute top-[140px] right-[5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
      <div className="absolute top-[480px] left-[25%] w-[450px] h-[450px] bg-emerald-400/8 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      {/* Top Welcome Header */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Real-time balance, categorized spending, and cash flow overview.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleOpenAddModal('expense')}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Plus size={16} />
            <span>Add Transaction</span>
          </button>
          <button
            onClick={fetchDashboardData}
            title="Refresh dashboard"
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
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

      {/* 1. HERO SECTION: REAL VISA METALLIC CARD + INCOME/EXPENSE SIDE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: AUTHENTIC REAL VISA METALLIC DEBIT CARD (Obsidian Titanium - No Blue) */}
        <div className="lg:col-span-5 flex">
          <div className="w-full bg-gradient-to-br from-zinc-900 via-neutral-900 to-black rounded-3xl p-6 sm:p-7 text-white shadow-2xl shadow-black/30 border border-white/15 relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            {/* Metallic Sheen Reflections */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Card Header: Brand & Contactless Icon */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black tracking-widest uppercase text-zinc-300">
                  ExpenseFlow
                </span>
                <span className="text-[10px] font-semibold text-zinc-400 border border-zinc-700 px-1.5 py-0.2 rounded">
                  PLATINUM
                </span>
              </div>
              <Wifi size={20} className="text-zinc-300 rotate-90" />
            </div>

            {/* EMV Golden Chip & Balance Display */}
            <div className="my-3 relative z-10 space-y-3">
              {/* Golden EMV Chip */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-yellow-600 border border-amber-500/50 shadow-inner flex items-center justify-center p-1">
                <div className="w-full h-full border border-amber-800/40 rounded-xs grid grid-cols-2 gap-0.5">
                  <div className="border-r border-b border-amber-800/40"></div>
                  <div className="border-b border-amber-800/40"></div>
                  <div className="border-r border-amber-800/40"></div>
                  <div></div>
                </div>
              </div>

              {/* Total Balance on Card */}
              <div>
                <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                  Total Net Balance
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-0.5">
                  {formatCurrency(netBalance)}
                </h2>
              </div>
            </div>

            {/* Card Footer: Cardholder, Number & VISA Logo */}
            <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">
                  •••• 4050
                </p>
                <p className="text-xs font-bold text-zinc-200 tracking-wider uppercase">
                  {user?.name || 'Sasindu Lakshan'}
                </p>
              </div>

              {/* VISA Logo */}
              <div className="text-right">
                <span className="font-serif italic font-black text-2xl tracking-tighter text-white">
                  VISA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INCOME, EXPENSE & SAVINGS METRICS (Grouped together for clarity) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4.5">
          
          {/* Card 1: Total Income (Vibrant Emerald) */}
          <div className="bg-white/80 backdrop-blur-xl border border-emerald-100/90 hover:border-emerald-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Total Income</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="my-2.5">
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                + {formatCurrency(totalIncome)}
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-medium text-slate-600 space-x-1.5">
              <Calendar size={13} className="text-slate-500" />
              <span>This Month ({incomeList.length} recorded {incomeList.length === 1 ? 'deposit' : 'deposits'})</span>
            </div>
          </div>

          {/* Card 2: Total Expenses (Vibrant Rose/Coral) */}
          <div className="bg-white/80 backdrop-blur-xl border border-rose-100/90 hover:border-rose-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Total Expenses</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                <TrendingDown size={18} />
              </div>
            </div>
            <div className="my-2.5">
              <h3 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
                - {formatCurrency(totalExpense)}
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-medium text-slate-600 space-x-1.5">
              <Calendar size={13} className="text-slate-500" />
              <span>This Month ({expenseList.length} spending {expenseList.length === 1 ? 'entry' : 'entries'})</span>
            </div>
          </div>

          {/* Card 3: Savings Rate */}
          <div className="bg-white/80 backdrop-blur-xl border border-purple-100/90 hover:border-purple-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Savings Rate</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                <PiggyBank size={18} />
              </div>
            </div>
            <div className="my-2.5">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {savingsRate}%
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Retained from income</span>
              <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">
                {savingsRate >= 20 ? 'Optimal' : 'Building'}
              </span>
            </div>
          </div>

          {/* Card 4: Net Cash Flow Status */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Cash Flow Health</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  netBalance >= 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {netBalance >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
            <div className="my-2.5">
              <h4
                className={`text-xl font-bold tracking-tight ${
                  netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {netBalance >= 0 ? '+' : ''} {formatCurrency(netBalance)}
              </h4>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs font-medium text-slate-500">
              {netBalance >= 0 ? 'You are within a positive cash margin' : 'Expenses currently exceed total income'}
            </div>
          </div>

        </div>

      </div>

      {/* 2. MID SECTION: TWO INTERACTIVE VISUAL ANALYTICS GLASS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Spending by Category (Interactive Donut Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Spending by Category
              </h2>
              <p className="text-xs font-medium text-slate-500">Distribution of your monthly expenditures</p>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <PieChartIcon size={18} />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs font-medium text-slate-500">Calculating breakdown...</p>
            </div>
          ) : expenseList.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <PieChartIcon size={26} />
              </div>
              <p className="text-sm font-semibold text-slate-700">No expenses recorded yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                Add your daily expenses to see an automated category breakdown.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto pt-2">
              
              {/* Pure SVG Donut Chart with Bold Center */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 140 140">
                  {/* Background track circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="18"
                    fill="transparent"
                  />
                  {/* Donut Slices */}
                  {categoryBreakdown.map((slice) => {
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

                {/* Center Donut Label (High Contrast) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                    Total Spent
                  </span>
                  <span className="text-base font-black text-slate-900 tracking-tight mt-0.5">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>
              </div>

              {/* Category Legend List (High Contrast & Clear) */}
              <div className="w-full sm:w-auto space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between sm:space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <span className="text-slate-800 font-semibold">{cat.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-right">
                      <span className="font-bold text-slate-900">{formatCurrency(cat.amount)}</span>
                      <span className="text-indigo-700 font-bold text-[11px] bg-indigo-50 px-1.5 py-0.5 rounded-md font-mono border border-indigo-100/60">
                        {cat.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Right Card: Monthly Overview (Comparative Bar Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Monthly Overview
              </h2>
              <p className="text-xs font-medium text-slate-500">Cash Flow: Total Income vs Total Expenses</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Income</span>
              </span>
              <span className="flex items-center space-x-1.5 font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Expenses</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="my-auto pt-4 pb-2">
            <div className="h-44 flex items-end justify-center space-x-12 sm:space-x-20 border-b border-slate-200 px-4">
              
              {/* Income Column (Emerald / Teal Gradient) */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-emerald-600 opacity-90 transition-opacity">
                  {formatCurrency(totalIncome)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-emerald-600/25"
                  style={{ height: `${incomeBarHeight}%` }}
                ></div>
                <span className="text-xs font-bold text-slate-700">Income</span>
              </div>

              {/* Expense Column (Rose / Coral Gradient) */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-rose-600 opacity-90 transition-opacity">
                  {formatCurrency(totalExpense)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-rose-600/25"
                  style={{ height: `${expenseBarHeight}%` }}
                ></div>
                <span className="text-xs font-bold text-slate-700">Expenses</span>
              </div>

            </div>

            {/* Bottom Status Tag */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-semibold">Net Cash Flow:</span>
              <span
                className={`font-bold px-3 py-1 rounded-full text-xs ${
                  netBalance >= 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-rose-50 text-rose-700 border border-rose-300'
                }`}
              >
                {netBalance >= 0 ? '+ ' : ''}
                {formatCurrency(netBalance)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: RECENT TRANSACTIONS (Spacious Full-Width Ledger View) */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Recent Transactions</h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Your latest financial activity ledger</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleOpenAddModal('expense')}
              className="inline-flex items-center space-x-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-indigo-100"
            >
              <Plus size={14} />
              <span>New Entry</span>
            </button>
            <Link
              to="/transactions"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs font-medium text-slate-500">Loading activity...</p>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
              <Receipt size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">No transactions recorded yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
              Start tracking your cash flow by recording your first income or expense entry.
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
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {formatDate(item.date)} •{' '}
                        <span className="font-semibold text-slate-700">{item.category}</span>
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
