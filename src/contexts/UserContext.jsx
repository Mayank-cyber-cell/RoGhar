import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'worker' or 'doctor'

  // Mock data for demonstration
  const [workers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      aadhar: '123456789012',
      abha: '12345678901234',
      phone: '9876543210',
      address: 'Kochi, Kerala',
      password: 'password123'
    }
  ])

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Priya Nair',
      email: 'priya@hospital.com',
      password: 'doctor123',
      hospital: 'Government Medical College, Kochi',
      specialization: 'General Medicine'
    }
  ])

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      workerId: 1,
      doctorId: 1,
      date: '2025-01-20',
      time: '10:00',
      reason: 'Regular checkup',
      status: 'confirmed',
      hospital: 'Government Medical College, Kochi'
    }
  ])

  const [healthRecords, setHealthRecords] = useState([
    {
      id: 1,
      workerId: 1,
      date: '2025-01-15',
      type: 'General Checkup',
      doctor: 'Dr. Priya Nair',
      notes: 'Patient is in good health. Blood pressure normal.',
      prescription: 'Multivitamin tablets'
    }
  ])

  const [testReports, setTestReports] = useState([
    {
      id: 1,
      workerId: 1,
      date: '2025-01-10',
      type: 'Blood Test',
      reportUrl: '#',
      results: 'All parameters within normal range'
    }
  ])

  const loginWorker = (identifier, password) => {
    const worker = workers.find(w => 
      (w.aadhar === identifier || w.abha === identifier) && w.password === password
    )
    if (worker) {
      setCurrentUser(worker)
      setUserType('worker')
      return true
    }
    return false
  }

  const loginDoctor = (email, password) => {
    const doctor = doctors.find(d => d.email === email && d.password === password)
    if (doctor) {
      setCurrentUser(doctor)
      setUserType('doctor')
      return true
    }
    return false
  }

  const signupWorker = (userData) => {
    // In a real app, this would make an API call
    const newWorker = {
      id: workers.length + 1,
      ...userData
    }
    workers.push(newWorker)
    setCurrentUser(newWorker)
    setUserType('worker')
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    setUserType(null)
  }

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: appointments.length + 1,
      workerId: currentUser.id,
      ...appointmentData,
      status: 'pending'
    }
    setAppointments([...appointments, newAppointment])
    return true
  }

  const addHealthRecord = (recordData) => {
    const newRecord = {
      id: healthRecords.length + 1,
      workerId: currentUser.id,
      ...recordData
    }
    setHealthRecords([...healthRecords, newRecord])
  }

  const addTestReport = (reportData) => {
    const newReport = {
      id: testReports.length + 1,
      workerId: currentUser.id,
      ...reportData
    }
    setTestReports([...testReports, newReport])
  }

  const getWorkerAppointments = (workerId) => {
    return appointments.filter(apt => apt.workerId === workerId)
  }

  const getDoctorAppointments = (doctorId) => {
    return appointments.filter(apt => apt.doctorId === doctorId)
  }

  const getWorkerHealthRecords = (workerId) => {
    return healthRecords.filter(record => record.workerId === workerId)
  }

  const getWorkerTestReports = (workerId) => {
    return testReports.filter(report => report.workerId === workerId)
  }

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    ))
  }

  return (
    <UserContext.Provider value={{
      currentUser,
      userType,
      loginWorker,
      loginDoctor,
      signupWorker,
      logout,
      bookAppointment,
      addHealthRecord,
      addTestReport,
      getWorkerAppointments,
      getDoctorAppointments,
      getWorkerHealthRecords,
      getWorkerTestReports,
      updateAppointmentStatus,
      doctors,
      workers
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}