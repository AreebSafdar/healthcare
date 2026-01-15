import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store'
import { Mail, Lock, Building2, User, Loader, Activity, CheckCircle, ChevronRight } from 'lucide-react'

function Signup() {
  const [clinicName, setClinicName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('staff')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { signup, isLoading } = useAuthStore()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!clinicName || !userName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    signup(clinicName, userName, email, password, role)
    setSuccess(true)
    
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Account Created!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Redirecting you to the dashboard...</p>
          <Loader className="animate-spin text-healthcare-blue mx-auto" size={24} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding with Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500 via-healthcare-blue to-blue-700 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        {/* Top - Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">HealthCare</h1>
              <p className="text-teal-100 text-sm">Insurance Verification</p>
            </div>
          </div>
        </div>
        
        {/* Middle - Main Message */}
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Join 500+ Healthcare Providers</h2>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">Start automating your insurance verification process today. No credit card required for the trial.</p>
          
          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: '✓', text: '14-day free trial included' },
              { icon: '✓', text: 'No setup fees or hidden costs' },
              { icon: '✓', text: 'Dedicated onboarding support' },
              { icon: '✓', text: '24/7 customer support' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-teal-100">
                <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold">{item.icon}</span>
                <span className="text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom - Trust indicator */}
        <div className="relative z-10 pt-8 border-t border-white/20">
          <p className="text-teal-100 text-sm">Get started with insurance verification</p>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Create your account</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Get started with insurance verification</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Clinic Name
              </label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue transition-colors" size={20} />
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder="Your Clinic Name"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Your Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue transition-colors" size={20} />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder="Dr. Jane Smith"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder="name@clinic.com"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue transition-colors" size={20} /> 
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder=" ••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue transition-colors" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Role
              </label>
              <div className="relative group">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field text-base appearance-none"
                  disabled={isLoading}
                >
                  <option value="staff">Staff Member</option>
                  <option value="admin">Administrator</option>
                </select>
                <ChevronRight className="absolute right-4 top-4 text-slate-400 group-focus-within:text-healthcare-blue pointer-events-none rotate-90 transition-colors" size={18} />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mt-8 flex items-center justify-center gap-2 text-lg py-3 bg-gradient-to-r from-healthcare-blue to-teal-500"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-healthcare-blue font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
