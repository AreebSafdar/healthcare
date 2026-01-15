import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../store'
import { formatAppointmentTime, getStatusColor } from '../utils'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AppointmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const appointment = useAppStore(state =>
    state.appointments.find(a => a.id === id)
  )
  
  if (!appointment) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-healthcare-blue hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="card p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">Appointment not found</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-healthcare-blue hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {appointment.patientName}
            </h1>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Date & Time</p>
                <p className="font-semibold">{formatAppointmentTime(appointment.dateTime)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Type</p>
                <p className="font-semibold">{appointment.type}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Provider</p>
                <p className="font-semibold">{appointment.provider}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Location</p>
                <p className="font-semibold">{appointment.location}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Insurance Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Provider</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{appointment.insurance}</p>
                </div>
                <span className={`badge ${getStatusColor(appointment.insuranceStatus)}`}>
                  {appointment.insuranceStatus}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Copay</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {appointment.copay ? `$${appointment.copay}` : '—'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">ID</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{appointment.patientId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
            <button className="btn btn-primary w-full mb-2">
              Re-verify Insurance
            </button>
            <button className="btn btn-secondary w-full">
              View Patient File
            </button>
          </div>
          
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Status Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Insurance Status</span>
                <span className={`badge ${getStatusColor(appointment.insuranceStatus)}`}>
                  {appointment.insuranceStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetail
