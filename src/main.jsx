import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import CalculatorPage from './pages/calculadora-laboral'
import CalculadoraLaboral from './pages/calculadora'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CalculatorPage /> } />
        <Route path='/calculadora' element={<CalculadoraLaboral /> } />
      </Routes>
    </BrowserRouter>  
  </StrictMode>,
)
