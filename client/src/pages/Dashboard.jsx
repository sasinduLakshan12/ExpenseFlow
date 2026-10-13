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
  RefreshCw,
  AlertCircle,
  PiggyBank,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';

// Cohesive, executive fintech palette for Spending categories
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
  const incomeBarHeight = Math.max(8, Math.round((totalIncome / maxBarValue) * 100));
  const expenseBarHeight = Math.max(8, Math.round((totalExpense / maxBarValue) * 100));

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="relative space-y-8 pt-2">
      {/* Ambient Soft Frosted Glass Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-72 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Welcome Header */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 shadow-2xs">
            <Sparkles size={13} className="text-indigo-600" />
            <span>Personal Wealth & Cash Flow Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Live overview of your earnings, expenditures, and monthly category breakdown.
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
            className="p-2.5 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
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

      {/* 1. TOP 4 HARMONIZED EXECUTIVE GLASS STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Balance (The Signature Dark Glass Hero Card) */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-5 shadow-lg shadow-slate-950/20 relative overflow-hidden flex flex-col justify-between border border-slate-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200/90">
              Total Net Balance
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/10 text-indigo-300 flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>

          <div className="my-3 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {formatCurrency(netBalance)}
            </h3>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
            <span
              className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                netBalance >= 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {netBalance >= 0 ? '↑ Net Positive' : '↓ Cash Deficit'}
            </span>
            <span className="text-[11px] text-slate-400">Available Funds</span>
          </div>
        </div>

        {/* Card 2: Monthly Income (Cohesive Emerald Green) */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 hover:border-emerald-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Income</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
              + {formatCurrency(totalIncome)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-slate-400 space-x-1.5">
            <Calendar size={13} className="text-slate-400" />
            <span>This Month ({incomeList.length} recorded {incomeList.length === 1 ? 'deposit' : 'deposits'})</span>
          </div>
        </div>

        {/* Card 3: Monthly Expenses (Cohesive Rose/Coral Red) */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 hover:border-rose-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
              - {formatCurrency(totalExpense)}
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-slate-400 space-x-1.5">
            <Calendar size={13} className="text-slate-400" />
            <span>This Month ({expenseList.length} spending {expenseList.length === 1 ? 'entry' : 'entries'})</span>
          </div>
        </div>

        {/* Card 4: Savings Rate (Cohesive Indigo / Royal Violet) */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 hover:border-indigo-200 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Savings Rate</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <PiggyBank size={16} />
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {savingsRate}%
            </h3>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Of monthly income saved</span>
            <span className="font-semibold text-indigo-600 text-[11px]">
              {savingsRate >= 20 ? 'Optimal' : 'Building'}
            </span>
          </div>
        </div>

      </div>

      {/* 2. MID SECTION: TWO INTERACTIVE VISUAL ANALYTICS GLASS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Spending by Category (Interactive Donut Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
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
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
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

        {/* Right Card: Monthly Overview (Harmonious Emerald Income vs Rose Expense Bar Chart) - 6 cols */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Monthly Overview
              </h2>
              <p className="text-xs text-slate-400">Cash Flow: Income vs. Expenses comparison</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Income</span>
              </span>
              <span className="flex items-center space-x-1.5 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Expenses</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="my-auto pt-4 pb-2">
            <div className="h-44 flex items-end justify-center space-x-12 sm:space-x-20 border-b border-slate-200/80 px-4">
              
              {/* Income Column (Emerald / Teal Gradient) */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(totalIncome)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-emerald-600/20"
                  style={{ height: `${incomeBarHeight}%` }}
                ></div>
                <span className="text-xs font-semibold text-slate-700">Income</span>
              </div>

              {/* Expense Column (Rose / Coral Gradient) */}
              <div className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-xs font-bold text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(totalExpense)}
                </span>
                <div
                  className="w-14 sm:w-16 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl transition-all duration-700 shadow-sm shadow-rose-600/20"
                  style={{ height: `${expenseBarHeight}%` }}
                ></div>
                <span className="text-xs font-semibold text-slate-700">Expenses</span>
              </div>

            </div>

            {/* Bottom Status Tag */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Net Monthly Cash Flow:</span>
              <span
                className={`font-bold px-3 py-1 rounded-full text-xs ${
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

      {/* 3. BOTTOM SECTION: RECENT TRANSACTIONS (Full-width clean ledger view, no redundant shortcuts) */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Recent Transactions</h2>
            <p className="text-xs text-slate-400 mt-0.5">Your latest financial activities</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleOpenAddModal('expense')}
              className="inline-flex items-center space-x-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
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
            <p className="text-xs text-slate-400">Loading activity...</p>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
              <Receipt size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">No transactions recorded yet</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
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
          <div className="divide-y divide-slate-100/80">
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
