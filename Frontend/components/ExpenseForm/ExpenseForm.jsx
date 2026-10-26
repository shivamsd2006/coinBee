import { useState } from 'react';
import Button from '../../src/UiComponents/Button';
import Input from '../../src/UiComponents/Input';

const ExpenseForm = ({ savedData, onClose }) => {
    const [expense, setExpense] = useState("");
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('1');
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formData = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!date || !expense) {
            setErrorMessage('Please fill in Amount and Date');
            return;
        }

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
        };

        sendData(user);
    };

    async function sendData(data) {
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/expenseRoutes/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result && !result.error && typeof result !== 'string') {
                setSuccessMessage('✅ Expense added successfully!');
                setExpense('');
                setDescription('');
                setDate('');
                setCategory('1');

                if (savedData) savedData();

                setTimeout(() => {
                    setSuccessMessage('');
                    if (onClose) onClose();
                }, 900);
            } else {
                const err = result?.error || (typeof result === 'string' ? result : `Server responded with ${response.status}`);
                setErrorMessage(err);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Network error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={formData} className='bg-[#FFF5EE] flex flex-col h-[470px] w-[350px] rounded-xl mt-2 mb-2 mr-2 ml-2 p-7 shadow-xl relative'>
            <div className='flex justify-between items-center'>
                <h4 className='text-gray-800 font-syne font-semibold text-[1.2rem]'>Add Expense</h4>
                {onClose && (
                    <button
                        type='button'
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-700 text-lg font-bold p-1 leading-none'
                        aria-label='Close form'
                    >
                        ✕
                    </button>
                )}
            </div>

            {errorMessage && (
                <div className='bg-red-100 border border-red-300 text-red-700 px-3 py-1.5 rounded-lg text-xs mt-2'>
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className='bg-green-100 border border-green-300 text-green-700 px-3 py-1.5 rounded-lg text-xs mt-2'>
                    {successMessage}
                </div>
            )}

            <div className='mt-2'>
                <Input id='Amount' type='number' value={expense} onChange={(e) => setExpense(e.target.value)} />
            </div>
            <div className='mt-2'>
                <Input id='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <Input id='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <label htmlFor="category" className='text-[#8E8E93] text-[1.1rem] mt-2'>Category</label>
            <select className='text-[#8E8E93] text-[1rem] border-2 border-[#8E8E93] rounded-xl p-2' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="1">Groceries</option>
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

            <div className='mt-3 flex justify-center'>
                <Button title={isSubmitting ? 'Adding...' : 'Add'} type='submit' />
            </div>
        </form>
    );
};

export default ExpenseForm;
