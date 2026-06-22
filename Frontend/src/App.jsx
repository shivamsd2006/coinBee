import Footer from '../components/Footer/Footer.jsx'
import Header from '../components/Header/Header.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import Structure from '../components/Structure/Structure.jsx'
import {  Routes, Route, Link } from 'react-router';
import Report from '../components/Report/Report.jsx'
import Income from '../components/Income/Income.jsx'
import Budget from '../components/Budget/Budget.jsx'
function App() {


  return (

    <div className='bg-[#0B0B0C] h-screen'>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Report />} />
        <Route path='/income' element={<Income />} />
        <Route path='/budget' element={<Budget />} />
      </Routes>

      <Footer />
      </div>
    

  )
}

export default App
