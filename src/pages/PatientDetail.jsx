import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { formatAppointmentTime, getStatusColor } from '../utils'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const appointments = useAppStore(state => state.appointments)
  const patientAppointments = appointments.filter(a => a.patientId === id)
  
  if (patientAppointments.length === 0) {
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
          <p className="text-slate-600 dark:text-slate-400">Patient not found</p>
        </div>
      </div>
    )
  }
  
  const patient = patientAppointments[0]
  
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
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {patient.patientName}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">ID: {patient.patientId}</p>
              </div>
              <img 
                src={`https://ui-avatars.com/api/?name=${patient.patientName}&background=0F6BFF&color=fff`}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                  <p className="font-semibold">{patient.patientName.toLowerCase().replace(' ', '.')}@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                  <p className="font-semibold">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Location</p>
                  <p className="font-semibold">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Insurance */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Current Insurance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Provider</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{patient.insurance}</p>
                </div>
                <span className={`badge ${getStatusColor(patient.insuranceStatus)}`}>
                  {patient.insuranceStatus}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Copay</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {patient.copay ? `$${patient.copay}` : '—'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Deductible</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">$500</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Plan Type</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">PPO</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Appointment History */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Appointment History
            </h2>
            
            <div className="space-y-2">
              {patientAppointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{apt.type}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{formatAppointmentTime(apt.dateTime)}</p>
                  </div>
                  <span className={`badge ${getStatusColor(apt.insuranceStatus)}`}>
                    {apt.insuranceStatus}
                  </span>
                </div>
              ))}
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
              Schedule Appointment
            </button>
          </div>
          
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Total Appointments</span>
                <span className="font-semibold">{patientAppointments.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Verified</span>
                <span className="font-semibold text-green-600">
                  {patientAppointments.filter(a => a.insuranceStatus === 'Verified').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Needs Review</span>
                <span className="font-semibold text-amber-600">
                  {patientAppointments.filter(a => a.insuranceStatus === 'Needs Review').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetail
