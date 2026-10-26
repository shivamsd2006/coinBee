import { useState } from 'react';
import Input  from '../../src/UiComponents/Input';
import Button from '../../src/UiComponents/Button';

const BudgetForm = ({ savedData, onClose }) => {
  const [amount,         setAmount]         = useState('');
  const [description,    setDescription]    = useState('');
  const [categoryId,     setCategoryId]     = useState('1');
  const [startDate,      setStartDate]      = useState('');
  const [endDate,        setEndDate]        = useState('');
  const [errorMessage,   setErrorMessage]   = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting,   setIsSubmitting]   = useState(false);

  const formData = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!amount || !startDate || !endDate) {
      setErrorMessage('Amount, Start Date, and End Date are required');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setErrorMessage('End date must be after start date');
      return;
    }

    const body = {
      Amount:      Number(amount),
      Description: description,
      CategoryId:  Number(categoryId),
      StartDate:   startDate,
      EndDate:     endDate,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/budgetRoutes/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && !result.error && typeof result !== 'string') {
        setSuccessMessage('✅ Budget set successfully!');
        setAmount('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setCategoryId('1');

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
  };

  return (
    <form
      onSubmit={formData}
      className='bg-[#FFF5EE] flex flex-col w-[350px] rounded-xl mt-2 mb-2 mx-2 p-7 shadow-xl relative'
    >
      <div className='flex justify-between items-center mb-2'>
        <h4 className='text-gray-800 font-semibold text-xl'>Set Budget</h4>
        {onClose && (
          <button
            type='button'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-700 text-lg font-bold p-1 leading-none'
            aria-label='Close form'
          >
            ✕
          </button>
        )}
      </div>

      {errorMessage && (
        <div className='bg-red-100 border border-red-300 text-red-700 px-3 py-1.5 rounded-lg text-xs mb-2'>
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className='bg-green-100 border border-green-300 text-green-700 px-3 py-1.5 rounded-lg text-xs mb-2'>
          {successMessage}
        </div>
      )}

      <div className='mt-2'>
        <Input id='Amount' type='number' value={amount}
          onChange={e => setAmount(e.target.value)} />
      </div>
      <div className='mt-2'>
        <Input id='Description' type='text' value={description}
          onChange={e => setDescription(e.target.value)} />
      </div>
      <div className='mt-2'>
        <Input id='Start Date' type='date' value={startDate}
          onChange={e => setStartDate(e.target.value)} />
      </div>
      <div className='mt-2'>
        <Input id='End Date' type='date' value={endDate}
          onChange={e => setEndDate(e.target.value)} />
      </div>

      <label htmlFor='category' className='text-gray-500 mt-2 mb-1'>Category</label>
      <select
        id='category'
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        className='text-gray-600 border-2 border-gray-300 rounded-xl p-2'
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

      <div className='mt-4 flex justify-center'>
        <Button title={isSubmitting ? 'Saving...' : 'Add Budget'} type='submit' />
      </div>
    </form>
  );
};

export default BudgetForm;
