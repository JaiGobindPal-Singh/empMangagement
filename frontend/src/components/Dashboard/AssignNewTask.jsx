import React, { useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useContext } from 'react'
import Loader from '../Loader/Loader.jsx'
import { useEffect } from 'react'
const AssignNewTask = (props) => {
  const Port = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [employeesData, setEmployeesData] = useState([])
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
      setEmployeesData(employeesData)
    }
    fetchData()
    setLoading(false)
  }, [])
  const [Title, setTitle] = useState('')
  const [Priority, setPriority] = useState('low')
  const [Category, setCategory] = useState('')
  const [Date, setDate] = useState('')
  const [Description, setDescription] = useState('')

  // submit handler updates the local storage with the new task
  const submitHandler = async (e) => {
    e.preventDefault()
    const task = {
      title: Title,
      priority: Priority,
      category: Category,
      date: Date,
      description: Description,
      status: 'new'
    }
    const employees = employeesData
    const emp = employees.find(e => e.id === props.employee.id)
    emp.tasks.push(task)
    emp.totalTasks += 1
    emp.newTasks += 1
    //modify database
    const resp = await fetch(`${Port}/modifyEmployees`, {method:'POST',headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify(employees)}).then(res=>res.json())
    setTitle('')
    setPriority('low')
    setCategory('')
    setDate('')
    setDescription('')

    //sending the done message to the user
    if(resp==='done'){
      document.querySelector('.taskAdded').style.opacity = '1'
      setTimeout(() => {
        document.querySelector('.taskAdded').style.opacity = '0'
      }, 1000);
    }
  }

  // view
  return (
    <div className=' pt-10 w-full'>
      <div className='flex items-center h-[60%] bg-[#1C1C1F] rounded mt-20'>
        <form className='flex justify-between max-md:justify-normal max-md:flex-col w-full px-14 max-md:px-5 ' onSubmit={submitHandler}>
          <div className='left w-[40%] max-md:w-full flex flex-col'>
            <div className='mb-3'>
              <h3>
                Task Title
              </h3>
              <input className='bg-transparent border border-white px-1 w-[100%] rounded' type="text" name="" id="" placeholder='Enter the task title' value={Title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className='mb-3'>
              <h3>
                Task Priority
              </h3>
              <div className="flex gap-5">

                <div>
                  <input type="radio" name="priority" id="low" onClick={e => { setPriority('low') }} />
                  <label htmlFor="low">Low</label>
                </div>

                <div>
                  <input type="radio" name="priority" id="medium" onClick={e => { setPriority('medium') }} />
                  <label htmlFor="medium">Medium</label>
                </div>

                <div>
                  <input type="radio" name="priority" id="high" onClick={e => { setPriority('high') }} />
                  <label htmlFor="high">High</label>
                </div>
              </div>

            </div>

            <div className='mb-3'>
              <h3>Date</h3>
              <input className='bg-transparent border border-white px-1 w-[100%] rounded text-white' type="date" id='taskDate' value={Date} onChange={e => { setDate(e.target.value) }} required />
            </ div>

            <div className='mb-3'>
              <h3>Category</h3>
              <input className='bg-transparent border border-white px-1 w-[100%] rounded' type="text" name="" id="" placeholder='design, development, etc' value={Category} onChange={(e) => setCategory(e.target.value)} required />
            </div>

          </div >
          <div className="right w-[55%] max-md:w-full">
            <h3>Description</h3>
            <textarea required name=""  id="" placeholder='Enter Description Here' className='bg-transparent p-1 border border-white w-full h-[71%] max-md:h-20' value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <br />
            <input type="submit" value='Create Task' className=' bg-red-600 w-[100%] py-1 rounded font-medium hover:bg-red-700' />
          </div>
        </form>
      </div>
<div className='taskAdded w-[100%] max-md:text-sm duration-500 ease-linear transition-all bottom-2 bg-red-400 font-semibold text-balance mt-2 py-2 px-2 rounded-xl justify-center flex opacity-0'>Task Added Successfully</div>
    </div>
  )
}

export default AssignNewTask
