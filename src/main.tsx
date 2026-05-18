import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import Dashboard from './screens/Dashboard'
import Accounts from './screens/Accounts'
import Cards from './screens/Cards'
import Transactions from './screens/Transactions'
import Payments from './screens/Payments'
import WidgetPreview from './previews/WidgetPreview'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/ds" element={<App />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/preview/widget" element={<WidgetPreview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
