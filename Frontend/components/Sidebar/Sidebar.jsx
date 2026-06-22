import React from 'react'
import Report from '../Report/Report.jsx'
import Income from '../Income/Income.jsx'
import Budget from '../Budget/Budget.jsx'
import { Link } from 'react-router';

const Sidebar = () => {
  return (
    
     <nav>
          <Link to='/'className='text-[#FFFFFF] font-syne font-semibold'>Report</Link>
          <Link to='/income'className='text-[#FFFFFF] font-syne font-semibold'>Income</Link>
          <Link to='/budget'className='text-[#FFFFFF] font-syne font-semibold'>Budget</Link>
        </nav>
    
  )
}

export default Sidebar
