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
  Coins,
  BadgeCheck,
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
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold shadow-sm shadow-indigo-600/20 text-sm">
              EF
            </div>
            <Link to="/" className="text-xl font-extrabold text-slate-800 tracking-tight">
              Expense<span className="text-indigo-600">Flow</span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Crisp & High-Contrast) */}
          {user && (
            <div className="hidden md:flex items-center space-x-1.5 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/50">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                <Receipt size={15} />
                <span>Transactions</span>
              </NavLink>
              <NavLink
                to="/budgets"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                <Wallet size={15} />
                <span>Budgets</span>
              </NavLink>
            </div>
          )}

          {/* Right Section: Executive Profile Dropdown or Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Pill Trigger Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-200 pl-1.5 pr-3 py-1 rounded-full transition-all cursor-pointer shadow-2xs hover:border-slate-300"
                >
                  {/* Avatar Circle with Status Indicator */}
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-indigo-50">
                      {userInitial}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {/* Executive Frosted Glass Profile Dropdown (New Distinct Features, No Redundant Links) */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                    
                    {/* 1. User Header & Avatar */}
                    <div className="flex items-center space-x-3 p-2 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 ring-2 ring-indigo-100">
                        {userInitial}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center space-x-1.5">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user.name}</p>
                          <BadgeCheck size={14} className="text-indigo-600 shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* 2. Distinct Account Features & Settings (No repeated navbar links!) */}
                    <div className="space-y-1.5 text-xs">
                      
                      {/* Currency Preference Feature */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5 text-slate-600">
                          <Coins size={15} className="text-amber-500" />
                          <span className="font-medium">Currency</span>
                        </div>
                        <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
                          LKR (Rs)
                        </span>
                      </div>

                      {/* Security Status Feature */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5 text-slate-600">
                          <ShieldCheck size={15} className="text-emerald-500" />
                          <span className="font-medium">Security</span>
                        </div>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                          JWT Protected
                        </span>
                      </div>

                      {/* Account Plan / Type */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5 text-slate-600">
                          <User size={15} className="text-indigo-500" />
                          <span className="font-medium">Account Type</span>
                        </div>
                        <span className="font-semibold text-slate-600 text-[11px]">
                          Personal Tier
                        </span>
                      </div>

                    </div>

                    {/* 3. Divider & Logout Action Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100/80 text-rose-600 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut size={14} />
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
