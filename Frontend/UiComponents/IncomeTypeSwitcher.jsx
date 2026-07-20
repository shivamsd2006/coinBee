import React from 'react'

const IncomeTypeSwitcher = () => {
  return (
    <>
      <div className='w-[100%] h-[40px] bg-linear-to-br from-green-400 to-slate-50 rounded-xl p-1 flex items-center justify-center'>
        <div className='bg-white rounded-xl relative w-[23em] flex justify-evenly cursor-pointer w-[99%] h-[37px] items-center '>
          <span className='text-[#1B1B1B] text-[1.2rem] p-2'>Salary</span>
          <span className='text-[#1B1B1B] text-[1.2rem] p-2'>Investment</span>
          <span className='text-[#1B1B1B] text-[1.2rem] p-2'>PartTime</span>
          <span className='text-[#1B1B1B] text-[1.2rem] p-2'>Other</span>
        </div>
      </div>

    </>
  )
}

export default IncomeTypeSwitcher