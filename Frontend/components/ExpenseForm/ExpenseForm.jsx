import { useState } from 'react';
import Button from '../../src/UiComponents/Button';
import Input from '../../src/UiComponents/Input';

const ExpenseForm = ({ savedData, onClose }) => {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('1');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!date || !expense) {
      setErrorMessage('Please fill in Amount and Date');
      return;
    }

    const [year, month, day] = date.split('-').map(Number);
    const jsDateObject = new Date(year, month - 1, day);
    const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const formattedDayOfWeek = weekdayFormatter.format(jsDateObject);
    const formattedMonth = monthFormatter.format(jsDateObject);

    const user = {
      Expense: Number(expense),
      Description: description,
      DayName: formattedDayOfWeek,
      MonthName: formattedMonth,
      Date: date,
      Category: category,
    };

    sendData(user);
  };

  async function sendData(data) {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/expenseRoutes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && !result.error && typeof result !== 'string') {
        setSuccessMessage('Expense added successfully!');
        setExpense('');
        setDescription('');
        setDate('');
        setCategory('1');

        if (savedData) savedData();

        setTimeout(() => {
          setSuccessMessage('');
          if (onClose) onClose();
        }, 900);
      } else {
        const err = result?.error || (typeof result === 'string' ? result : `Server responded with ${response.status}`);
        setErrorMessage(err);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md'
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <form
        onSubmit={formData}
        className='bg-[#131926] border border-white/10 flex flex-col w-full max-w-sm rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-fadeIn'
      >
        {/* Glow accent */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-[#00D09C]/10 blur-2xl pointer-events-none rounded-full' />

        {/* Header */}
        <div className='flex justify-between items-center mb-3 relative z-10'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs text-[#00D09C] font-bold'>
              -₹
            </div>
            <h4 className='text-white font-bold text-lg tracking-tight'>Add Expense</h4>
          </div>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              className='text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer'
              aria-label='Close form'
            >
              ✕
            </button>
          )}
        </div>

        {/* Feedback Banners */}
        {errorMessage && (
          <div className='bg-rose-500/15 border border-rose-500/30 text-rose-300 px-3 py-2 rounded-xl text-xs mb-3 flex items-center gap-1.5'>
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className='bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-2 rounded-xl text-xs mb-3 flex items-center gap-1.5'>
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Inputs */}
        <div className='space-y-3 relative z-10'>
          <Input
            id='Amount'
            type='number'
            label='Amount (₹)'
            placeholder='0.00'
            required
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />

          <Input
            id='Description'
            type='text'
            label='Description (Optional)'
            placeholder='e.g., Grocery run, Starbucks'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            id='Date'
            type='date'
            label='Date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className='flex flex-col text-left'>
            <label htmlFor='category' className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5'>
              Category
            </label>
            <select
              className='w-full bg-[#0B0F19] text-slate-100 border border-white/10 focus:border-[#00D09C] focus:ring-2 focus:ring-[#00D09C]/20 rounded-xl px-4 py-2.5 text-sm transition-all outline-none cursor-pointer'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='1'>Groceries</option>
              <option value='2'>Travel</option>
              <option value='3'>Clothes</option>
              <option value='4'>Food</option>
              <option value='5'>EMI</option>
              <option value='6'>Entertainment</option>
              <option value='7'>Pet</option>
              <option value='8'>Housing</option>
              <option value='9'>Saloon</option>
              <option value='10'>Gifts</option>
              <option value='11'>Fuel</option>
              <option value='12'>Gadgets</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className='mt-5 relative z-10'>
          <Button
            title={isSubmitting ? 'Adding Expense...' : 'Add Expense'}
            type='submit'
            disabled={isSubmitting}
            className='w-full py-3'
          />
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
