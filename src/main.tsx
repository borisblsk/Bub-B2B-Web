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
import Login from './screens/Login'
import RequireAuth from './components/RequireAuth'
import WidgetPreview from './previews/WidgetPreview'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/ds" element={<RequireAuth><App /></RequireAuth>} />
        <Route path="/accounts" element={<RequireAuth><Accounts /></RequireAuth>} />
        <Route path="/cards" element={<RequireAuth><Cards /></RequireAuth>} />
        <Route path="/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
        <Route path="/payments" element={<RequireAuth><Payments /></RequireAuth>} />
        <Route path="/preview/widget" element={<RequireAuth><WidgetPreview /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
