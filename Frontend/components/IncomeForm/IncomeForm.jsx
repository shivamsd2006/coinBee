import React from 'react'
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Input from '../../UiComponents/Input';
import Button from '../../UiComponents/Button';

const IncomeForm = () => {

    const [income, setIncome] = useState("")
    const [type, setType] = useState('Salary')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')





    const formData = (e) => {
        e.preventDefault();

        const [year, month, day] = date.split('-').map(Number);
        const jsDateObject = new Date(year, month - 1, day);
        const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const formattedDayOfWeek = weekdayFormatter.format(jsDateObject);
        const formattedMonth = monthFormatter.format(jsDateObject);


        const user = {
            Income: Number(income),
            Type: type,
            Description: description,
            DayName: formattedDayOfWeek,
            MonthName: formattedMonth,
            Date: date
        }
        sendData(user);

    }

    async function sendData(data) {
        try {
            const response = await fetch("http://localhost:5000/incomeRoutes/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json();

                console.log(result);
            } else {
                console.log("http error ", response.status);
                throw new Error('error');
            }

        } catch (error) {
            console.error("network error", error.message);
        }

    }

    return (
        <>
            <form onSubmit={formData} className='bg-gray-900 flex flex-col  h-[30em] w-[60%] rounded-xl  p-1 transition duration-300'>
                <div>
                    <h4 className='text-[#FFFFFF] font-syne font-semibold text-[1.2rem]'>Add Income</h4>
                </div>
                <div className='mt-2'>
                    <Input id='Amount' type='number' value={income} onChange={(e) => setIncome(e.target.value)} />
                </div>
                <div className='mt-2'>
                    <Input id='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <Input id='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <label htmlFor="category" className=' text-[#8E8E93] text-[1.2rem] mt-2' > Type</label>
                <select id='category' className='text-[#8E8E93] text-[1.2rem] border-2 border-[#8E8E93] rounded-xl p-2' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Salary" >Salary</option>
                    <option value="Deposite">Deposite</option>
                    <option value="Others">Others</option>

                </select>


                <div className='mt-2 flex justify-center '>
                    <Button title='Add' type='submit' />
                </div>

            </form>
        </>
    )
}


export default IncomeForm
