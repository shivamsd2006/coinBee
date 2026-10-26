import Header from '../components/Header/Header.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { Routes, Route } from 'react-router';
import Report from '../components/Report/Report.jsx';
import Income from '../components/Income/Income.jsx';
import Budget from '../components/Budget/Budget.jsx';

function App() {
  return (
    <div className='min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col relative overflow-x-hidden'>
      {/* Ambient background glow accents — Rocket Money style */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#00D09C]/[0.08] blur-[140px] pointer-events-none rounded-full'
        aria-hidden='true'
      />
      <div
        className='absolute top-[40%] right-[-100px] w-[500px] h-[400px] bg-emerald-600/[0.04] blur-[160px] pointer-events-none rounded-full'
        aria-hidden='true'
      />

      <Header />

      <main className='flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 relative z-10'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Report />} />
          <Route path='/income' element={<Income />} />
          <Route path='/budget' element={<Budget />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
