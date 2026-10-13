import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  // User initials for avatar
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-2 rounded-xl font-bold shadow-xs">
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

          {/* Right Section: Professional User Profile Dropdown or Auth Links */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Pill Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 pl-1.5 pr-3 py-1 rounded-full transition-all cursor-pointer shadow-2xs hover:border-slate-300"
                >
                  {/* Avatar Circle with Initial */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {userInitial}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Professional Frosted Glass Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                        {userInitial}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Account Status Badge */}
                    <div className="px-4 py-2 bg-indigo-50/50 mx-2 my-1.5 rounded-xl flex items-center justify-between text-[11px] text-indigo-700 font-medium">
                      <span className="flex items-center space-x-1">
                        <ShieldCheck size={13} className="text-indigo-600" />
                        <span>Secure Account</span>
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                        Active
                      </span>
                    </div>

                    {/* Menu Navigation Links */}
                    <div className="py-1">
                      <Link
                        to="/"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-slate-400" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/transactions"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Receipt size={15} className="text-slate-400" />
                        <span>Transactions</span>
                      </Link>
                      <Link
                        to="/budgets"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Wallet size={15} className="text-slate-400" />
                        <span>Budgets</span>
                      </Link>
                    </div>

                    {/* Divider & Logout Button */}
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/70 transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={15} />
                        <span>Sign Out of Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
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

            {/* Mobile Hamburger Toggle (When Logged In) */}
            {user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
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
