
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
    const [barChartData, setBarChartData] = useState([])
    function fetchResult(data) {

        setBarChartData([data])
    }

    const formattedData = barChartData.map(item => ({
        name: item.DayName,
        uv: item.Expense
    }));



    return (
        <>
            <div className='h-full w-full  flex flex-col items-center justify-center gap-4 relative'>
                <div className='absolute left-10 top-10' >
                    <ExpenseDateSwitcher />
                </div>


                <div className="slider-container h-[450px] w-[450px] w-full flex items-center justify-center relative">
                    <Slider {...settings} className='h-[400px] w-[400px]'>
                        <div className='h-[300px] w-[300px]'>
                            <SpendBarChart stateData={formattedData} />
                        </div>
                        <div className='h-[300px] w-[300px]'>
                            <SpendPieChart />
                        </div>
                        <div className='h-[300px] w-[300px]'>
                            <SpendLineChart />
                        </div>

                    </Slider>
                </div>


                {isClicked && <div className=' w-[50%] h-[30em]  flex flex-col justify-end items-center mb-15 p-4 absolute bottom-0'>
                    <ExpenseForm savedData={fetchResult} />
                </div>}
                <div className='flex justify-center items-center  h-[10%] w-[10%] absolute bottom-0'>
                   <Button title='Expense'  onClick={() => { setIsClicked(!isClicked) }}/>

                   
                </div>

            </div>

        </>
    )
}

export default Report
