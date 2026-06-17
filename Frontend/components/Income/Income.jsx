import React from 'react'
import { useState } from 'react'

const Income = () => {


  const [income, setIncome] = useState("")
  const [type, setType] = useState('Salary')
  const [descriptionError, setDescriptionError] = useState('')



  const checkDescriptionError = (e) => {
    if (e.target.value == 1) {
      setDescriptionError('Error')
    } else {
      setDescription(e.target.value)
    }

  }


  const formData = (e) => {
    e.preventDefault();

    const user = {
      Income: Number(income),
      Type: type,
    }

    sendData(user).catch(alert('console.error'));

  }

  async function sendData() {
    try {
      const response = await fetch("http://localhost:5173/", {
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
      console.log("network erorr", error);
    }



    return (
      <>
        <section>
          <form onSubmit={formData}>
            <label htmlFor="expenseIn">Add Income:</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />

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
}
  export default Income
