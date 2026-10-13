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
  Shield,
  Coffee,
  ShoppingBag,
  Zap,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center py-6 lg:py-12">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-2xs">
              <Sparkles size={14} className="text-indigo-600" />
              <span>Smart Financial Tracking</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Take Control of Your{' '}
              <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Financial Future.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Secure, simple, and smart financial tracker designed to help you monitor income, manage daily expenses, and build wealth with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-98 cursor-pointer text-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-full border border-slate-200 transition-all shadow-2xs hover:border-slate-300 cursor-pointer text-sm"
              >
                <span>Sign In</span>
              </Link>
            </div>

            {/* Bottom Proof Metrics */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 gap-6 max-w-sm mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Free & Open Source</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">Bank-Grade</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">JWT & bcrypt Security</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Floating UI Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md sm:max-w-lg space-y-4 relative">
              
              {/* Top Row: Mini Income Card & Debit Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Mini Income Stats Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Total Income</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      +14%
                    </span>
                  </div>
                  <div className="my-3">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">LKR 85,000</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">This month</p>
                  </div>
                  {/* Subtle Sparkline SVG */}
                  <div className="h-8 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                      <path
                        d="M0 25 Q 25 15, 50 18 T 100 5"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Modern Credit / Debit Card Widget */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl p-5 text-white shadow-xl shadow-indigo-500/25 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                  {/* Card Light Reflect */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-xs font-semibold tracking-wider uppercase text-indigo-200">
                      ExpenseFlow
                    </span>
                    <Wifi size={16} className="text-indigo-200 rotate-90" />
                  </div>

                  <div className="my-3 relative z-10">
                    <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-medium">Available Balance</p>
                    <h4 className="text-xl font-bold tracking-tight mt-0.5">LKR 60,500.00</h4>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-indigo-100 relative z-10">
                    <span>•••• 4050</span>
                    <span className="text-[10px] uppercase font-semibold text-white/90">VISA</span>
                  </div>
                </div>
              </div>

              {/* Transactions List Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/60">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Recent Transactions</h4>
                    <p className="text-[11px] text-slate-400">Live account activity</p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                    View all
                  </span>
                </div>

                {/* Transaction Rows */}
                <div className="space-y-3">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <ArrowDownLeft size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Salary Deposit</p>
                        <p className="text-[10px] text-slate-400">Oct 10 • Income</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">+ LKR 85,000.00</span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <ShoppingBag size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Supermarket Groceries</p>
                        <p className="text-[10px] text-slate-400">Oct 11 • Food & Dining</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600">- LKR 14,500.00</span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Electricity Bill</p>
                        <p className="text-[10px] text-slate-400">Oct 11 • Utilities</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600">- LKR 6,200.00</span>
                  </div>

                  {/* Row 4 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Coffee size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Coffee & Snacks</p>
                        <p className="text-[10px] text-slate-400">Oct 11 • Entertainment</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600">- LKR 1,800.00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
