import React from 'react';
import { NavLink } from 'react-router';

function Header() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-xs font-bold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-[#00D09C] text-[#0A0E17] shadow-lg shadow-[#00D09C]/25'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header className="w-full bg-[#0A0E17]/85 backdrop-blur-xl border-b border-white/[0.08] sticky top-0 z-40 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D09C] to-[#059669] flex items-center justify-center shadow-lg shadow-[#00D09C]/20">
            {/* Hexagon / Bee Rocket Logo */}
            <svg
              className="w-5 h-5 text-[#0A0E17]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.3L18 8.8v6.4l-6 3.3-6-3.3V8.8l6-3.5z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              coin<span className="text-[#00D09C]">Bee</span>
            </h1>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden md:flex items-center p-1 bg-[#131926]/90 border border-white/10 rounded-full shadow-inner">
          <NavLink to="/" end className={navLinkClass}>
            Expenses
          </NavLink>
          <NavLink to="/income" className={navLinkClass}>
            Income
          </NavLink>
          <NavLink to="/budget" className={navLinkClass}>
            Budgets
          </NavLink>
        </nav>

        {/* Right Status & Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse"></span>
            <span>Live Sync</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#151C2C] border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300">
            CB
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
