import React, { useState } from 'react';

const FRAMES = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

const ExpenseDateSwitcher = ({ onSwitch, active = 'week' }) => {
  const [selected, setSelected] = useState(active);

  const handleClick = (id) => {
    setSelected(id);
    if (onSwitch) onSwitch(id);
  };

  return (
    <div className='inline-flex items-center p-1 bg-[#131926]/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-md'>
      {FRAMES.map(({ id, label }) => {
        const isCurrent = (active || selected) === id;
        return (
          <button
            key={id}
            type='button'
            onClick={() => handleClick(id)}
            className={`px-3.5 py-1.5 text-xs rounded-lg font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              isCurrent
                ? 'bg-[#00D09C] text-[#0A0E17] shadow-sm shadow-[#00D09C]/30 font-bold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ExpenseDateSwitcher;
