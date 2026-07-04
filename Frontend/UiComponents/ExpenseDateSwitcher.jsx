import React from 'react'

const ExpenseDateSwitcher = () => {
  return (
    <>
    <div className='border-2 border-[#d7d7d7] rounded-xl relative w-[15em] flex justify-evenly cursor-pointer '>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Day</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Week</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Month</span>
        <span className='text-[#d7d7d7] text-[1.2rem] hover:text-black hover:bg-[#d7d7d7]'>Year</span>
    </div>
      
    </>
  )
}

export default ExpenseDateSwitcher