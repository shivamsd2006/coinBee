import React from 'react'

const Button = ({title,type,onClick}) => {
  return (
    <div >
      <button type={type} onClick={onClick} className='text-white bg-linear-to-br from-green-400 to-slate-50 w-fit text-xl py-2 px-4 rounded-2xl cursor-pointer '>{title}</button>
    </div>
  )
}

export default Button
