import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome to ExpenseFlow 👋</h1>
        <p className="text-slate-600">
          Track your income, expenses, and monthly budget efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
          <p className="text-sm font-medium text-emerald-600">Total Income</p>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1">LKR 0.00</h3>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl">
          <p className="text-sm font-medium text-rose-600">Total Expenses</p>
          <h3 className="text-2xl font-bold text-rose-700 mt-1">LKR 0.00</h3>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
          <p className="text-sm font-medium text-blue-600">Total Balance</p>
          <h3 className="text-2xl font-bold text-blue-700 mt-1">LKR 0.00</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
