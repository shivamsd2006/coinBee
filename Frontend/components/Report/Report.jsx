import React from 'react'
import { useState } from 'react';



const Expense = () => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Groceries')
    const [descriptionError, setDescriptionError] = useState('')

   const user={
        Expense:Number(expense),
        Description:description,
        Category:category
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

      

        sendData(user).catch(alert('console.error'));

    }

    async function sendData() {
        try {
            const response = await fetch("http://localhost:5173/expenseRoutes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const result = await response.json();

                console.log(result);
            } else {
                console.log("http error ", response.status);
            }

        } catch (error) {
            console.log("network erorr",error);
        }
    }

   

    return (
        <>
<section>
                <form onSubmit={formData}>
                    <label htmlFor="expenseIn">Add Expense:</label>
                    <input type="number" value={expense} onChange={(e) => setExpense(e.target.value)} />

                    <label htmlFor="description">Description:</label>
                    <input type="text" value={description} onChange={checkDescriptionError} />

                    <label htmlFor="category" > Category</label>
                    <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Groceries" >Groceries</option>
                        <option value="Travel">Travel</option>
                        <option value="Clothes">Clothes</option>

                    </select>

                    <p>{descriptionError}</p>


                    <button type='submit'>Add</button>
                </form>
            </section>
        </>
    )

}

const Report = () => {
    return (
        <>
            <div>
                <Expense />
            </div>
        </>
    )
}

export default Report
