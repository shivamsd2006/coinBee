import React from 'react'
import { useState } from 'react'
import BudgetForm from '../BudgetForm/BudgetForm'
import Button from '../../UiComponents/Button'



const Budget = () => {
   const [isClicked, setIsClicked] = useState(false)
  return (
    <div className='h-[80%] w-full flex flex-wrap justify-around  shrink-0 overflow-y-auto relative'>
      <div className='h-[300px] w-[500px]  bg-linear-to-br from-green-400 to-slate-50  rounded-lg my-5 justify-center flex flex-col items-center'>
        <p className='text-2xl'>Shopping</p>
        <p>sports and winter wear</p>
        <p className='text-xl'>1700</p>
      </div>
      <div className='h-[300px] w-[500px]  bg-linear-to-br from-green-400 to-slate-50 rounded-lg my-5 justify-center flex flex-col items-center'>
        <p className='text-2xl'>Groceries</p>
        <p>this month</p>
        <p className='text-xl'>2000</p>
      </div>
      <div className='h-[300px] w-[500px]  bg-linear-to-br from-green-400 to-slate-50  rounded-lg my-5 justify-center flex flex-col items-center'>
        <p className='text-2xl'>Entertainment</p>
        <p>..</p>
        <p className='text-xl'>800</p>
      </div>
      <div className='h-[300px] w-[500px]  bg-linear-to-br from-green-400 to-slate-50  rounded-lg my-5 justify-center flex flex-col items-center'>
        <p className='text-2xl'>Books</p>
        <p>fiction</p>
        <p className='text-xl'>1000</p>
      </div>
    


      {isClicked && <div className=' w-[352px] h-[453px] bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center mb-15  absolute bottom-0 rounded-xl'>
        <BudgetForm />
      </div>}
      <div className='flex justify-center items-center  h-[10%] w-[10%] absolute bottom-0'>
        <Button title='Budget' onClick={() => { setIsClicked(!isClicked) }} />


      </div>

    </div>
  )
}

export default Budget
