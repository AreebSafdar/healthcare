import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store'
import { Shield, User, Mail, Lock, Briefcase, AlertCircle, CheckCircle } from 'lucide-react'

function StaffSignup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('front-desk')
  const [clinic, setClinic] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const signup = useAuthStore(state => state.signup)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!userName || !email || !password || !clinic) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      signup(clinic, userName, email, password, role)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError('Failed to create account')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-healthcare-blue to-blue-600 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Account Created!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Your staff account has been successfully registered. Redirecting to login...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue to-blue-600 dark:from-slate-900 dark:to-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Panel - Info */}
        <div className="hidden md:flex flex-col justify-between p-8 text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Shield size={32} />
              <h1 className="text-3xl font-bold">Clinic Staff Portal</h1>
            </div>
            <p className="text-lg text-blue-100 mb-8">Join our team of healthcare professionals managing insurance verification and patient appointments</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-green-400 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Streamlined Management</h3>
                <p className="text-blue-100">Manage appointments and insurance verification efficiently</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-green-400 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-time Updates</h3>
                <p className="text-blue-100">Get instant notifications on verification status changes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-green-400 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Role-Based Access</h3>
                <p className="text-blue-100">Front Desk and Billing staff with specialized dashboards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex flex-col justify-center p-4 md:p-8">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Staff Registration</h2>
              <p className="text-blue-100">Create your clinic staff account</p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-3 border border-red-200 dark:border-red-800">
                  <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      id="userName"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="staff@clinic.com"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                    />
                  </div>
                </div>

                {/* Clinic Name */}
                <div>
                  <label htmlFor="clinic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Clinic Name
                  </label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      id="clinic"
                      type="text"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      placeholder="City Medical Clinic"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                    />
                  </div>
                </div>

                {/* Staff Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Staff Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                  >
                    <option value="front-desk">Front Desk Staff</option>
                    <option value="billing">Billing Staff</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-healthcare-blue"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-healthcare-blue to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-6"
                >
                  Create Staff Account
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-center text-slate-600 dark:text-slate-400 mb-3">Already have a staff account?</p>
                <Link
                  to="/login"
                  className="block text-center text-healthcare-blue hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffSignup
