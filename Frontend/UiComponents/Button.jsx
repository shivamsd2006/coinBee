import React from 'react'

const Button = ({title}) => {
  return (
    <div >
       <button type='submit' className='text-[#0B0B0C] bg-white w-fit text-xl py-2 px-4 rounded-2xl  '>{title}</button>
    </div>
  )
}

export default Button
