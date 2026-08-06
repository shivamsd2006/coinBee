import { useState, useEffect } from 'react';
import IncomeForm from '../IncomeForm/IncomeForm';
import Button from '../../UiComponents/Button';
import IncomeTypeSwitcher from '../../UiComponents/IncomeTypeSwitcher';

const Income = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [activeType, setActiveType] = useState('all');


  function loadIncome(type) {
    fetch(`http://localhost:5000/api/incomeRoutes/read?type=${type}`)
      .then(r => r.json())
      .then(data => setIncomeData(data))
      .catch(err => console.error('Income fetch failed:', err));
  }


  useEffect(() => {
    loadIncome(activeType);
  }, [activeType]);


  function handleTypeSwitch(type) {
    setActiveType(type);
  }

  return (
    <div className='h-[80%] w-full flex flex-col items-center justify-center gap-4 relative'>


      <div className='absolute right-5 top-8'>
        <IncomeTypeSwitcher activeType={activeType} onSwitch={handleTypeSwitch} />
      </div>


      <div className='flex flex-col w-[80%] h-[60vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>

        {incomeData.length === 0 ? (

          <div className='flex items-center justify-center h-full text-gray-500'>
            No income recorded
          </div>
        ) : (

          incomeData.map(({ date, entries }) => (
            <div key={date} className='mb-4'>


              <div className='text-sm text-gray-400 px-3 py-1 mb-1'>
                {new Date(date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>


              {entries.map(entry => (
                <div
                  key={entry.depositId}
                  className=' bg-linear-to-br from-green-400 to-slate-50 w-full mb-2 shrink-0 flex justify-between  items-center px-4 py-3 rounded-xl'>

                  <div className='flex flex-col'>
                    <span className='text-sm font-semibold text-gray-800'>
                      {entry.Type?.name ?? 'Income'}
                    </span>
                    {entry.description && (
                      <span className='text-xs text-gray-500'>{entry.description}</span>
                    )}
                  </div>

          
                  <span className='text-base font-bold text-green-600'>
                    +₹{entry.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

            </div>
          ))
        )}
      </div>

      
      {isClicked && (
        <div className='w-[352px] h-[450px] bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center absolute bottom-0 rounded-xl'>
      
          <IncomeForm savedData={() => loadIncome(activeType)} />
        </div>
      )}

      <div className='flex justify-center items-center h-[10%] w-[10%] absolute bottom-0'>
        <Button title='Income' onClick={() => setIsClicked(prev => !prev)} />
      </div>

    </div>
  );
};

export default Income;