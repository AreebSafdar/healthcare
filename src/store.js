import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: (email, password) => {
    set({ isLoading: true, error: null })
    setTimeout(() => {
      if (email && password && email.includes('@')) {
        // Determine role based on email pattern
        let role = 'front-desk'
        if (email.toLowerCase().includes('admin')) {
          role = 'admin'
        } else if (email.toLowerCase().includes('billing')) {
          role = 'billing'
        }
        
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
            role: role,
            clinic: 'City Medical Clinic'
          },
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        set({
          error: 'Invalid email or password',
          isLoading: false
        })
      }
    }, 1000)
  },
  
  signup: (clinicName, userName, email, password, role) => {
    set({ isLoading: true, error: null })
    setTimeout(() => {
      set({
        user: {
          id: '1',
          email,
          name: userName,
          role: role || 'front-desk',
          clinic: clinicName || 'City Medical Clinic'
        },
        isAuthenticated: true,
        isLoading: false,
        error: null
      })
    }, 1000)
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false })
  }
}))

export const useAppStore = create((set, get) => ({
  appointments: [],
  alerts: [],
  patients: {},
  theme: localStorage.getItem('theme') || 'light',
  
  initializeMockData: () => {
    // Generate mock appointments
    const now = new Date()
    const appointments = []
    const insuranceProviders = ['Blue Cross', 'Aetna', 'Cigna', 'UnitedHealth', 'Humana']
    const statuses = ['Verified', 'Needs Review', 'Expired']
    const patientNames = [
      'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
      'Robert Wilson', 'Jessica Garcia', 'David Martinez', 'Lisa Anderson'
    ]
    
    for (let i = 0; i < 12; i++) {
      const appointmentTime = new Date(now.getTime() + (i * 2) * 60 * 60 * 1000)
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const copay = status === 'Verified' ? Math.floor(Math.random() * 100) + 20 : null
      const appointmentStatus = ['Upcoming', 'Completed', 'Blocked'][Math.floor(Math.random() * 3)]
      
      const appointment = {
        id: `apt-${i + 1}`,
        patientName: patientNames[i % patientNames.length],
        patientId: `pt-${i + 1}`,
        dateTime: appointmentTime,
        provider: 'Dr. ' + ['Smith', 'Johnson', 'Williams', 'Brown'][i % 4],
        insurance: insuranceProviders[i % insuranceProviders.length],
        insuranceStatus: status,
        appointmentStatus: appointmentStatus,
        copay,
        location: ['Room 101', 'Room 202', 'Room 303'][i % 3],
        clinic: ['Cardiology Clinic', 'General Practice', 'Surgery Department'][i % 3],
        type: ['Checkup', 'Follow-up', 'Consultation', 'Procedure'][i % 4],
        lastVerified: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        notes: ''
      }
      
      appointments.push(appointment)
    }
    
    set({ appointments })
  },
  
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme }
    })
  },
  
  addAlert: (alert) => {
    const id = `alert-${Date.now()}`
    const newAlert = {
      id,
      ...alert,
      timestamp: new Date(),
      resolved: false
    }
    set((state) => ({
      alerts: [newAlert, ...state.alerts]
    }))
    return id
  },
  
  removeAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.filter(a => a.id !== alertId)
    }))
  },
  
  resolveAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId ? { ...a, resolved: true } : a
      )
    }))
  },
  
  updateAppointmentStatus: (appointmentId, status) => {
    set((state) => ({
      appointments: state.appointments.map(apt =>
        apt.id === appointmentId
          ? {
              ...apt,
              insuranceStatus: status,
              copay: status === 'Verified' ? apt.copay || Math.floor(Math.random() * 100) + 20 : null,
              lastVerified: new Date()
            }
          : apt
      )
    }))
    
    const apt = get().appointments.find(a => a.id === appointmentId)
    if (apt && status !== 'Verified') {
      get().addAlert({
        type: 'insurance_' + status.toLowerCase().replace(' ', '_'),
        severity: status === 'Expired' ? 'critical' : 'warning',
        title: `Insurance ${status}`,
        message: `${apt.patientName}'s insurance needs attention`,
        appointmentId,
        patientId: apt.patientId
      })
    }
  },
  
  getUnresolvedAlerts: () => {
    return get().alerts.filter(a => !a.resolved)
  },
  
  getAppointmentsInRange: (hoursFromNow = 48) => {
    const now = new Date()
    const endTime = new Date(now.getTime() + hoursFromNow * 60 * 60 * 1000)
    
    return get().appointments.filter(apt => 
      apt.dateTime >= now && apt.dateTime <= endTime
    )
  }
}))
