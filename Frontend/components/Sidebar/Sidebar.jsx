import React from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
  const tabClass = ({ isActive }) =>
    `flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-gradient-to-r from-[#00D09C] to-[#05B386] text-[#0A0E17] shadow-lg shadow-[#00D09C]/25'
        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
    }`;

  return (
    <div className='w-full max-w-md my-4 px-4 flex justify-center md:hidden'>
      <nav className='inline-flex items-center p-1.5 bg-[#131926]/90 border border-white/10 rounded-full shadow-xl backdrop-blur-md gap-1'>
        <NavLink to='/' end className={tabClass}>
          <span>Expenses</span>
        </NavLink>
        <NavLink to='/income' className={tabClass}>
          <span>Income</span>
        </NavLink>
        <NavLink to='/budget' className={tabClass}>
          <span>Budgets</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
