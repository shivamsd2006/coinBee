import { useState, useEffect, useMemo } from 'react';
import IncomeForm from '../IncomeForm/IncomeForm';
import Button from '../../src/UiComponents/Button';
import IncomeTypeSwitcher from '../../src/UiComponents/IncomeTypeSwitcher';

const Income = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [activeType, setActiveType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  function loadIncome(type) {
    setIsLoading(true);
    fetch(`/api/incomeRoutes/read?type=${type}`)
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text();
          throw new Error(`Server returned ${r.status}: ${text.slice(0, 80)}`);
        }
        return r.json();
      })
      .then((data) => setIncomeData(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Income fetch failed:', err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadIncome(activeType);
  }, [activeType]);

  const totalInflow = useMemo(() => {
    let sum = 0;
    incomeData.forEach(({ entries }) => {
      if (Array.isArray(entries)) {
        entries.forEach((e) => {
          sum += Number(e.amount) || 0;
        });
      }
    });
    return sum;
  }, [incomeData]);

  return (
    <div className='w-full flex flex-col gap-6 py-2 pb-16'>
      {/* Top Banner / Hero */}
      <div className='bg-[#131926]/85 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden'>
        <div className='absolute -right-10 -bottom-10 w-44 h-44 bg-[#00D09C]/10 blur-3xl pointer-events-none rounded-full' />

        <div>
          <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
            Total Recorded Inflow
          </span>
          <div className='flex items-baseline gap-2 mt-1'>
            <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-[#00D09C]'>
              +₹{totalInflow.toLocaleString('en-IN')}
            </h2>
            <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
              Income Streams
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap'>
          <IncomeTypeSwitcher activeType={activeType} onSwitch={setActiveType} />
          <Button
            title='+ Record Income'
            onClick={() => setIsClicked(true)}
            className='whitespace-nowrap shadow-lg shadow-[#00D09C]/25'
          />
        </div>
      </div>

      {/* Income Stream List */}
      <div className='w-full max-w-4xl mx-auto'>
        {incomeData.length === 0 ? (
          <div className='bg-[#131926]/60 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4'>
            <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl'>
              💰
            </div>
            <div>
              <h3 className='text-lg font-bold text-white'>No Income Entries Found</h3>
              <p className='text-sm text-slate-400 max-w-sm mt-1'>
                Log your salaries, deposits, and income streams to see your net cash flow.
              </p>
            </div>
            <Button title='+ Record Your First Deposit' onClick={() => setIsClicked(true)} />
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            {incomeData.map(({ date, entries }) => (
              <div key={date} className='flex flex-col gap-2'>
                {/* Date header */}
                <div className='flex items-center gap-3 px-2'>
                  <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                    {new Date(date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <div className='flex-1 h-[1px] bg-white/[0.08]' />
                </div>

                {/* Entries */}
                <div className='space-y-2.5'>
                  {entries.map((entry) => (
                    <div
                      key={entry.depositId}
                      className='bg-[#131926]/90 border border-white/10 hover:border-white/20 transition-all duration-200 rounded-2xl px-5 py-4 shadow-md flex items-center justify-between gap-4 backdrop-blur-md group'
                    >
                      <div className='flex items-center gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00D09C] font-bold text-base shadow-sm'>
                          ₹
                        </div>
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-bold text-white tracking-tight'>
                              {entry.Type?.name ?? 'Income Stream'}
                            </span>
                            <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5'>
                              Verified
                            </span>
                          </div>
                          {entry.description && (
                            <span className='text-xs text-slate-400 block mt-0.5'>
                              {entry.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='text-right'>
                        <span className='text-base sm:text-lg font-black text-[#00D09C] tracking-tight block'>
                          +₹{entry.amount.toLocaleString('en-IN')}
                        </span>
                        <span className='text-[10px] text-slate-500 font-medium'>
                          Deposited
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isClicked && (
        <IncomeForm
          savedData={() => loadIncome(activeType)}
          onClose={() => setIsClicked(false)}
        />
      )}
    </div>
  );
};

export default Income;
