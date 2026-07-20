
import { Link } from 'react-router';

const Sidebar = () => {
  return (

    <div className='w-[90%] h-[50px] bg-linear-to-br from-green-400 to-slate-50 flex justify-around items-center rounded-xl '>
      <nav className='flex justify-around items-center bg-white w-[99%] h-[90%] rounded-xl'>
        <Link to='/' className='text-[#1B1B1B] font-syne font-semibold '>Report</Link>
        <Link to='/income' className='text-[#1B1B1B] font-syne font-semibold'>Income</Link>
        <Link to='/budget' className='text-[#1B1B1B] font-syne font-semibold'>Budget</Link>
      </nav>
    </div>
  )
}

export default Sidebar
