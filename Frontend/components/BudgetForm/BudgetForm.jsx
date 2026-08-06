import { useState } from 'react';
import Input  from '../../UiComponents/Input';
import Button from '../../UiComponents/Button';

const BudgetForm = ({ savedData }) => {
  const [amount,      setAmount]      = useState('');
  const [description, setDescription] = useState('');
  const [categoryId,  setCategoryId]  = useState('1');
  const [startDate,   setStartDate]   = useState('');
  const [endDate,     setEndDate]     = useState('');

  const formData = async (e) => {
    e.preventDefault();
    if (!amount || !startDate || !endDate) {
      alert('Amount, Start Date, and End Date are required');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert('End date must be after start date');
      return;
    }

    const body = {
      Amount:      Number(amount),
      Description: description,
      CategoryId:  Number(categoryId),
      StartDate:   startDate,
      EndDate:     endDate,
    };

    try {
      const response = await fetch('http://localhost:5000/api/budgetRoutes/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (response.ok) {
        setAmount('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setCategoryId('1');
        if (savedData) savedData();
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
      className='bg-[#FFF5EE] flex flex-col w-[350px] rounded-xl mt-2 mb-2 mx-2 p-8'
    >
      <h4 className='text-gray-800 font-semibold text-xl mb-2'>Set Budget</h4>

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
        <Button title='Add Budget' type='submit' />
      </div>
    </form>
  );
};

export default BudgetForm;