import { useState, useEffect } from 'react';
import BudgetForm from '../BudgetForm/BudgetForm';
import Button from '../../UiComponents/Button';


const BAR_COLORS = {
  ok: '#4ade80',   
  full: '#3b82f6',  
  exceeded: '#ef4444',   
};

const BAR_BG = {
  ok: 'rgba(74,222,128,0.15)',
  full: 'rgba(59,130,246,0.15)',
  exceeded: 'rgba(239,68,68,0.15)',
};

const Budget = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [budgetData, setBudgetData] = useState([]);

  function loadBudgets() {
    fetch('http://localhost:5000/api/budgetRoutes/read')
      .then(r => r.json())
      .then(data => setBudgetData(data))
      .catch(err => console.error('Budget fetch failed:', err));
  }

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <div className='h-[80%] w-full flex flex-wrap justify-around shrink-0 overflow-y-auto relative pb-20'>

      {budgetData.length === 0 ? (
        <div className='flex items-center justify-center w-full h-40 text-gray-500'>
          No budgets set yet. Click "Budget" to add one.
        </div>
      ) : (
        budgetData.map((budget) => {
          
          const barWidth = Math.min(budget.percentageSpent, 100);
          const color = BAR_COLORS[budget.status];
          const bgColor = BAR_BG[budget.status];

          return (
            <div
              key={budget.budgetId}
              className='h-[300px] w-[420px] rounded-xl my-5 flex flex-col justify-between p-6'
              style={{
                background: 'white',
                border: '0.5px solid rgba(212,168,67,0.2)',
              }}
            >
              {/* Top — category name + description */}
              <div>
                <p className='text-xl font-semibold text-white'>
                  {budget.categoryName}
                </p>
                {budget.description && (
                  <p className='text-sm text-gray-400 mt-1'>{budget.description}</p>
                )}
                <p className='text-xs text-gray-500 mt-1'>
                  {new Date(budget.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {' — '}
                  {new Date(budget.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Middle — amounts */}
              <div className='flex justify-between items-end'>
                <div>
                  <p className='text-xs text-gray-500'>Spent</p>
                  <p className='text-2xl font-bold' style={{ color }}>
                    ₹{budget.amountSpent.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-gray-500'>Budget</p>
                  <p className='text-lg text-gray-300'>
                    ₹{budget.allocatedAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Bottom — progress bar */}
              <div>
                {/* percentage label */}
                <div className='flex justify-between mb-1'>
                  <span className='text-xs text-gray-500'>
                    {budget.percentageSpent}% used
                  </span>
                  {budget.status === 'exceeded' && (
                    <span className='text-xs text-red-400 font-medium'>
                      Over by ₹{(budget.amountSpent - budget.allocatedAmount).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* bar track */}
                <div
                  className='w-full h-3 rounded-full overflow-hidden'
                  style={{ background: bgColor }}
                >
                  {/* bar fill — width driven by percentage from backend */}
                  <div
                    className='h-full rounded-full transition-all duration-500'
                    style={{
                      width: `${barWidth}%`,
                      background: color,
                    }}
                  />
                </div>
              </div>

            </div>
          );
        })
      )}

      {/* Budget form */}
      {isClicked && (
        <div className='w-[352px] h-auto bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center absolute bottom-0 rounded-xl shadow-xl'>
          <BudgetForm savedData={loadBudgets} />
        </div>
      )}

      <div className='flex justify-center items-center h-[10%] w-[10%] absolute bottom-0'>
        <Button
          title='Budget'
          onClick={() => setIsClicked(prev => !prev)}
        />
      </div>

    </div>
  );
};

export default Budget;