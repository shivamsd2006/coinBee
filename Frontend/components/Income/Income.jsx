import React from 'react'
import { useState } from 'react'

const Income = () => {


  const [income, setIncome] = useState("")
  const [type, setType] = useState('Salary')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const user = {
    Income: Number(income),
    Type: type,
    Description: description

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
      <section>
        <form onSubmit={formData}>
          <label htmlFor="expenseIn">Amount:</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />


          <label htmlFor="description">Description:</label>
          <input type="text" value={description} onChange={checkDescriptionError} />

          <label htmlFor="category" > Type</label>
          <select id='category' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Salary" >Salary</option>
            <option value="Deposite">Deposite</option>
            <option value="Others">Others</option>

          </select>

          <p>{descriptionError}</p>


          <button type='submit'>Add</button>
        </form>
      </section>

    </>
  )

}
export default Income
