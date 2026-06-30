
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Button from '../../UiComponents/Button';
import Input from '../../UiComponents/Input';
import SpendBarChart from '../../src/UiDashboards/SpendBarChart';
import SpendPieChart from '../../src/UiDashboards/SpendPieChart';
import SpendLineChart from '../../src/UiDashboards/SpendLineChart';
 import SliderImport from "react-slick";

// 2. FORCE Vite to give us the actual component function, not the object wrapper
const Slider = SliderImport.default ? SliderImport.default : SliderImport;




const Expense = ({ savedData }) => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Groceries')
    const [date, setDate] = useState('')


    const formData = (e) => {
        e.preventDefault();

        if (!date) {
            return;
        } else {
            const [year, month, day] = date.split('-').map(Number);
            const jsDateObject = new Date(year, month - 1, day);
            const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
            const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
            const formattedDayOfWeek = weekdayFormatter.format(jsDateObject);
            const formattedMonth = monthFormatter.format(jsDateObject);

            const user = {
                Expense: Number(expense),
                Description: description,
                DayName: formattedDayOfWeek,
                MonthName: formattedMonth,
                Date: date,
                Category: category
            }

            sendData(user);

        }




    }

    async function sendData(data) {
        try {
            const response = await fetch("http://localhost:5000/expenseRoutes/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json();
                savedData(result);

                console.log("this is the result--->", result);
            } else {
                console.log("http error ", response.status);
            }

        } catch (error) {
            console.error("network erorr", error.name);
            console.error("network message", error.message);

        }
    }





    return (


        <form onSubmit={formData} className='bg-gray-900 flex flex-col  h-[90%] w-[60%] rounded-xl  p-4 transition duration-300' >
            <div>
                <h4 className='text-[#FFFFFF] font-syne font-semibold text-[1.2rem]'>Add Expense:</h4>
            </div>
            <div className='mt-2'>
                <Input id='Amount' type='number' value={expense} onChange={(e) => setExpense(e.target.value)} />
            </div>
            <div className='mt-2'>
                <Input id='Description' type='text' value={description} onChange={(e)=> setDescription(e.target.value)} />
            </div>
            <div>
                <Input id='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <label htmlFor="category" className=' text-[#8E8E93] text-[1.2rem] mt-2' > Category</label>
            <select className='text-[#8E8E93]text-[1.2rem] border-2 border-[#8E8E93] rounded-xl' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Groceries" >Groceries</option>
                <option value="Travel">Travel</option>
                <option value="Clothes">Clothes</option>

            </select>

          

            <div className='mt-2 flex justify-center '>
                <Button title='Add' />
            </div>
        </form>
    )


}
const settings = {
    dots: true,
    fade: true,
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
        const userData = [...data,userData]
        setBarChartData(userData)
    }

    const formattedData = barChartData.map(item => ({
        name: item.DayName,
        uv: item.Expense
    }));

    console.log("React Component Check:", { SpendBarChart, SpendPieChart, SpendLineChart, Button, Input });
    console.log("Third-Party Check:", { 
    Slider, 
});

    return (
        <>
            <div className='h-full w-full  flex items-end justify-center gap-4 relative'>
                <div className='h-full w-full flex items-center justify-center'>


                    <div className="slider-container h-[300px] w-[300px] relative">
                        <Slider {...settings} className='h-[400px] w-full'>
                            <div className='h-[400px] w-[300px]'>
                                <SpendBarChart stateData={formattedData} />
                            </div>
                            <div className='h-[400px] full'>
                                <SpendPieChart />
                            </div>
                            <div className='h-[400px] full'>
                                <SpendLineChart />
                            </div>

                        </Slider>
                    </div>




                </div>

                <div className=' w-[50%] h-[70%]  flex flex-col justify-end items-center gap-3 absolute bottom-0'>
                    {isClicked && <Expense savedData={fetchResult} />}

                    <button onClick={() => { setIsClicked(true) }} className='w-10 h-10 size-5 cursor:pointer'>
                        <CirclePlus className="w-6 h-6 size-7 text-white " />
                    </button>

                </div>
            </div>

        </>
    )
}

export default Report
