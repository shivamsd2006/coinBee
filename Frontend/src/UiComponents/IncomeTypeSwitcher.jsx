import React from 'react';

const TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Salary', value: 'Salary' },
  { label: 'Deposit', value: 'Deposit' },
  { label: 'Part Time', value: 'Part Time' },
  { label: 'Other', value: 'Other' },
];

const IncomeTypeSwitcher = ({ activeType = 'all', onSwitch }) => {
  return (
    <div className='inline-flex items-center p-1 bg-[#131926]/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-md gap-1'>
      {TYPES.map(({ label, value }) => {
        const isCurrent = activeType === value;
        return (
          <button
            key={value}
            type='button'
            onClick={() => onSwitch(value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              isCurrent
                ? 'bg-[#00D09C] text-[#0A0E17] font-bold shadow-sm shadow-[#00D09C]/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default IncomeTypeSwitcher;
