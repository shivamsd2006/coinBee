import { useState, useEffect } from 'react';
import SpendBarChart      from '../../src/UiDashboards/SpendBarChart';
import SpendPieChart      from '../../src/UiDashboards/SpendPieChart';
import SpendLineChart     from '../../src/UiDashboards/SpendLineChart';
import ExpenseForm        from '../ExpenseForm/ExpenseForm';
import ExpenseDateSwitcher from '../../UiComponents/ExpenseDateSwitcher';
import Button             from '../../UiComponents/Button';
import SliderImport from 'react-slick';
const Slider = SliderImport.default ? SliderImport.default : SliderImport;
const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'rgba(212,168,67,0.15)',
      border:         '1px solid rgba(212,168,67,0.4)',
      borderRadius:   '50%',
      width:          '35px',
      height:         '35px',
      zIndex:         10,
      left:           '8px',
    }}
    onClick={onClick}
  />
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'rgba(212,168,67,0.15)',
      border:         '1px solid rgba(212,168,67,0.4)',
      borderRadius:   '50%',
      width:          '35px',
      height:         '35px',
      zIndex:         10,
      right:          '8px',
    }}
    onClick={onClick}
  />
);

const settings = {
  dots:           true,
  infinite:       true,
  speed:          500,
  slidesToShow:   1,
  slidesToScroll: 1,
  prevArrow:      <CustomPrevArrow />,
  nextArrow:      <CustomNextArrow />,
};

const BASE = 'http://localhost:5000/expenseRoutes';

const Report = () => {
  const [isClicked,  setIsClicked]  = useState(false);
  const [timeFrame,  setTimeFrame]  = useState('week');

  
  const [barData,  setBarData]  = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData,  setPieData]  = useState([]);

  
  function loadAllCharts(frame) {
    
    Promise.all([
      fetch(`${BASE}/read?timeframe=${frame}`).then(r => r.json()),
      fetch(`${BASE}/line?timeframe=${frame}`).then(r => r.json()),
      fetch(`${BASE}/pie?timeframe=${frame}`).then(r => r.json()),
    ])
      .then(([bar, line, pie]) => {
        setBarData(bar);
        setLineData(line);
        setPieData(pie);
      })
      .catch(err => console.error('Chart fetch failed:', err));
  }

  useEffect(() => {
    loadAllCharts(timeFrame);
  }, [timeFrame]);

  return (
    <div className='h-[80%] w-full flex flex-col items-center justify-center gap-4 relative'>

      <div className='absolute left-10 top-4'>
        <ExpenseDateSwitcher onSwitch={setTimeFrame} />
      </div>

      <div className='relative h-[400px] w-full max-w-[600px]'>
        <Slider {...settings}>

          <div key='bar' className='h-[400px] w-full'>
            <SpendBarChart stateData={barData} />
          </div>

          <div key='pie' className='h-[400px] w-full'>
            {/* pieData shape: [{ name, value }] */}
            <SpendPieChart pieData={pieData} />
          </div>

          <div key='line' className='h-[400px] w-full'>
            {/* lineData shape: [{ name, uv }] — same as bar */}
            <SpendLineChart lineData={lineData} />
          </div>

        </Slider>
      </div>

      {isClicked && (
        <div className='w-[352px] h-[453px] bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center mb-15  absolute bottom-0 rounded-xl'>
          <ExpenseForm savedData={() => loadAllCharts(timeFrame)} />
        </div>
      )}

      <div className='absolute bottom-0'>
        <Button
          title='Expense'
          onClick={() => setIsClicked(prev => !prev)}
        />
      </div>

    </div>
  );
};

export default Report;