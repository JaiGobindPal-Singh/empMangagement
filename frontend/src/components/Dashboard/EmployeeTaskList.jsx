import React from 'react'
import { v4 as uuidv4 } from 'uuid'
const EmployeeTaskList = (props) => {
    const employee = props.employee
    const allTasks = employee.tasks
    let arr = []
    const checkType = (e)=>{
        return e.status == props.type
    }
    props.type == 'all'?arr= allTasks: arr = allTasks.filter(checkType)
  return (
    <>
        <div id='tasklist' className=' rounded-xl mt-2 w-[100%] py-4 gap-5 flex flex-nowrap overflow-x-auto '>
            {arr.length == 0?<div className='h-[320px] w-[100%] flex justify-center items-center'><h1 className='text-3xl text-gray-500'>Nothing to Show!</h1></div>:''}
            {arr.map(
                (e) => {
                    return(
                        <div key={uuidv4()} className={' bg-red-500 px-2 h-[320px] w-[320px] flex-shrink-0 rounded-xl relative max-md:h-[200px] max-md:w-[200px]'}>
                        <div className="flex justify-between p-5 max-md:p-2">
                            <h3 className={e.priority=='high'?'px-3 py-1 rounded text-sm bg-red-700 max-md:px-2 max-md:py-1 max-md:text-[10px]':e.priority == 'medium' ?'max-md:py-1 max-md:px-2 px-3 py-1 rounded text-sm bg-orange-500 max-md:text-[10px]':'max-md:py-1 max-md:px-2 max-md:text-[10px] px-3 py-1 rounded text-sm bg-green-700'}>{e.priority}</h3>

                            <h3 className={e.status=='completed'?'max-md:py-1 max-md:px-2 max-md:text-[10px] px-3 py-1 rounded text-sm bg-green-700':e.status == 'active' ?'max-md:py-1 max-md:px-2 max-md:text-[10px] px-3 py-1 rounded text-sm bg-orange-700':e.status=='new'?'max-md:px-2 max-md:py-1 max-md:text-[10px] px-3 py-1 rounded text-sm bg-blue-500':'max-md:px-2 max-md:py-1 max-md:text-[10px] px-3 py-1 rounded text-sm bg-red-700'}>{e.status}</h3>
                            <h4 className='max-md:text-[10px] flex items-center'>{e.date}</h4>
                        </div>
                        <h2 className='mt-5 text-2xl font-semibold break-normal '>{e.title}</h2>
                        <p className='text-sm mt-1 break-normal'>{e.description}</p>
                    </div>
                    )
                }
            )}
        </div>
                </>
  )
}

export default EmployeeTaskList
