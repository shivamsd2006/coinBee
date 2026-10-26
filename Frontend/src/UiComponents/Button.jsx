import React from 'react';

const Button = ({
  title,
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold text-sm tracking-wide rounded-xl px-5 py-2.5 cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-[#00D09C] to-[#05B386] hover:from-[#00E5AC] hover:to-[#00D09C] text-[#0A0E17] shadow-lg shadow-[#00D09C]/20 hover:shadow-[#00D09C]/35',
    secondary: 'bg-[#151C2C] hover:bg-[#1E273D] text-slate-200 border border-white/10 hover:border-white/20 shadow-md',
    outline: 'bg-transparent hover:bg-white/5 text-[#00D09C] border border-[#00D09C]/40 hover:border-[#00D09C]',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-400 hover:text-white',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {title || children}
    </button>
  );
};

export default Button;
