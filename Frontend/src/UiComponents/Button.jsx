import React from 'react';

const Button = ({ title, type = 'button', onClick, disabled = false }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`text-black bg-linear-to-br from-green-400 to-slate-50 w-fit text-xl py-2 px-4 rounded-2xl cursor-pointer transition-opacity ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
        }`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
