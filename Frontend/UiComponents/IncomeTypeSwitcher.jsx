import React from 'react'

const IncomeTypeSwitcher = () => {
  return (
    <>
    <div className='border-2 border-[#d7d7d7] rounded-xl relative w-[23em] flex justify-evenly cursor-pointer '>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Salary</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Investment</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Part Time</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Other</span>
    </div>
      
    </>
  )
}

export default IncomeTypeSwitcher