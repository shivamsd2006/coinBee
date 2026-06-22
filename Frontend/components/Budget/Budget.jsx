import React from 'react'
import { useState } from 'react'

const Budget = () => {


  const [amount, setAmount] = useState("")
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const user = {
    Amount: Number(amount),
    Description: description,
    StartDate: startDate,
    EndDate: endDate


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
      const response = await fetch("http://localhost:5000/budgetRoutes/add", {
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
      }

    } catch (error) {
      console.error("network erorr", error.message);
    }

  }

  return (
    <>
      <section>
        <form onSubmit={formData}>
          <label htmlFor="expenseIn">Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />


          <label htmlFor="description">Description:</label>
          <input type="text" value={description} onChange={checkDescriptionError} />

          <label htmlFor="startDate" > Start Date:</label>
          <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

          <label htmlFor="endDate" > End Date:</label>
          <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />




          <p>{descriptionError}</p>


          <button type='submit'>Add</button>
        </form>
      </section>

    </>
  )

}
export default Budget

