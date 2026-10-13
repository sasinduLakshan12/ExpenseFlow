import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Menu,
  X,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold shadow-xs">
              EF
            </div>
            <Link to="/" className="text-xl font-bold text-slate-800 tracking-tight">
              Expense<span className="text-indigo-600">Flow</span>
            </Link>
          </div>

          {/* Desktop Nav Links (When Logged In) */}
          {user && (
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
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
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
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
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                <Wallet size={18} />
                <span>Budgets</span>
              </NavLink>
            </div>
          )}

          {/* User Profile / Auth Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/60">
                  <User size={15} className="text-indigo-600" />
                  <span className="truncate max-w-[120px]">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>

                {/* Mobile Hamburger Toggle (Logged In) */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="Toggle Navigation"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <LogIn size={15} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm shadow-indigo-500/25 hover:shadow-indigo-500/35"
                >
                  <UserPlus size={15} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown (When Logged In) */}
        {user && mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1 animate-in fade-in duration-150">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/transactions"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Receipt size={18} />
              <span>Transactions</span>
            </NavLink>
            <NavLink
              to="/budgets"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Wallet size={18} />
              <span>Budgets</span>
            </NavLink>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500 font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-xs text-rose-600 font-semibold py-1.5 px-2 hover:bg-rose-50 rounded-lg cursor-pointer"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
