import React, { useEffect } from 'react'
import Header from '../../Others/Header'
import TaskListNumbers from '../../Others/TaskListNumbers'
import { useMemo } from 'react'
import { useContext } from 'react'
import Loader from '../Loader/Loader.jsx'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = () => {
  const [reRender, setReRender] = React.useState(0)
  const Port = useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  //update the employees data when changes are made in logged in employee
  useEffect(() => {
    setLoading(true)
    const loadToMemory = async () => {
      const { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
      try{
        let currUser = JSON.parse(localStorage.getItem('loggedInUser')).data
        let idx = employeesData.findIndex((e) => {return e.id == currUser.id })
        currUser = employeesData[idx]
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Employee', data: currUser }))
        setLoading(false)
      }catch(e){
        alert('unknown error occured\n' + e )
      }
    }
    loadToMemory()
  },[])

  let currUserData = null
  try {
    currUserData = JSON.parse(localStorage.getItem('loggedInUser')).data
  } catch {
    currUserData = null
  }
  if(loading){
    return <Loader />
  }
  return (
    <>
      <div className="p-10 bg-[#1C1C1C] h-screen">
        {currUserData ? <>
          <Header />
          <TaskListNumbers setReRender={setReRender} />
        </> : localStorage.removeItem('loggedInUser')}
      </div>
    </>
  )
}

export default EmployeeDashboard
