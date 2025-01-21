import { useState, useEffect, useContext,useMemo } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import { AuthContext } from './context/AuthProvider'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
function App() {
  const Port = useContext(AuthContext)
  // console.log(Port)
  const [UserType, setUserType] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUserType(JSON.parse(loggedInUser).role)
    }
  }, [])

  //function to handle login
  const handleLogin = async (email, password) => {
    const { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
    let user = null
    let admin = null
    if (employeesData) {
      user = employeesData.find(e => e.email === email && e.password === password)
    }
    if (adminData) {
      admin = adminData.find(e => e.email === email && e.password === password)
    }
    if (user) {
      setUserType('Employee')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Employee', data: user }))
    }
    else if (admin) {
      setUserType('Admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Admin', data: admin }))
    }
    else {
      alert('Invalid credentials')
    }
  }

  //page layout
  return (
    <>
      {!UserType ? <Login handleLogin={handleLogin} /> : UserType === 'Admin' ? <AdminDashboard /> : <EmployeeDashboard />}

    </>
  )
}

export default App
