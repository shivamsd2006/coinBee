import React from 'react';

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className='flex flex-col w-full text-left'>
      <label
        htmlFor={id}
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between'
      >
        <span>{label || id}</span>
        {required && <span className='text-[#00D09C] text-[10px] lowercase'>required</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#0B0F19] text-slate-100 border border-white/10 focus:border-[#00D09C] focus:ring-2 focus:ring-[#00D09C]/20 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 outline-none placeholder:text-slate-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
