import React, { useState } from 'react'
import EmployeeTaskList from './EmployeeTaskList'
import AssignNewTask from './AssignNewTask'
const EmployeeDetails = (props) => {
  const [taskType, setTaskType] = useState('all')
  const currUserData = props.employee
  const activeTasks = currUserData.activeTasks
  const newTask = currUserData.newTasks
  const completedTask = currUserData.completedTasks
  const failedTask = currUserData.failedTasks
  const [Clicked, setClicked] = useState(false)
  const addNewTask = () => {
    setClicked(true)
  }
  return (  
        <div className="overflow-y-auto h-full">
    <div>
        <h1 className='text-2xl w-[50%]' ><span className='text-4xl font-medium max-sm:text-2xl break-normal '> {props.employee.name}</span></h1>
      </div>
      {!Clicked?<>
        <div className='flex max-md:flex-wrap mt-10 justify-center gap-5 max-md:gap-2 w-full'>
          <div onClick={() => { setTaskType('new') }} className="w-full shrink-1 newTask py-6 px-9 max-md:px-4 max-md:py-2 rounded-xl bg-blue-500 hover:bg-blue-600">
            <h2 className='text-xl font-semibold max-md:lg'>{newTask}</h2>
            <h3 className='break-normal text-2xl font-medium max-md:text-lg'>Unaccepted Task</h3>
          </div>
          <div onClick={() => { setTaskType('completed') }} className="w-full shrink-1 completedTask py-6 px-9 max-md:px-4 max-md:py-2 rounded-xl  bg-green-500 hover:bg-green-600">
            <h2 className='text-xl font-semibold max-md:lg'>{completedTask}</h2>
            <h3 className='break-normal text-2xl font-medium max-md:text-lg'>Completed Task</h3>
          </div>
          <div onClick={() => { setTaskType('active') }} className="shrink-1 activeTask py-6 px-9 max-md:px-4 max-md:py-2 rounded-xl w-full  bg-yellow-500 hover:bg-yellow-600">
            <h2 className='text-xl font-semibold max-md:lg'>{activeTasks}</h2>
            <h3 className='break-normal text-2xl font-medium max-md:text-lg'>Accepted Task</h3>
          </div>
          <div onClick={() => { setTaskType('failed') }} className="shrink-1 failedTask py-6 px-9 max-md:px-4 max-md:py-2 rounded-xl w-full bg-red-500 hover:bg-red-600">
            <h2 className='text-xl font-semibold max-md:lg'>{failedTask}</h2>
            <h3 className='break-normal text-2xl font-medium max-md:text-lg'>Failed Task</h3>
          </div>
        </div>
        
        <button onClick={addNewTask} className='bg-green-600 py-2 px-4 mt-10 rounded-xl font-semibold hover:bg-green-700'>New Task +</button>
        <EmployeeTaskList employee={props.employee} type = {taskType} />
        </>
        :<AssignNewTask employee = {props.employee}/>
        }
      </div>
  )
}

export default EmployeeDetails
