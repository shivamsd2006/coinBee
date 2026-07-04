
import { useState } from 'react';
import Button from '../../UiComponents/Button';
import Input from '../../UiComponents/Input';
const ExpenseForm = ({ savedData }) => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Groceries')
    const [date, setDate] = useState('')


    const formData = (e) => {
        e.preventDefault();
     
        const [year, month, day] = date.split('-').map(Number);
        const jsDateObject = new Date(year, month - 1, day);
        const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const formattedDayOfWeek = weekdayFormatter.format(jsDateObject);
        const formattedMonth = monthFormatter.format(jsDateObject);
        console.log('date --->',date);
        console.log('day-->',formattedDayOfWeek)
        console.log('month--->',formattedMonth)

        const user = {
            Expense: Number(expense),
            Description: description,
            DayName: formattedDayOfWeek,
            MonthName: formattedMonth,
            Date: date,
            Category: category
        }
        alert('user')

        sendData(user);
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


        <form onSubmit={formData} className='bg-gray-900 flex flex-col  h-[30em] w-[60%] rounded-xl  p-1 transition duration-300' >
            <div>
                <h4 className='text-[#FFFFFF] font-syne font-semibold text-[1.2rem]'>Add Expense:</h4>
            </div>
            <div className='mt-2'>
                <Input id='Amount' type='number' value={expense} onChange={(e) => setExpense(e.target.value)} />
            </div>
            <div className='mt-2'>
                <Input id='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <Input id='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <label htmlFor="category" className=' text-[#8E8E93] text-[1.2rem] mt-2' > Category</label>
            <select className='text-[#8E8E93] text-[1.2rem] border-2 border-[#8E8E93] rounded-xl p-2' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Groceries" >Groceries</option>
                <option value="Travel">Travel</option>
                <option value="Clothes">Clothes</option>

            </select>

            <div className='mt-2 flex justify-center '>
                <Button title='Add' type='submit' />
            </div>
        </form>
    )
}
export default ExpenseForm;