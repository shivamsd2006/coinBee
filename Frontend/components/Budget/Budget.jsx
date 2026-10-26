import { useState, useEffect, useMemo } from 'react';
import BudgetForm from '../BudgetForm/BudgetForm';
import Button from '../../src/UiComponents/Button';

const STATUS_CONFIG = {
  ok: {
    color: '#00D09C',
    gradient: 'from-[#00D09C] to-[#05B386]',
    trackBg: 'rgba(0, 208, 156, 0.12)',
    badgeText: 'On Track',
    badgeClass: 'bg-emerald-500/10 text-[#00D09C] border-emerald-500/25',
  },
  full: {
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#2563EB]',
    trackBg: 'rgba(59, 130, 246, 0.12)',
    badgeText: 'At Limit',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  },
  exceeded: {
    color: '#F43F5E',
    gradient: 'from-[#F43F5E] to-[#E11D48]',
    trackBg: 'rgba(244, 63, 94, 0.12)',
    badgeText: 'Exceeded',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
  },
};

const Budget = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [budgetData, setBudgetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function loadBudgets() {
    setIsLoading(true);
    fetch('/api/budgetRoutes/read')
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text();
          throw new Error(`Server returned ${r.status}: ${text.slice(0, 80)}`);
        }
        return r.json();
      })
      .then((data) => setBudgetData(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Budget fetch failed:', err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadBudgets();
  }, []);

  const totalAllocated = useMemo(() => {
    return budgetData.reduce((acc, b) => acc + (b.allocatedAmount || 0), 0);
  }, [budgetData]);

  const totalSpent = useMemo(() => {
    return budgetData.reduce((acc, b) => acc + (b.amountSpent || 0), 0);
  }, [budgetData]);

  return (
    <div className='w-full flex flex-col gap-6 py-2 pb-16'>
      {/* Top Banner / Hero */}
      <div className='bg-[#131926]/85 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden'>
        <div className='absolute -right-10 -bottom-10 w-44 h-44 bg-[#00D09C]/10 blur-3xl pointer-events-none rounded-full' />

        <div>
          <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
            Total Monthly Budgets
          </span>
          <div className='flex items-baseline gap-3 mt-1'>
            <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-white'>
              ₹{totalSpent.toLocaleString('en-IN')}
            </h2>
            <span className='text-sm text-slate-400'>
              of ₹{totalAllocated.toLocaleString('en-IN')} allocated
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto justify-between md:justify-end'>
          <Button
            title='+ Create Budget'
            onClick={() => setIsClicked(true)}
            className='whitespace-nowrap shadow-lg shadow-[#00D09C]/25'
          />
        </div>
      </div>

      {/* Grid of Budget Cards */}
      {budgetData.length === 0 ? (
        <div className='bg-[#131926]/60 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4'>
          <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl'>
            🎯
          </div>
          <div>
            <h3 className='text-lg font-bold text-white'>No Active Budgets Found</h3>
            <p className='text-sm text-slate-400 max-w-sm mt-1'>
              Take control of your spending like Rocket Money. Set up category caps and get live tracking.
            </p>
          </div>
          <Button title='+ Create Your First Budget' onClick={() => setIsClicked(true)} />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {budgetData.map((budget) => {
            const barWidth = Math.min(budget.percentageSpent, 100);
            const cfg = STATUS_CONFIG[budget.status] || STATUS_CONFIG.ok;

            return (
              <div
                key={budget.budgetId}
                className='bg-[#131926]/90 border border-white/10 hover:border-white/20 transition-all duration-200 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between gap-5 relative group overflow-hidden'
              >
                {/* Subtle card glow on hover */}
                <div className='absolute -right-12 -top-12 w-28 h-28 bg-[#00D09C]/5 group-hover:bg-[#00D09C]/10 blur-2xl transition-all rounded-full pointer-events-none' />

                {/* Top: Category & Status Badge */}
                <div>
                  <div className='flex items-start justify-between gap-2 mb-1'>
                    <h3 className='text-lg font-bold text-white tracking-tight'>
                      {budget.categoryName}
                    </h3>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.badgeClass}`}
                    >
                      {cfg.badgeText}
                    </span>
                  </div>

                  {budget.description && (
                    <p className='text-xs text-slate-400 line-clamp-1 mb-2'>
                      {budget.description}
                    </p>
                  )}

                  <div className='text-[11px] font-medium text-slate-500'>
                    {new Date(budget.startDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    —{' '}
                    {new Date(budget.endDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                {/* Financial Figures */}
                <div className='flex justify-between items-baseline'>
                  <div>
                    <span className='text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5'>
                      Spent
                    </span>
                    <span className='text-2xl font-black text-white'>
                      ₹{budget.amountSpent.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className='text-right'>
                    <span className='text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5'>
                      Cap
                    </span>
                    <span className='text-base font-semibold text-slate-400'>
                      ₹{budget.allocatedAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Rocket Money Progress Track */}
                <div>
                  <div className='flex justify-between text-xs font-semibold mb-1.5'>
                    <span className='text-slate-400'>{budget.percentageSpent}% used</span>
                    {budget.status === 'exceeded' ? (
                      <span className='text-rose-400 font-bold'>
                        Over by ₹{(budget.amountSpent - budget.allocatedAmount).toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className='text-slate-500 font-medium'>
                        ₹{(budget.allocatedAmount - budget.amountSpent).toLocaleString('en-IN')} remaining
                      </span>
                    )}
                  </div>

                  <div
                    className='w-full h-2.5 rounded-full overflow-hidden'
                    style={{ background: cfg.trackBg }}
                  >
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${cfg.gradient} transition-all duration-500 shadow-sm`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form */}
      {isClicked && (
        <BudgetForm
          savedData={loadBudgets}
          onClose={() => setIsClicked(false)}
        />
      )}
    </div>
  );
};

export default Budget;
