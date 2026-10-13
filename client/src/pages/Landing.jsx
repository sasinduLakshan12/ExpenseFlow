import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  CreditCard,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Wifi,
  Sparkles,
  ShieldCheck,
  Coffee,
  ShoppingBag,
  Zap,
  PieChart,
  Wallet,
  CheckCircle2,
  Lock,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient Gradient Background Glow Orbs for Glassmorphism */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Subtle Dot Matrix Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Actions */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-50/90 backdrop-blur-md border border-indigo-200/60 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-xs">
                <Sparkles size={14} className="text-indigo-600 animate-pulse" />
                <span>Smart Personal Expense & Budget Tracker</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Take Control of Your{' '}
                <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  Financial Future.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Effortlessly monitor your daily expenses, track income streams, and stay on top of monthly category budgets with real-time financial insights.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:scale-98 cursor-pointer text-sm"
                >
                  <span>Get Started Free</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/80 hover:bg-white text-slate-700 font-semibold px-8 py-3.5 rounded-full border border-slate-200/90 backdrop-blur-md transition-all shadow-xs hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  <span>Sign In</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-6 sm:pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Free & Open</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">LKR</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Local Currency</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">JWT</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Bank-Grade Auth</p>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Frosted Glass Mockup Container */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-lg relative">
                
                {/* Floating Outer Glass Container Frame */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(79,_70,_229,_0.09)] rounded-3xl p-5 sm:p-6 space-y-4 relative">
                  
                  {/* Floating Glass Pill Status Badge */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-xs font-bold text-slate-700">ExpenseFlow Dashboard</span>
                    </div>
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      Live Overview
                    </span>
                  </div>

                  {/* Top Row: Mini Income Stats & Fintech Visa Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Glass Mini Income Stats Card */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4.5 border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Total Income</span>
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                          +14.8%
                        </span>
                      </div>
                      <div className="my-2.5">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">LKR 85,000</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Monthly Cash Flow</p>
                      </div>
                      {/* Sparkline Graphic */}
                      <div className="h-7 w-full">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 28">
                          <path
                            d="M0 24 Q 25 12, 50 16 T 100 4"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Modern Gradient Debit Card Widget */}
                    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 rounded-2xl p-4.5 text-white shadow-lg shadow-indigo-600/20 flex flex-col justify-between relative overflow-hidden min-h-[155px]">
                      {/* Subtle Glass Card Reflect Overlay */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none"></div>

                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-200">
                          ExpenseFlow
                        </span>
                        <Wifi size={15} className="text-indigo-200 rotate-90" />
                      </div>

                      <div className="my-2 relative z-10">
                        <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-medium">Available Balance</p>
                        <h4 className="text-xl font-bold tracking-tight mt-0.5">LKR 60,500.00</h4>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-indigo-100 relative z-10">
                        <span>•••• 4050</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white">VISA</span>
                      </div>
                    </div>
                  </div>

                  {/* Transactions List Glass Container */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">Recent Activity</h4>
                        <p className="text-[11px] text-slate-400">Live categorized transactions</p>
                      </div>
                      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        Automated
                      </span>
                    </div>

                    {/* Transaction Rows */}
                    <div className="space-y-2.5">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <ArrowDownLeft size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Monthly Salary</p>
                            <p className="text-[10px] text-slate-400">Oct 10 • Income</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">+ LKR 85,000</span>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <ShoppingBag size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Supermarket Groceries</p>
                            <p className="text-[10px] text-slate-400">Oct 11 • Food & Dining</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-600">- LKR 14,500</span>
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Zap size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Electricity Bill</p>
                            <p className="text-[10px] text-slate-400">Oct 11 • Utilities</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-600">- LKR 6,200</span>
                      </div>

                      {/* Row 4 */}
                      <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <Coffee size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Coffee & Snacks</p>
                            <p className="text-[10px] text-slate-400">Oct 12 • Entertainment</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-600">- LKR 1,800</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES SECTION (Tailored directly to Expense & Budget Tracker) */}
      <section className="py-12 sm:py-20 border-t border-slate-200/60 bg-gradient-to-b from-transparent via-indigo-50/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Everything You Need to Master Your Personal Finances
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Designed specifically for clean, accurate, and stress-free money management.
            </p>
          </div>

          {/* 3 Core Pillar Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Expense & Income Tracking */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Wallet size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Income & Expense Tracking
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Log daily transactions with one click. Categorize expenditures into Food, Utilities, Transport, and Entertainment with Sri Lankan Rupee (LKR) formatting.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Real-time keyword search & filtering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Custom notes & date selectors</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Smart Monthly Budgeting */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <PieChart size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Monthly Category Budgets
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Set monthly spending limits for individual categories. Track progress with color-coded bars and avoid unexpected budget blowouts.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Category-wise budget allocations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Overspending warning indicators</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Live Analytics & Security */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Bank-Grade Security
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Protected by industry-standard JWT authentication and bcrypt password hashing. Your financial records are strictly isolated to your private account.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Zero unauthorized data sharing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Multi-tenant encrypted database</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FINAL CALL TO ACTION (CTA) BANNER */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight relative z-10">
              Start Tracking Your Finances in Seconds
            </h2>
            <p className="text-indigo-200/80 text-sm sm:text-base max-w-lg mx-auto mt-3 mb-8 relative z-10 font-normal">
              Join ExpenseFlow today and take total control over your income, daily expenses, and future wealth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md shadow-indigo-500/30 hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>Create Free Account</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>Sign In to Existing Account</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
