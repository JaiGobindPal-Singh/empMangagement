import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../Loader/Loader.jsx';

//this file contains display the tasks based on the type and status of task
// const {employeesData,adminData} = await fetch(`${Port}/login`,{method:'POST'}).then(res=>res.json())
const TaskList = (props) => {
    const [loading, setLoading] = useState(true)
    const Port = useContext(AuthContext)
    let currUser = JSON.parse(localStorage.getItem('loggedInUser')).data
    const allTasks = currUser.tasks
    const type = props.taskType
    const [count, setCount] = useState(0)  //it is used to force rerender the component
    
    //this useeffect modifies the logged in user data in the database when changes are made by the employee
    useEffect(() => {
        setLoading(true)
        const modifyEmployeesData = async () => {
            try{
                const currUser = JSON.parse(localStorage.getItem('loggedInUser')).data
                let { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
                const idx = employeesData.findIndex((e) => {return e.id == currUser.id })
                employeesData[idx] = currUser
                await fetch(`${Port}/modifyEmployees`, {
                    method: "POST", headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify(employeesData)
                })
                setLoading(false)
                props.setReRender(count)   //to rerender the component when changes are made
            }catch(e){
                console.log(e)
            }
        }
        modifyEmployeesData()
    }, [count])

    //functions to change the state of tasks
    const makeActive = async (e, fail = false) => {
        const idx = allTasks.indexOf(e)
        allTasks[idx].status = 'active'
        currUser.tasks = allTasks
        if (fail) {
            currUser.failedTasks -= 1
        }
        else {
            currUser.newTasks -= 1
        }
        currUser.activeTasks += 1
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Employee', data: currUser }))
        setCount(count + 1)
    }
    const makeCompleted = (e) => {
        const idx = allTasks.indexOf(e)
        allTasks[idx].status = 'completed'
        currUser.tasks = allTasks
        currUser.completedTasks += 1
        currUser.activeTasks -= 1
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Employee', data: currUser }))
        setCount(count + 1)
    }
    const makeFailed = (e) => {
        const idx = allTasks.indexOf(e)
        allTasks[idx].status = 'failed'
        currUser.tasks = allTasks
        currUser.failedTasks += 1
        currUser.activeTasks -= 1
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Employee', data: currUser }))
        setCount(count + 1)
    }

    //function to set the button element and change the state of the task
    const setElement = (e) => {
        let element = ''
        if (type == 'new') {
            element = <><button className='hover:bg-green-700 bg-green-600  text-white px-4 py-1 rounded' onClick={() => { makeActive(e) }}>Start</button></>
        }
        else if (type == 'active') {
            element = <><button className='hover:bg-green-700 bg-green-600  text-white px-4 py-1 max-sm:px-2 max-sm:py-1 max-sm:text-xs rounded' onClick={() => { makeCompleted(e) }}>Mark as <br />Completed</button><button className='hover:bg-red-700 bg-orange-600  text-white px-4 py-1 rounded max-sm:px-2 max-sm:py-1 max-sm:text-xs' onClick={() => { makeFailed(e) }}>Mark as <br />Failed</button></>
        }
        else if (type == 'failed') {
            element = <><button className='hover:bg-green-700 bg-green-600  text-white px-4 py-1 rounded' onClick={() => { makeActive(e, true) }}>ReStart</button></>
        }
        else if (type == 'completed') {
            element = <><button className='hover:cursor-default bg-green-600  text-white px-4 py-1 rounded' >Completed ✔️</button></>
        }
        else {
            element = ''
        }
        return element
    }

    //filtering the tasks based on the status and storing in arr[]
    let arr = []
    const checkType = (e) => {
        return e.status == type
    }
    type == 'all' ? arr = allTasks : arr = allTasks.filter(checkType)
    if(loading){
        return <Loader/>
    }
    return (
        <>
            <div id='tasklist' className=' max-md:h-[45%] h-[55%] rounded-xl mt-10 w-full py-4 gap-5 flex flex-nowrap overflow-x-auto'>
                {arr.length ? arr.map(
                    (e) => {
                        return (
                            <div key={uuidv4()} className={'max-sm:w-[200px] bg-red-500 px-2 h-full w-[320px] flex-shrink-0 rounded-xl relative'}>
                                <div className="flex justify-between p-5 max-sm:p-2">
                                    <h3 className={e.priority == 'high' ? ' max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-red-700' : e.priority == 'medium' ? 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-orange-500' : 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-green-700'}>{e.priority}</h3>
                                    <h3 className={e.status == 'completed' ? 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-green-700' : e.status == 'active' ? 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-orange-700' : e.status == 'new' ? 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-blue-500' : 'max-sm:px-1 max-sm:py-1 max-sm:text-[10px] px-3 py-1 rounded text-sm bg-red-700'}>{e.status}</h3>
                                    <h4 className='max-sm:px-1 max-sm:py-1 max-sm:text-[10px]'>{e.date}</h4>
                                </div>
                                <h2 className='mt-5 text-2xl font-semibold '>{e.title}</h2>
                                <p className='text-sm mt-1'>{e.description}</p>
                                <div className="lowerPart absolute w-[95.5%] flex bottom-0 mb-2 justify-center gap-3">
                                    {setElement(e)}
                                </div>
                            </div>
                        )
                    }
                ) : <div className='flex items-center w-[100%] justify-center text-3xl text-gray-700'><h1>Nothing To Show!</h1></div>}
            </div>
        </>
    )
}

export default TaskList
