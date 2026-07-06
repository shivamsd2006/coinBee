import Footer from '../components/Footer/Footer.jsx'
import Header from '../components/Header/Header.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import { Routes, Route, Link } from 'react-router';
import Report from '../components/Report/Report.jsx'
import Income from '../components/Income/Income.jsx'
import Budget from '../components/Budget/Budget.jsx'
function App() {


  return (

    <div className='bg-linear-to-br from-green-400 to-slate-50 h-screen w-screen border-5 flex flex-col '>
      <Header />
      <div className='flex flex-col  h-full w-full '>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Report />} />
          <Route path='/income' element={<Income />} />
          <Route path='/budget' element={<Budget />} />
        </Routes>
      </div>
      <Footer />
    </div>


  )
}

export default App
