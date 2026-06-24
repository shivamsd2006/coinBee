import React from 'react'

const Input = ({id,type,}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='text-[#8E8E93] text-[1.2rem]'>{id}</label>
      <input type={type} id={id} className='text-[#8E8E93] border-2 border-[#8E8E93] rounded-xl p-2 appearance-none'/>
    </div>
  )
}

export default Input
