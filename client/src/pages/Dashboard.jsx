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

// Luxury Physical Visa Card Styles (Balanced with light/frosted fintech palette - NO blue)
const CARD_THEMES = {
  platinum: {
    id: 'platinum',
    name: 'Platinum Silver',
    wrapper: 'bg-gradient-to-br from-slate-100 via-zinc-200 to-slate-300 border border-slate-300/90 text-slate-800 shadow-md shadow-slate-300/40',
    sheen: 'from-white/70 via-transparent to-white/20',
    headerText: 'text-slate-800',
    badge: 'border-slate-400/60 bg-white/70 text-slate-700',
    wifi: 'text-slate-600',
    balanceLabel: 'text-slate-500',
    balanceText: 'text-slate-900',
    footerNum: 'text-slate-500',
    footerName: 'text-slate-800',
    visaLogo: 'text-slate-900',
    chipBorder: 'border-amber-700/40',
    dot: 'bg-slate-300 border-slate-400',
    desc: 'Light Brushed Titanium'
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Slate',
    wrapper: 'bg-gradient-to-br from-slate-900 via-slate-850 to-zinc-900 border border-slate-700/70 text-white shadow-lg shadow-slate-950/25',
    sheen: 'from-white/10 via-transparent to-white/5',
    headerText: 'text-zinc-200',
    badge: 'border-zinc-700 bg-zinc-800/80 text-zinc-300',
    wifi: 'text-zinc-300',
    balanceLabel: 'text-zinc-400',
    balanceText: 'text-white',
    footerNum: 'text-zinc-400',
    footerName: 'text-zinc-200',
    visaLogo: 'text-white',
    chipBorder: 'border-amber-500/50',
    dot: 'bg-zinc-800 border-zinc-600',
    desc: 'Deep Charcoal Slate'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Signature',
    wrapper: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 text-emerald-50 shadow-lg shadow-emerald-950/25',
    sheen: 'from-emerald-400/10 via-transparent to-emerald-200/5',
    headerText: 'text-emerald-200',
    badge: 'border-emerald-700/80 bg-emerald-900/60 text-emerald-300',
    wifi: 'text-emerald-300',
    balanceLabel: 'text-emerald-300/70',
    balanceText: 'text-white',
    footerNum: 'text-emerald-300/80',
    footerName: 'text-emerald-100',
    visaLogo: 'text-white',
    chipBorder: 'border-amber-500/60',
    dot: 'bg-emerald-900 border-emerald-600',
    desc: 'Deep Forest & Gold'
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Card Theme State (Platinum Silver default for clean harmony with white UI)
  const [cardTheme, setCardTheme] = useState(() => localStorage.getItem('ef_card_theme') || 'platinum');
  const activeTheme = CARD_THEMES[cardTheme] || CARD_THEMES.platinum;

  const handleThemeChange = (themeId) => {
    setCardTheme(themeId);
    localStorage.setItem('ef_card_theme', themeId);
  };

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

      {/* 1. HERO SECTION: BALANCED REAL VISA CARD + GROUPED CASH FLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: REAL VISA CARD (4 cols - Exact same width as each card on the right) */}
        <div className="lg:col-span-4 flex flex-col">
          {/* Card Header & Chic Style Switcher */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Primary Card
            </span>
            <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-500 mr-0.5">Style:</span>
              {Object.values(CARD_THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  title={`${t.name} (${t.desc})`}
                  className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer border ${t.dot} ${
                    cardTheme === t.id ? 'ring-2 ring-indigo-500 ring-offset-1 scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Authentic Real Visa Card (Realistic credit card aspect ratio ~1.58 : 1, no bloating) */}
          <div
            className={`w-full max-w-[360px] mx-auto lg:mx-0 h-[218px] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${activeTheme.wrapper}`}
          >
            {/* Metallic Sheen Reflections */}
            <div className={`absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br ${activeTheme.sheen} rounded-full blur-2xl pointer-events-none`}></div>

            {/* Card Header: Brand & Contactless Icon */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-black tracking-widest uppercase ${activeTheme.headerText}`}>
                  ExpenseFlow
                </span>
                <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded ${activeTheme.badge}`}>
                  {cardTheme === 'emerald' ? 'SIGNATURE' : 'PLATINUM'}
                </span>
              </div>
              <Wifi size={17} className={`${activeTheme.wifi} rotate-90`} />
            </div>

            {/* Golden Chip & Net Balance */}
            <div className="my-auto relative z-10 space-y-1.5">
              <div className="flex items-center justify-between">
                {/* Golden EMV Chip */}
                <div className={`w-9 h-6.5 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-yellow-600 border ${activeTheme.chipBorder} shadow-inner flex items-center justify-center p-0.5`}>
                  <div className="w-full h-full border border-amber-800/40 rounded-xs grid grid-cols-2 gap-0.5">
                    <div className="border-r border-b border-amber-800/40"></div>
                    <div className="border-b border-amber-800/40"></div>
                    <div className="border-r border-amber-800/40"></div>
                    <div></div>
                  </div>
                </div>
                <span className="text-[9px] font-mono tracking-wider opacity-60">DEBIT</span>
              </div>

              <div>
                <p className={`text-[10px] uppercase font-bold tracking-wider ${activeTheme.balanceLabel}`}>
                  Total Net Balance
                </p>
                <h2 className={`text-2xl sm:text-[25px] font-black tracking-tight mt-0.5 ${activeTheme.balanceText}`}>
                  {formatCurrency(netBalance)}
                </h2>
              </div>
            </div>

            {/* Card Footer: Cardholder, Number & VISA Logo */}
            <div className="flex items-end justify-between relative z-10 pt-2 border-t border-black/5 dark:border-white/10">
              <div className="space-y-0.5">
                <p className={`text-[10px] uppercase font-mono tracking-wider ${activeTheme.footerNum}`}>
                  •••• 4050
                </p>
                <p className={`text-xs font-bold tracking-wider uppercase ${activeTheme.footerName}`}>
                  {user?.name || 'Sasindu Lakshan'}
                </p>
              </div>

              {/* VISA Logo */}
              <div className="text-right">
                <span className={`font-serif italic font-black text-2xl tracking-tighter ${activeTheme.visaLogo}`}>
                  VISA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GROUPED METRICS (8 cols total, 2x2 grid = 4 cols each, matching card width) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Total Income (Emerald) */}
          <div className="bg-white/85 backdrop-blur-xl border border-emerald-100 hover:border-emerald-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Total Income</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="my-2">
              <h3 className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                + {formatCurrency(totalIncome)}
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-medium text-slate-500 space-x-1.5">
              <Calendar size={12} className="text-slate-400" />
              <span>This Month ({incomeList.length} recorded {incomeList.length === 1 ? 'deposit' : 'deposits'})</span>
            </div>
          </div>

          {/* Card 2: Total Expenses (Rose) */}
          <div className="bg-white/85 backdrop-blur-xl border border-rose-100 hover:border-rose-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Total Expenses</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                <TrendingDown size={16} />
              </div>
            </div>
            <div className="my-2">
              <h3 className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
                - {formatCurrency(totalExpense)}
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-medium text-slate-500 space-x-1.5">
              <Calendar size={12} className="text-slate-400" />
              <span>This Month ({expenseList.length} spending {expenseList.length === 1 ? 'entry' : 'entries'})</span>
            </div>
          </div>

          {/* Card 3: Savings Rate */}
          <div className="bg-white/85 backdrop-blur-xl border border-purple-100 hover:border-purple-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Savings Rate</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                <PiggyBank size={16} />
              </div>
            </div>
            <div className="my-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                {savingsRate}%
              </h3>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>Retained from income</span>
              <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[10px]">
                {savingsRate >= 20 ? 'Optimal' : 'Building'}
              </span>
            </div>
          </div>

          {/* Card 4: Cash Flow Health */}
          <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Cash Flow Health</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  netBalance >= 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {netBalance >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
            <div className="my-2">
              <h4
                className={`text-lg sm:text-xl font-bold tracking-tight ${
                  netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {netBalance >= 0 ? `+ ${formatCurrency(netBalance)}` : formatCurrency(netBalance)}
              </h4>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500">
              {netBalance >= 0 ? 'Positive cash surplus margin' : 'Expenses currently exceed total income'}
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
          <div className="p-10 text-center space-y-2">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-1">
              <Receipt size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">No transactions recorded yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
              Start tracking your cash flow by recording your first income or expense entry with the "+ New Entry" button above.
            </p>
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
