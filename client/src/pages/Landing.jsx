import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Wifi,
  Sparkles,
  ShieldCheck,
  PieChart,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Ambient Gradient Background Glow Orbs for Glassmorphism */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-60 right-10 w-[450px] h-[450px] bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Subtle Dot Matrix Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-[calc(100vh-8rem)] flex items-center pt-4 pb-10 sm:pt-6 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Call to Action */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-50/90 backdrop-blur-md border border-indigo-200/60 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-xs">
                <Sparkles size={14} className="text-indigo-600" />
                <span>Next-Gen Personal Expense & Budget Tracker</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Track Every Rupee.{' '}
                <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  Achieve Financial Freedom.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A clean, distraction-free financial dashboard built for everyday clarity. Enforce monthly category spending limits, track cash flow in real-time, and take total command of your finances in Sri Lankan Rupees (LKR).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
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
              <div className="pt-6 sm:pt-7 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Free & Private</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">LKR</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Local Currency</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">Zero</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Ads or Fees</p>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Frosted Glass Application Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-lg relative">
                
                {/* Floating Outer Glass Container Frame */}
                <div className="bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(79,_70,_229,_0.1)] rounded-3xl p-5 sm:p-6 space-y-4 relative">
                  
                  {/* Mockup Window Titlebar with Mac-style controls */}
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100/80">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 ml-2">ExpenseFlow Live Ledger</span>
                    </div>
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Synced (LKR)</span>
                    </span>
                  </div>

                  {/* Top Row: Mini Cash Inflow & Luxury Obsidian Visa Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Glass Mini Income Stats Card */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Monthly Inflow</span>
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                          +18.4%
                        </span>
                      </div>
                      <div className="my-2">
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">LKR 125,000</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Active Revenue Stream</p>
                      </div>
                      {/* Sparkline Graphic */}
                      <div className="h-6 w-full">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24">
                          <path
                            d="M0 20 Q 25 10, 50 14 T 100 2"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Authentic Obsidian Metallic Visa Card */}
                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 rounded-2xl p-4 text-white shadow-md border border-slate-700/50 flex flex-col justify-between relative overflow-hidden min-h-[150px]">
                      {/* Metallic Sheen Reflections */}
                      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] font-black tracking-widest uppercase text-slate-200">
                            EXPENSEFLOW
                          </span>
                          <span className="text-[8px] font-bold border border-slate-600 bg-slate-800/80 px-1 py-0.2 rounded text-slate-300">
                            PLATINUM
                          </span>
                        </div>
                        <Wifi size={14} className="text-slate-400 rotate-90" />
                      </div>

                      {/* Golden EMV Chip & Net Balance */}
                      <div className="my-1.5 relative z-10 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Net Balance</p>
                          <h4 className="text-lg font-bold tracking-tight text-white mt-0.5">LKR 84,500.00</h4>
                        </div>
                        {/* Realistic Golden Chip */}
                        <div className="w-7 h-5 rounded-sm bg-gradient-to-tr from-amber-200 via-amber-400 to-yellow-600 border border-amber-500/50 flex items-center justify-center p-0.5 shadow-2xs">
                          <div className="w-full h-full border border-amber-900/40 rounded-2xs grid grid-cols-2 gap-0.5">
                            <div className="border-r border-b border-amber-900/30"></div>
                            <div className="border-b border-amber-900/30"></div>
                            <div className="border-r border-amber-900/30"></div>
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
                        <span className="text-[10px] tracking-wider">•••• 4050</span>
                        <span className="text-[10px] uppercase font-black tracking-wider text-slate-200">VISA</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Budget Safeguard Bar Widget */}
                  <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700">Monthly Budget Allowance</span>
                      <span className="font-bold text-emerald-600">42% Used • Safe</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[42%]"></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                      <span>Spent: LKR 40,500</span>
                      <span>Limit: LKR 95,000</span>
                    </div>
                  </div>

                  {/* Transactions Ledger Container */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Recent Transactions</h4>
                        <p className="text-[10px] text-slate-400">Real-time ledger updates</p>
                      </div>
                      <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                        Categorized
                      </span>
                    </div>

                    {/* Transaction Rows */}
                    <div className="space-y-2">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <ArrowDownLeft size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Monthly Salary</p>
                            <p className="text-[10px] text-slate-400">Oct 10 • Salary</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">+ LKR 125,000</span>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <ArrowUpRight size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Keells Supermarket</p>
                            <p className="text-[10px] text-slate-400">Oct 11 • Food & Dining</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-600">- LKR 18,200</span>
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <ArrowUpRight size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">CEB Electricity Bill</p>
                            <p className="text-[10px] text-slate-400">Oct 12 • Utilities & Bills</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-600">- LKR 7,500</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="py-5 border-t border-slate-200/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 p-1.5">
              <ShieldCheck className="text-emerald-600 shrink-0" size={18} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Zero Ads or Data Selling</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-1.5">
              <PieChart className="text-indigo-600 shrink-0" size={18} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Category Budget Limits</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-1.5">
              <TrendingUp className="text-purple-600 shrink-0" size={18} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Live Cash Flow Analytics</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-1.5">
              <CreditCard className="text-amber-600 shrink-0" size={18} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Native LKR Formatting</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MINIMAL CLEAN FOOTER */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-100">
        <p>&copy; {new Date().getFullYear()} ExpenseFlow. Personal Wealth & Budget Tracker.</p>
      </footer>
    </div>
  );
};

export default Landing;
