
import { useEffect, useState } from 'react';
import Button from '../../UiComponents/Button';
import Input from '../../UiComponents/Input';
const ExpenseForm = ({savedData}) => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('1')
    const [date, setDate] = useState('')




    async function deleteData(id) {
        const deleteInfo = await fetch(`http://localhost:5000/api/expenseRoutes/delete/${id}`, {
            method: 'DELETE'
        })
    }


    const formData = (e) => {
        e.preventDefault();
        if (!date || !expense) {
            alert('Please fill in Amount and Date');
            return;
        }

        const [year, month, day] = date.split('-').map(Number);
        const jsDateObject = new Date(year, month - 1, day);
        const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const formattedDayOfWeek = weekdayFormatter.format(jsDateObject);
        const formattedMonth = monthFormatter.format(jsDateObject);
        console.log('date --->', date);
        console.log('day-->', formattedDayOfWeek)
        console.log('month--->', formattedMonth)

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
            const response = await fetch("http://localhost:5000/api/expenseRoutes/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                        // tell Report to re-fetch
                setExpense('');        // clear form
                setDescription('');
                setDate('');
                setCategory('1');
                const result = await response.json();

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


        <form onSubmit={formData} className='bg-[#FFF5EE]  flex flex-col  h-[440px] w-[350px] rounded-xl mt-2 mb-2 mr-2 ml-2 p-8' >
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
                <option value="1" >Groceries</option>
                <option value="2">Travel</option>
                <option value="3">Clothes</option>
                <option value="4">Food</option>
                <option value="5">EMI</option>
                <option value="6">Entertainment</option>
                <option value="7">Pet</option>
                <option value="8">Housing</option>
                <option value="9">Saloon</option>
                <option value="10">Gifts</option>
                <option value="11">Fuel</option>
                <option value="12">Gadgets</option>
            </select>

            <div className='mt-2 flex justify-center '>
                <Button title='Add' type='submit' />
            </div>
        </form>
    )
}
export default ExpenseForm;