const TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Salary', value: 'Salary' },
  { label: 'Deposit', value: 'Deposit' },
  { label: 'Part Time', value: 'Part Time' },
  { label: 'Other', value: 'Other' },
];

const IncomeTypeSwitcher = ({ activeType, onSwitch }) => {
  return (
    <div className='h-[40px] bg-linear-to-br from-green-400 to-slate-50 rounded-xl p-1 flex items-center justify-center'>
      <div className='bg-[#FFF5EE] rounded-xl flex justify-evenly gap-1 w-full h-[37px] items-center px-1'>
        {TYPES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onSwitch(value)}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer
              ${activeType === value
                ? 'bg-green-400 text-white'
                : 'text-gray-700 hover:text-green-600'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IncomeTypeSwitcher;