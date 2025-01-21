import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TaskList from '../components/TaskList/TaskList'
const TaskListNumbers = (props) => {
  const currUserData = JSON.parse(localStorage.getItem('loggedInUser')).data
  const activeTasks = currUserData.activeTasks
  const newTask = currUserData.newTasks
  const completedTask = currUserData.completedTasks
  const failedTask = currUserData.failedTasks
  const [TaskType, setTaskType] = useState('all')
  return (
    <>
    
    <div className='flex max-md:mt-5 mt-10 justify-center max-md:flex-wrap gap-5 max-md:gap-2 w-full'>
      <div onClick={()=>{setTaskType('new')}} className=" newTask py-6 px-9 max-md:py-3 max-md:px-4 rounded-xl w-full bg-blue-500 hover:bg-blue-600 cursor-pointer">
        <h2 className='text-xl font-semibold max-md:text-lg'>{newTask}</h2>
        <h3 className='text-2xl font-medium max-md:text-xl'>New Task</h3>
      </div>
      <div onClick={()=>{setTaskType('completed')}} className=" completedTask max-md:py-3 max-md:px-4 py-6 px-9 rounded-xl w-full bg-green-500 hover:bg-green-600 cursor-pointer">
        <h2 className='text-xl font-semibold max-md:text-lg'>{completedTask}</h2>
        <h3 className='text-2xl font-medium max-md:text-xl'>Completed Task</h3>
      </div>
      <div onClick={()=>{setTaskType('active')}} className=" activeTask max-md:py-3 max-md:px-4 py-6 px-9 rounded-xl w-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer">
        <h2 className='text-xl font-semibold max-md:text-lg'>{activeTasks}</h2>
        <h3 className='text-2xl font-medium max-md:text-xl'>Accepted Task</h3>
      </div>
      <div onClick={()=>{setTaskType('failed')}} className=" failedTask max-md:py-3 max-md:px-4 py-6 px-9 rounded-xl w-full bg-red-500 hover:bg-red-600 cursor-pointer">
        <h2 className='text-xl font-semibold max-md:text-lg'>{failedTask}</h2>
        <h3 className='text-2xl font-medium max-md:text-xl'>Failed Task</h3>
      </div>
    </div>
    <TaskList key={uuidv4} taskType={TaskType} setReRender ={props.setReRender}/>
    </>
  )
}

export default TaskListNumbers
