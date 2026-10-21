import { useState } from 'react';
import Input  from '../../src/UiComponents/Input';
import Button from '../../src/UiComponents/Button';
import API_BASE_URL from '../../src/config/api';

const IncomeForm = ({ savedData }) => {
  const [income,       setIncome]       = useState('');
  const [description,  setDescription]  = useState('');
  const [type,         setType]         = useState('1');
  const [date,         setDate]         = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!date || !income) {
      setErrorMessage('Please fill in Amount and Date');
      return;
    }

    const body = {
      Income:      Number(income),
      Description: description,
      Type:        type,
      Date:        date,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/incomeRoutes/add`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (response.ok) {
        setIncome('');
        setDescription('');
        setDate('');
        setType('1');
        if (savedData) savedData();
      } else {
        let errText = `Server responded with ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) errText = errData.error;
        } catch {
          // not JSON
        }
        setErrorMessage(errText);
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
      className='bg-[#FFF5EE] flex flex-col w-[345px] rounded-xl mt-2 mb-2 mx-2 p-8 shadow-xl'
    >
      <h4 className='text-gray-800 font-semibold text-xl mb-2'>Add Income</h4>

      {errorMessage && (
        <div className='bg-red-100 border border-red-300 text-red-700 px-3 py-1.5 rounded-lg text-xs mb-2'>
          {errorMessage}
        </div>
      )}

      <div className='mt-2'>
        <Input id='Amount' type='number' value={income}
          onChange={e => setIncome(e.target.value)} />
      </div>
      <div className='mt-2'>
        <Input id='Description' type='text' value={description}
          onChange={e => setDescription(e.target.value)} />
      </div>
      <div className='mt-2'>
        <Input id='Date' type='date' value={date}
          onChange={e => setDate(e.target.value)} />
      </div>

      <label htmlFor='type' className='text-gray-500 mt-2 mb-1'>Type</label>
      <select
        id='type'
        value={type}
        onChange={e => setType(e.target.value)}
        className='text-gray-600 text-base border-2 border-gray-300 rounded-xl p-2'
      >
        <option value='1'>Salary</option>
        <option value='2'>Deposit</option>
        <option value='3'>Part Time</option>
        <option value='4'>Other</option>
      </select>

      <div className='mt-4 flex justify-center'>
        <Button title={isSubmitting ? 'Adding...' : 'Add'} type='submit' />
      </div>
    </form>
  );
};

export default IncomeForm;
