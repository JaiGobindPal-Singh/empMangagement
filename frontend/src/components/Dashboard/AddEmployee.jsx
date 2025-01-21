import React from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useContext } from 'react'
const AddEmployee = () => {
    const Port = useContext(AuthContext)
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')


    //write the submit logic here
    const submitHandler = async (e) => {
        e.preventDefault()
        const { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
        //fetch the id to be alloted to new employee
        const data = await fetch(`${Port}/Id`, { method: 'GET' }).then(res => res.json())
        const emp = {
            id: data,
            name: Name,
            email: Email,
            password: Password,
            tasks: [],
            totalTasks: 0,
            completedTasks: 0,
            failedTasks: 0,
            newTasks: 0,
            activeTasks: 0
        }
        employeesData.push(emp)
        //storing the new employee in the database
        const result = await fetch(`${Port}/modifyEmployees`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(employeesData)
        }).then(res => res.json())
        if (result === 'done') {
            alert('Employee Added Successfully')
            setName('')
            setEmail('')
            setPassword('')
        }
        else if (result === 'duplicate email') {
            alert('Employee with this email already exists')
            setEmail('')
        }
        else {
            alert('Error Adding Employee')
        }
    }
    //view
    return (
        <div className=' pt-10 w-full'>
            <h1 className='text-white text-4xl font-semibold mb-7 px-5 max-sm:text-3xl '>Add Employee</h1>
            <div className='flex items-center h-[60%] bg-[#1C1C1F] rounded mt-20'>
                <form className='flex justify-center max-md:justify-normal max-md:flex-col w-full px-14 max-md:px-5 ' onSubmit={submitHandler}>
                    <div className='left w-[80%] max-md:w-full flex flex-col'>
                        <div className='mb-3'>
                            <h3>Employee Name</h3>
                            <input className='bg-transparent border border-white px-1 w-[100%] rounded text-white' type="text" id='name' placeholder='enter employee name' value={Name} onChange={e => { setName(e.target.value) }} required />
                        </ div>

                        <div className='mb-3'>
                            <h3>Employee Email</h3>
                            <input className='bg-transparent border border-white px-1 w-[100%] rounded' type="email" name="" id="" placeholder='enter email here' value={Email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <h3>Set Password</h3>
                            <input className='bg-transparent border border-white px-1 w-[100%] rounded' type="text" name="" id="" placeholder='enter password for new employee' value={Password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold' type='submit'>
                                Add Employee +
                            </button>
                        </div>
                    </div >
                </form>
            </div>

        </div>
    )
}

export default AddEmployee
