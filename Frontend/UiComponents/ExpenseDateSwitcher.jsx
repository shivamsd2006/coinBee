import React from 'react'

const ExpenseDateSwitcher = ({onSwitch}) => {
  
  return (
    <>
      <div className='w-[100%] h-[40px] bg-linear-to-br from-green-400 to-slate-50 rounded-xl p-1 flex items-center justify-center'>
        <div className=' rounded-xl relative  flex justify-evenly cursor-pointer bg-white w-[99%] h-[37px] items-center '>
          <span onClick={() => onSwitch('day')} className='text-[#1B1B1B] text-[1.2rem]  p-2  cursor-pointer hover-border-2 border-green-400 rounded-xl'>Day</span>
          <span onClick={() => onSwitch('week')} className='text-[#1B1B1B] text-[1.2rem] p-2 cursor-pointer hover-border-2 border-green-400 rounded-xl '>Week</span>
          <span onClick={() => onSwitch('month')} className='text-[#1B1B1B] text-[1.2rem] p-2  cursor-pointer hover-border-2 border-green-400 rounded-xl'>Month</span>
          <span onClick={() => onSwitch('year')} className='text-[#1B1B1B] text-[1.2rem] p-2  cursor-pointer hover-border-2 border-green-400 rounded-xl'>Year</span>
        </div>
      </div>
    </>
  )
}

export default ExpenseDateSwitcher