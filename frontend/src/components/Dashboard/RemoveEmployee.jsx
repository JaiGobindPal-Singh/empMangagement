import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Loader from '../Loader/Loader.jsx'
const RemoveEmployee = () => {
    const [Id, setId] = useState('')
    const [Email, setEmail] = useState('')
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

    const submitHandler = async (e) => {
        e.preventDefault()
        const conf = confirm('Are you sure you want to remove this employee?')
        if (conf) {
            const emp = employeesData.find(K => { return K.id == Id && K.email === Email })
            try {
                const employees = employeesData.filter(K => K.id != emp.id)
                if(employees){
                    try {
                        const ob = {
                            name: emp.name,
                            email: emp.email,
                        }
                        await fetch(`${Port}/modifyEmployees`, {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json'
                            }, body: JSON.stringify(employees)
                        })
                        //storing in obselete collection
                        await fetch(`${Port}/makeObsolete`, {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json'
                            }, body: JSON.stringify(ob)
                        })
                        alert('Employee Removed Successfully')
                        setId('')
                        setEmail('')
                    } catch (e) {
                        alert('Error Removing Employee')
                    }
                }
            } catch (e) {
                alert('Employee not found')
            }
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div className=' pt-10 w-full'>
                <h1 className='text-white text-4xl font-semibold mb-7 px-5 max-sm:text-3xl '>Remove Employee</h1>
                <div className='flex items-center h-[60%] bg-[#1C1C1F] rounded mt-20'>
                    <form className='flex justify-center max-md:justify-normal max-md:flex-col w-full px-14 max-md:px-5 ' onSubmit={submitHandler}>
                        <div className='left w-[80%] max-md:w-full flex flex-col'>
                            <div className='mb-3'>
                                <h3>Employee ID</h3>
                                <input className='bg-transparent border border-white px-1 w-[100%] rounded text-white' type="text" id='name' placeholder='enter employee ID' value={Id} onChange={e => { setId(e.target.value) }} required />
                            </ div>

                            <div className='mb-3'>
                                <h3>Employee Email</h3>
                                <input className='bg-transparent border border-white px-1 w-[100%] rounded' type="email" name="" id="" placeholder='enter email here' value={Email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div>
                                <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold' type='submit'>
                                    Remove Employee -
                                </button>
                            </div>
                        </div >
                    </form>
                </div>

            </div>

        </div>
    )
}

export default RemoveEmployee
