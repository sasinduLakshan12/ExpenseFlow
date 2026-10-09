import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">
              EF
            </div>
            <Link to="/" className="text-xl font-bold text-slate-800 tracking-tight">
              Expense<span className="text-blue-600">Flow</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <Receipt size={18} />
              <span>Transactions</span>
            </NavLink>
            <NavLink
              to="/budgets"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <Wallet size={18} />
              <span>Budgets</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
