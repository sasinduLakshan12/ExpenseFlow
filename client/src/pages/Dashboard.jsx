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
  PieChart,
  RefreshCw,
  AlertCircle,
  PiggyBank,
  Sparkles,
} from 'lucide-react';

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

  // Financial Health Metrics
  const savingsRate =
    totalIncome > 0
      ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100))
      : 0;

  const expenseRatio =
    totalIncome > 0 ? Math.min(Math.round((totalExpense / totalIncome) * 100), 100) : 0;

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            <span>Financial Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here is your live financial activity and net balance summary for this month.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleOpenAddModal('expense')}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-500/25 transition-all cursor-pointer text-sm"
          >
            <Plus size={16} />
            <span>Add Transaction</span>
          </button>
          <button
            onClick={fetchDashboardData}
            title="Refresh dashboard"
            className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
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

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Net Total Balance Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md shadow-indigo-950/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Total Net Balance
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
              <Wallet size={20} />
            </div>
          </div>

          <div className="my-4 relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {formatCurrency(netBalance)}
            </h2>
            <p className="text-xs text-indigo-200/80 mt-1 font-medium">
              {netBalance >= 0 ? 'Surplus / Available Funds' : 'Deficit / Needs Attention'}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-200/90 relative z-10">
            <span>Savings Rate:</span>
            <span className="font-bold text-white">{savingsRate}% of Income</span>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Income
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="my-4">
            <h2 className="text-3xl font-extrabold text-emerald-600 tracking-tight">
              + {formatCurrency(totalIncome)}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              From {incomeList.length} recorded income {incomeList.length === 1 ? 'source' : 'sources'}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Avg per Income:</span>
            <span className="font-semibold text-slate-700">
              {incomeList.length > 0
                ? formatCurrency(totalIncome / incomeList.length)
                : 'LKR 0.00'}
            </span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Expenses
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown size={20} />
            </div>
          </div>

          <div className="my-4">
            <h2 className="text-3xl font-extrabold text-rose-600 tracking-tight">
              - {formatCurrency(totalExpense)}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Across {expenseList.length} spending {expenseList.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Avg per Expense:</span>
            <span className="font-semibold text-slate-700">
              {expenseList.length > 0
                ? formatCurrency(totalExpense / expenseList.length)
                : 'LKR 0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* Cashflow Spend Ratio Progress Bar */}
      {totalIncome > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Income Utilization (Cash Flow Ratio)
            </span>
            <span className="font-bold text-slate-600">
              {expenseRatio}% Spent ({formatCurrency(totalExpense)} of {formatCurrency(totalIncome)})
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                expenseRatio > 85
                  ? 'bg-rose-500'
                  : expenseRatio > 60
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${expenseRatio}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Two Column Section: Recent Activity & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Transactions Feed (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
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
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-slate-400">Loading live data...</p>
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
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isIncome
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-rose-100 text-rose-600'
                        }`}
                      >
                        {isIncome ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatDate(item.date)} •{' '}
                          <span className="font-medium text-slate-500">{item.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
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

        {/* Right Column: Quick Shortcuts & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Quick Actions</h3>

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
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/80 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Add New Income</p>
                    <p className="text-[11px] text-slate-400">Record salary, freelance, etc.</p>
                  </div>
                </div>
                <Plus size={16} className="text-slate-400 group-hover:text-emerald-600" />
              </button>

              <Link
                to="/budgets"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50/80 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <PieChart size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Manage Budgets</p>
                    <p className="text-[11px] text-slate-400">Set limits for categories</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600" />
              </Link>
            </div>
          </div>

          {/* Financial Tip Card */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50 rounded-2xl border border-indigo-100/80 p-5 shadow-xs">
            <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs mb-1.5">
              <PiggyBank size={16} />
              <span>Smart Money Tip</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Keeping your expenses under 70% of total income helps you build an emergency fund faster. Check your Budgets regularly to stay on target!
            </p>
          </div>
        </div>
      </div>

      {/* Reusable Modal for adding transactions directly from Dashboard */}
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
