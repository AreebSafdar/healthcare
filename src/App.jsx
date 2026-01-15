import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore, useAppStore } from './store'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PatientDetail from './pages/PatientDetail'
import AppointmentDetail from './pages/AppointmentDetail'
import AlertsCenter from './pages/AlertsCenter'
import PayerSimulator from './pages/PayerSimulator'
import AIOrchestrator from './pages/AIOrchestrator'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const initializeMockData = useAppStore(state => state.initializeMockData)
  const theme = useAppStore(state => state.theme)

  useEffect(() => {
    // Initialize mock data
    initializeMockData()

    // Set initial theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointment/:id" element={<AppointmentDetail />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
            <Route path="/alerts" element={<AlertsCenter />} />
            <Route path="/payer-simulator" element={<PayerSimulator />} />
            <Route path="/ai-orchestrator" element={<AIOrchestrator />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
