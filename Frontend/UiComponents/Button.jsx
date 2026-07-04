import React from 'react'

const Button = ({title,type,onClick}) => {
  return (
    <div >
      <button type={type} onClick={onClick} className='text-[#0B0B0C] bg-[#7A5C0F] w-fit text-xl py-2 px-4 rounded-2xl cursor-pointer '>{title}</button>
    </div>
  )
}

export default Button
