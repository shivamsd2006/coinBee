import React from 'react';

const Footer = () => {
  return (
    <footer className='w-full border-t border-white/[0.06] py-5 px-4 mt-auto bg-[#0A0E17]/60 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500'>
        <div className='flex items-center gap-2'>
          <span className='font-bold text-slate-400'>coinBee</span>
          <span>•</span>
          <span>Personal Finance Intelligence</span>
        </div>
        <div className='flex items-center gap-4 text-slate-500'>
          <span>Bank-Grade 256-bit Encryption</span>
          <span>•</span>
          <span className='text-[#00D09C]'>System Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
