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
  Zap,
  PieChart,
  Wallet,
  CheckCircle2,
  Lock,
  Layers,
  ChevronRight,
  Sliders,
  DollarSign,
  BarChart3,
  Calendar,
  Tag,
  AlertTriangle,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Ambient Gradient Background Glow Orbs for Glassmorphism */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-72 right-10 w-[450px] h-[450px] bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-[1200px] left-10 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Subtle Dot Matrix Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center py-10 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Call to Action */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-50/90 backdrop-blur-md border border-indigo-200/60 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-xs">
                <Sparkles size={14} className="text-indigo-600" />
                <span>Next-Gen Personal Expense & Budget Tracker</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Master Your Money.{' '}
                <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  Build Lasting Wealth.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A clean, distraction-free financial dashboard built for everyday clarity. Enforce monthly category spending limits, track cash flow in real-time, and take total command of your finances in Sri Lankan Rupees (LKR).
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

              {/* Key Trust Metrics (Replaced dev jargon with user-facing trust signals) */}
              <div className="pt-6 sm:pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Free & Private</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">LKR</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Local Currency</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">256-Bit</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Data Privacy</p>
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

                    {/* Authentic Obsidian Metallic Visa Card (Matches actual dashboard theme) */}
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
      <section className="py-6 border-y border-slate-200/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 p-2">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Zero Ads or Data Selling</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-2">
              <PieChart className="text-indigo-600 shrink-0" size={20} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Category Budget Limits</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-2">
              <TrendingUp className="text-purple-600 shrink-0" size={20} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Live Cash Flow Analytics</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-2">
              <CreditCard className="text-amber-600 shrink-0" size={20} />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Native LKR Formatting</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3-Step Seamless Financial Workflow) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How ExpenseFlow Puts You in Control
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            No complex accounting spreadsheets. Just a clean, straightforward workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/80 shadow-xs relative hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm shadow-indigo-600/30">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Set Category Budgets</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Decide how much you want to spend each month on Food, Utilities, Transport, and Shopping. Assign custom limits in LKR.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-indigo-600 font-semibold">
              <span>Automatic remaining allowances</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/80 shadow-xs relative hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm shadow-purple-600/30">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Log Daily Expenses</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Pick your category and enter the amount. Add optional merchant notes like "Keells" or "Uber" in a 3-second modal form.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-purple-600 font-semibold">
              <span>Instant auto-categorization</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/80 shadow-xs relative hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm shadow-emerald-600/30">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Protect Your Wealth</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Watch your live cash flow bar charts update automatically. Get visual warnings before you exceed category thresholds.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
              <span>Color-coded alert thresholds</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DUAL FEATURE SPOTLIGHT (Replacing repetitive text cards with rich visual previews) */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-100/50 via-indigo-50/20 to-transparent border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Spotlight 1: Category Budgeting Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Precision Budgeting
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Never Wonder Where Your Money Went Again.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional expense trackers only tell you what you spent in the past. ExpenseFlow pairs every expense with a proactive monthly budget limit so you know exactly how much you have left to spend today.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong className="text-slate-900">Remaining Allowance:</strong> Instantly see remaining balance per category after every supermarket run or bill payment.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong className="text-slate-900">Overspending Warnings:</strong> Dynamic progress indicators shift to amber at 80% and rose when limits are exceeded.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong className="text-slate-900">Monthly Archives:</strong> Navigate past months with seamless `YYYY-MM` month selectors.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Card Mockup for Feature 1 */}
            <div className="lg:col-span-6 bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm text-slate-800">Monthly Category Spending Limits</h4>
                <span className="text-xs font-semibold text-slate-500">October 2026</span>
              </div>
              
              {/* Category 1 */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Food & Dining</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    LKR 8,500 Left (Safe)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[66%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Spent: LKR 16,500</span>
                  <span>Limit: LKR 25,000</span>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Transportation</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px]">
                    86% Limit Reached (Warning)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[86%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Spent: LKR 12,900</span>
                  <span>Limit: LKR 15,000</span>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Utilities & Bills</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    45% Used (Safe)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[45%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Spent: LKR 9,000</span>
                  <span>Limit: LKR 20,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spotlight 2: Executive Visa Hub & Cash Flow Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Visual Card Mockup for Feature 2 */}
            <div className="lg:col-span-6 order-2 lg:order-1 bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Cash Flow Balance Matrix</h4>
                  <p className="text-[11px] text-slate-400">Total monthly revenue vs outgoing expenses</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  + Net Surplus
                </span>
              </div>

              {/* Chart Columns Preview */}
              <div className="h-36 flex items-end justify-center space-x-12 border-b border-slate-100 pb-2">
                <div className="flex flex-col items-center space-y-1.5 h-full justify-end">
                  <span className="text-[11px] font-bold text-emerald-600">LKR 125,000</span>
                  <div className="w-12 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl h-[85%] shadow-sm"></div>
                  <span className="text-xs font-semibold text-slate-600">Total Income</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 h-full justify-end">
                  <span className="text-[11px] font-bold text-rose-600">LKR 40,500</span>
                  <div className="w-12 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl h-[35%] shadow-sm"></div>
                  <span className="text-xs font-semibold text-slate-600">Total Expenses</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-medium">Net Retained Cash Flow:</span>
                <span className="font-bold text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  + LKR 84,500.00
                </span>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Financial Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Authentic Visa Debit Card & Unified Financial View.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Experience an executive-grade dashboard designed for quick decision making. Your net balance, inflow streams, and categorized spendings are consolidated into one unified screen.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong className="text-slate-900">Card Skin Switcher:</strong> Personalize your balance card with authentic Obsidian, Platinum, or Emerald finishes.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong className="text-slate-900">Instant Keyword Filtering:</strong> Search, filter by Income/Expense or Category with zero page reload.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. COMPARISON / WHY EXPENSEFLOW SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              Why ExpenseFlow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">
              Built Different From Bloated Financial Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                ✕
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Cluttered Spreadsheets</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prone to broken formulas, tedious to update on mobile devices, and zero automated overspending warnings.
              </p>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                ✕
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Ad-Heavy Banking Apps</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filled with credit card promotions, foreign currency limitations, and rigid slow interfaces.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-indigo-500/40 p-6 rounded-2xl space-y-2.5 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <h4 className="font-bold text-white text-sm">ExpenseFlow</h4>
              <p className="text-xs text-indigo-200/90 leading-relaxed">
                100% Free, zero ads, native LKR currency support, and live category budget protection designed for pure speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) BANNER */}
      <section className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden border border-indigo-800/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight relative z-10">
            Take the First Step Toward Financial Clarity
          </h2>
          <p className="text-indigo-200/80 text-sm sm:text-base max-w-lg mx-auto mt-3 mb-8 relative z-10 font-normal">
            Join ExpenseFlow today and start tracking your income, expenses, and monthly category budgets with zero clutter.
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
              <span>Sign In to Your Vault</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PROFESSIONAL FOOTER */}
      <footer className="border-t border-slate-200/80 py-10 bg-white/70 backdrop-blur-md mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-lg bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">
              EF
            </span>
            <span className="font-bold text-slate-800 text-sm">ExpenseFlow</span>
            <span className="text-slate-300">|</span>
            <span>Personal Wealth & Budget Management</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/login" className="hover:text-indigo-600 transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-indigo-600 transition-colors">Register</Link>
            <span>Sri Lanka (LKR)</span>
          </div>

          <div>
            <p>&copy; {new Date().getFullYear()} ExpenseFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
