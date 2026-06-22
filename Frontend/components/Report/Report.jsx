import React from 'react'
import { useState } from 'react';



const Expense = () => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Groceries')
    const [descriptionError, setDescriptionError] = useState('')

    const user = {
        Expense: Number(expense),
        Description: description,
        Category: category
    }

    const checkDescriptionError = (e) => {
        if (e.target.value == 1) {
            setDescriptionError('Error')
        } else {
            setDescription(e.target.value)
        }

    }


    const formData = (e) => {
        e.preventDefault();
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
                console.log(result.Category);

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
        <>
            <div>
                <h4 className='text-[#FFFFFF] font-syne font-semibold'>Add Expense:</h4>
            </div>
            <section>
                <form onSubmit={formData}>
                    <label htmlFor="expenseIn" className='text-[#8E8E93]'>Amount:</label>
                    <input className='text-[#8E8E93]'type="number" value={expense} onChange={(e) => setExpense(e.target.value)} />

                    <label htmlFor="description" className='text-[#8E8E93]'>Description:</label>
                    <input className='text-[#8E8E93]'type="text" value={description} onChange={checkDescriptionError} />

                    <label htmlFor="category" className=' text-[#8E8E93]' > Category</label>
                    <select className='text-[#8E8E93]' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Groceries" className=' text-[#8E8E93]' >Groceries</option>
                        <option value="Travel" className=' text-[#8E8E93]'>Travel</option>
                        <option value="Clothes" className=' text-[#8E8E93]'>Clothes</option>

                    </select>

                    <p>{descriptionError}</p>


                    <button type='submit' className='text-[#FFFFFF]'>Add</button>
                </form>
            </section>
        </>
    )

}

const Report = () => {
    return (
        <>
            <div>

                <div>
                    <Expense />
                </div>
            </div>

        </>
    )
}

export default Report
