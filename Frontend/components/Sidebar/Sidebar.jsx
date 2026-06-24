
import { Link } from 'react-router';

const Sidebar = () => {
  return (
    
     <nav className='flex justify-around'>
          <Link to='/'className='text-[#FFFFFF] font-syne font-semibold '>Report</Link>
          <Link to='/income'className='text-[#FFFFFF] font-syne font-semibold'>Income</Link>
          <Link to='/budget'className='text-[#FFFFFF] font-syne font-semibold'>Budget</Link>
        </nav>
    
  )
}

export default Sidebar
