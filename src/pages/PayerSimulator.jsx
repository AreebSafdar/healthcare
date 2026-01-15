import React, { useState } from 'react'
import { formatAppointmentTime, generateMockVerificationResult } from '../utils'
import { Loader, LogIn, AlertCircle, CheckCircle, Clock } from 'lucide-react'

function PayerSimulator() {
  const [selectedPayer, setSelectedPayer] = useState(null)
  const [loginState, setLoginState] = useState('idle')
  const [verificationState, setVerificationState] = useState('idle')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    patientName: '',
    dob: '',
    policyId: ''
  })
  const [verificationResult, setVerificationResult] = useState(null)
  const [portalStatus, setPortalStatus] = useState('online')
  
  const payers = [
    { id: 'bluecross', name: 'Blue Cross', logo: '🔵', status: 'online' },
    { id: 'aetna', name: 'Aetna', logo: '❤️', status: 'online' },
    { id: 'cigna', name: 'Cigna', logo: '🟢', status: 'online' },
    { id: 'unitedhealth', name: 'UnitedHealth', logo: '🟦', status: 'slow' },
    { id: 'humana', name: 'Humana', logo: '🟨', status: 'online' },
  ]
  
  const currentPayer = payers.find(p => p.id === selectedPayer)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginState('loading')
    
    setTimeout(() => {
      if (formData.username && formData.password) {
        setLoginState('success')
        setVerificationState('idle')
        setTimeout(() => {
          setLoginState('idle')
        }, 2000)
      } else {
        setLoginState('error')
        setTimeout(() => setLoginState('idle'), 2000)
      }
    }, 1500)
  }
  
  const handleVerify = async (e) => {
    e.preventDefault()
    setVerificationState('loading')
    
    setTimeout(() => {
      const result = generateMockVerificationResult()
      setVerificationResult(result)
      setVerificationState('success')
      setTimeout(() => setVerificationState('idle'), 2000)
    }, 2000)
  }
  
  return (
    <div className="p-4 md:p-8">
      {/* Header with gradient background */}
      <div className="mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-xl p-8 border border-emerald-500/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">Payer Verification Simulator</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Simulate insurance verification workflows across multiple payers</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Payer Selection */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Select Payer</h2>
          <div className="space-y-2">
            {payers.map(payer => (
              <button
                key={payer.id}
                onClick={() => {
                  setSelectedPayer(payer.id)
                  setVerificationResult(null)
                  setFormData({ username: '', password: '', patientName: '', dob: '', policyId: '' })
                  setLoginState('idle')
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPayer === payer.id
                    ? 'border-healthcare-blue bg-healthcare-blue/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-healthcare-blue'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{payer.logo}</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{payer.name}</p>
                    <p className={`text-xs ${
                      payer.status === 'online'
                        ? 'text-green-600'
                        : payer.status === 'slow'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}>
                      {payer.status === 'online' ? '🟢' : payer.status === 'slow' ? '🟡' : '🔴'} {' '}
                      {payer.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Portal Interaction */}
        <div className="md:col-span-2">
          {selectedPayer ? (
            <div className="card p-8 h-full">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                {currentPayer.name} Portal
              </h2>
              
              {!verificationResult ? (
                <div className="space-y-6">
                  {/* Login Section */}
                  {loginState === 'idle' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">Step 1: Portal Login</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          placeholder="Enter portal username"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••"
                          className="input-field"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                        <LogIn size={20} />
                        Login to Portal
                      </button>
                    </form>
                  )}
                  
                  {loginState === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader className="animate-spin text-healthcare-blue mb-4" size={32} />
                      <p className="text-slate-600 dark:text-slate-400">Connecting to portal...</p>
                    </div>
                  )}
                  
                  {loginState === 'success' && (
                    <form onSubmit={handleVerify} className="space-y-4">
                      <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                        <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                        <p className="text-green-800 dark:text-green-200 font-medium">Logged in successfully</p>
                      </div>
                      
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">Step 2: Search Patient</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Patient Name
                        </label>
                        <input
                          type="text"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          placeholder="John Smith"
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Policy ID
                        </label>
                        <input
                          type="text"
                          value={formData.policyId}
                          onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
                          placeholder="POL123456789"
                          className="input-field"
                        />
                      </div>
                      
                      <button type="submit" className="btn btn-primary w-full">
                        Verify Insurance
                      </button>
                    </form>
                  )}
                  
                  {loginState === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                      <p className="text-red-800 dark:text-red-200">Login failed. Please try again.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                    <p className="text-green-800 dark:text-green-200 font-medium">Verification Successful</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 bg-slate-50 dark:bg-slate-800 p-4 rounded">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mt-1">
                        <span className="badge badge-success">{verificationResult.status}</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Plan Type</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{verificationResult.planType}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Copay</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">
                          {verificationResult.copay ? `$${verificationResult.copay}` : 'N/A'}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Deductible</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">${verificationResult.deductible}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Verified At</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1 text-xs">
                          {new Date(verificationResult.verifiedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setVerificationResult(null)
                      setLoginState('idle')
                      setFormData({ username: '', password: '', patientName: '', dob: '', policyId: '' })
                    }}
                    className="btn btn-secondary w-full"
                  >
                    Start Over
                  </button>
                </div>
              )}
              
              {verificationState === 'loading' && (
                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Loader className="animate-spin text-healthcare-blue mb-4 mx-auto" size={32} />
                    <p className="text-slate-600 dark:text-slate-400">Verifying insurance...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 h-full flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Select a payer to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PayerSimulator
