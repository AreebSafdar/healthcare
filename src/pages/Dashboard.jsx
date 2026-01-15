import React, { useState, useMemo } from 'react'
import { useAppStore } from '../store'
import { formatAppointmentTime, getStatusColor } from '../utils'
import { Search, Filter, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import AppointmentModal from '../components/AppointmentModal'

function Dashboard() {
  const appointments = useAppStore(state => state.appointments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [timeRange, setTimeRange] = useState(48)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  
  const appointmentsInRange = useMemo(() => {
    const now = new Date()
    const endTime = new Date(now.getTime() + timeRange * 60 * 60 * 1000)
    
    return appointments
      .filter(apt => apt.dateTime >= now && apt.dateTime <= endTime)
      .filter(apt => {
        if (statusFilter !== 'all' && apt.insuranceStatus !== statusFilter) {
          return false
        }
        if (searchTerm && !apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false
        }
        return true
      })
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
  }, [appointments, searchTerm, statusFilter, timeRange])
  
  const stats = {
    total: appointmentsInRange.length,
    verified: appointmentsInRange.filter(a => a.insuranceStatus === 'Verified').length,
    needsReview: appointmentsInRange.filter(a => a.insuranceStatus === 'Needs Review').length,
    expired: appointmentsInRange.filter(a => a.insuranceStatus === 'Expired').length,
  }
  
  return (
    <div className="p-4 md:p-8">
      {/* Header with gradient background */}
      <div className="mb-8 bg-gradient-to-r from-healthcare-blue/10 to-blue-500/10 dark:from-healthcare-blue/20 dark:to-blue-500/20 rounded-xl p-8 border border-healthcare-blue/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">Appointment Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Manage insurance verification for upcoming appointments</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Appointments"
          value={stats.total}
          icon={Clock}
          color="bg-blue-500"
        />
        <StatCard
          label="Verified"
          value={stats.verified}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          label="Needs Review"
          value={stats.needsReview}
          icon={AlertCircle}
          color="bg-amber-500"
        />
        <StatCard
          label="Expired"
          value={stats.expired}
          icon={AlertCircle}
          color="bg-red-500"
        />
      </div>
      
      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Expired">Expired</option>
          </select>
          
          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="input-field"
          >
            <option value={48}>Next 48 Hours</option>
            <option value={72}>Next 72 Hours</option>
            <option value={168}>Next 7 Days</option>
          </select>
        </div>
      </div>
      
      {/* Appointments List */}
      <div className="card overflow-hidden">
        {appointmentsInRange.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Appointment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Insurance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Copay</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsInRange.map(apt => (
                  <tr
                    key={apt.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{apt.patientName}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{apt.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{formatAppointmentTime(apt.dateTime)}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{apt.provider} • {apt.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{apt.insurance}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getStatusColor(apt.insuranceStatus)}`}>
                        {apt.insuranceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">
                        {apt.copay ? `$${apt.copay}` : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedAppointment(apt)}
                        className="text-healthcare-blue hover:text-blue-700 font-medium flex items-center gap-1 ml-auto"
                      >
                        View
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No appointments found in this time range</p>
          </div>
        )}
      </div>
      
      {/* Appointment Modal */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
