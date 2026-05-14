import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Predict from './pages/Predict'
import PrescriptionScanner from './pages/PrescriptionScanner'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-mainbg text-zinc-100 font-sans selection:bg-brand-500/30 selection:text-brand-100">
        <Navbar />
        <main className="flex-1 flex flex-col relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/scanner" element={<PrescriptionScanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
