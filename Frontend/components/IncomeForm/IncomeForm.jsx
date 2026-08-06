import { useState } from 'react';
import Input  from '../../UiComponents/Input';
import Button from '../../UiComponents/Button';

const IncomeForm = ({ savedData }) => {
  const [income,      setIncome]      = useState('');
  const [description, setDescription] = useState('');
  const [type,        setType]        = useState('1');
  const [date,        setDate]        = useState('');

  const formData = async (e) => {
    e.preventDefault();
    if (!date || !income) {
      alert('Please fill in Amount and Date');
      return;
    }

    const body = {
      Income:      Number(income),
      Description: description,
      Type:        type,   // sends name string — backend connects by name
      Date:        date,
    };

    try {
      const response = await fetch('http://localhost:5000/api/incomeRoutes/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Created income:', result);
        setIncome('');
        setDescription('');
        setDate('');
        setType('Salary');
        if (savedData) savedData();  // triggers Income to re-fetch list
      } else {
        const err = await response.json();
        alert(err.error ?? 'Something went wrong');
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  return (
    <form
      onSubmit={formData}
      className='bg-[#FFF5EE] flex flex-col w-[345px] rounded-xl mt-2 mb-2 mx-2 p-8'
    >
      <h4 className='text-gray-800 font-semibold text-xl mb-2'>Add Income</h4>

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
        <Button title='Add' type='submit' />
      </div>
    </form>
  );
};

export default IncomeForm;