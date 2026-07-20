
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

import SpendBarChart from '../../src/UiDashboards/SpendBarChart';
import SpendPieChart from '../../src/UiDashboards/SpendPieChart';
import SpendLineChart from '../../src/UiDashboards/SpendLineChart';
import SliderImport from "react-slick";
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import ExpenseDateSwitcher from '../../UiComponents/ExpenseDateSwitcher';
import Button from '../../UiComponents/Button';

// 2. FORCE Vite to give us the actual component function, not the object wrapper
const Slider = SliderImport.default ? SliderImport.default : SliderImport;





const settings = {
    dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
}
const Report = () => {
    const [isClicked, setIsClicked] = useState(false)
    const[ expenseDataDb,setExpenseDataDb] = useState([])
    const[timeFrame,setTimeFrame] = useState('week')
     useEffect(() => {
    
        async function readData() {
            const fetchedExpense = await fetch(`http://localhost:5000/expenseRoutes/read?timeframe=${timeFrame}`)
            const fExpense = await fetchedExpense.json();
            setExpenseDataDb(fExpense)
        }

        readData()
    },[timeFrame])

   



    return (
        <>
            <div className='h-[80%] w-full  flex flex-col items-center justify-center gap-4 relative'>
                <div className='absolute left-10 top-10' >
                    <ExpenseDateSwitcher onSwitch={setTimeFrame}/>
                </div>


                <div className="slider-container h-[450px] w-[450px] w-full flex items-center justify-center relative">
                    <Slider {...settings} className='h-[400px] w-[400px]'>
                        <div className='h-[300px] w-[300px]'>
                            <SpendBarChart stateData={expenseDataDb} />
                        </div>
                        <div className='h-[300px] w-[300px]'>
                            <SpendPieChart />
                        </div>
                        <div className='h-[300px] w-[300px]'>
                            <SpendLineChart />
                        </div>

                    </Slider>
                </div>


                {isClicked && <div className=' w-[352px] h-[453px] bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center mb-15  absolute bottom-0 rounded-xl'>
                    <ExpenseForm  />
                </div>}
                <div className='flex justify-center items-center  h-[10%] w-[10%] absolute bottom-0'>
                   <Button title='Expense'  onClick={() => { setIsClicked(!isClicked) }}/>

                   
                </div>

            </div>

        </>
    )
}

export default Report
