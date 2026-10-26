import { useState, useEffect, useMemo } from 'react';
import SpendBarChart from '../../src/UiDashboards/SpendBarChart';
import SpendPieChart from '../../src/UiDashboards/SpendPieChart';
import SpendLineChart from '../../src/UiDashboards/SpendLineChart';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import ExpenseDateSwitcher from '../../src/UiComponents/ExpenseDateSwitcher';
import Button from '../../src/UiComponents/Button';
import SliderImport from 'react-slick';

const Slider = SliderImport.default ? SliderImport.default : SliderImport;

const CustomPrevArrow = ({ className, style, onClick }) => (
  <button
    type='button'
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(21, 28, 44, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      zIndex: 10,
      left: '-16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    }}
    onClick={onClick}
    aria-label='Previous chart'
  />
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <button
    type='button'
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(21, 28, 44, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      zIndex: 10,
      right: '-16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    }}
    onClick={onClick}
    aria-label='Next chart'
  />
);

const settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const BASE = '/api/expenseRoutes';

const Report = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [timeFrame, setTimeFrame] = useState('week');
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total spent in current frame
  const totalSpent = useMemo(() => {
    if (Array.isArray(pieData) && pieData.length > 0) {
      return pieData.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
    }
    if (Array.isArray(barData) && barData.length > 0) {
      return barData.reduce((acc, curr) => acc + (Number(curr.uv) || 0), 0);
    }
    return 0;
  }, [pieData, barData]);

  async function fetchJsonSafely(url) {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 80)}`);
    }
    return res.json();
  }

  function loadAllCharts(frame) {
    setIsLoading(true);
    Promise.all([
      fetchJsonSafely(`${BASE}/read?timeframe=${frame}`),
      fetchJsonSafely(`${BASE}/line?timeframe=${frame}`),
      fetchJsonSafely(`${BASE}/pie?timeframe=${frame}`),
    ])
      .then(([bar, line, pie]) => {
        setBarData(Array.isArray(bar) ? bar : []);
        setLineData(Array.isArray(line) ? line : []);
        setPieData(Array.isArray(pie) ? pie : []);
      })
      .catch((err) => {
        console.error('Chart fetch failed:', err.message || err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadAllCharts(timeFrame);
  }, [timeFrame]);

  return (
    <div className='w-full flex flex-col gap-6 py-2'>
      {/* Top Banner / Summary Card */}
      <div className='bg-[#131926]/85 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden'>
        <div className='absolute -right-10 -bottom-10 w-44 h-44 bg-[#00D09C]/10 blur-3xl pointer-events-none rounded-full' />

        <div>
          <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
            Total Outflow ({timeFrame})
          </span>
          <div className='flex items-baseline gap-2 mt-1'>
            <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-white'>
              ₹{totalSpent.toLocaleString('en-IN')}
            </h2>
            <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
              Tracked
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap'>
          <ExpenseDateSwitcher onSwitch={setTimeFrame} active={timeFrame} />
          <Button
            title='+ Add Expense'
            onClick={() => setIsClicked(true)}
            className='whitespace-nowrap shadow-lg shadow-[#00D09C]/25'
          />
        </div>
      </div>

      {/* Main Charts Dashboard Card */}
      <div className='bg-[#131926]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h3 className='text-base font-bold text-white tracking-tight'>Visual Analytics</h3>
            <p className='text-xs text-slate-400'>Swipe or use arrows to view Trends, Breakdown, and Velocity</p>
          </div>
          {isLoading && (
            <span className='text-xs font-semibold text-[#00D09C] animate-pulse flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-[#00D09C]' />
              Syncing...
            </span>
          )}
        </div>

        <div className='relative h-[380px] w-full px-2 sm:px-6'>
          <Slider {...settings}>
            <div key='bar' className='h-[360px] w-full outline-none'>
              <div className='text-center text-xs font-semibold text-slate-400 mb-2'>
                Spending Histogram (by {timeFrame})
              </div>
              <SpendBarChart stateData={barData} />
            </div>

            <div key='pie' className='h-[360px] w-full outline-none'>
              <div className='text-center text-xs font-semibold text-slate-400 mb-2'>
                Category Allocation Breakdown
              </div>
              <SpendPieChart pieData={pieData} />
            </div>

            <div key='line' className='h-[360px] w-full outline-none'>
              <div className='text-center text-xs font-semibold text-slate-400 mb-2'>
                Cumulative Spending Trajectory
              </div>
              <SpendLineChart lineData={lineData} />
            </div>
          </Slider>
        </div>
      </div>

      {/* Expense Modal */}
      {isClicked && (
        <ExpenseForm
          savedData={() => loadAllCharts(timeFrame)}
          onClose={() => setIsClicked(false)}
        />
      )}
    </div>
  );
};

export default Report;
