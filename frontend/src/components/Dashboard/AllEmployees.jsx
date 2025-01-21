import React, { useEffect, useState } from 'react'
import EmployeeDetails from './EmployeeDetails'
import { AuthContext } from '../../context/AuthProvider'
import { useContext } from 'react'
import Loader from '../Loader/Loader.jsx'
const AllEmployees = () => {
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
    },[])
    const allEmployees = employeesData
    //detEle denotes that particular employee whose details are to be shown
    const [detEle, setDetEle] = useState(null)

    if (loading) {
        return (<><Loader /></>)
    }
    return (
        <div className='flex gap-5 flex-wrap w-full'>
            {detEle ? (
                <div className='fixed inset-0 bg-[#1C1C1C] z-50 p-5'>
                    <EmployeeDetails employee={detEle} />
                    <button onClick={() => setDetEle(null)} className='absolute top-10 right-5 bg-red-500 text-white px-4 py-2 rounded'>Back</button>
                </div>
            ) : (
                <div className='mt-2 flex gap-3 flex-wrap w-full'>
                    {allEmployees?allEmployees.map((emp) => {
                        return (
                            <div onClick={() => setDetEle(emp)} key={emp.id} className="flex w-[100%] bg-red-500 h-10 rounded-xl px-10 items-center justify-between hover:bg-red-600 hover:cursor-pointer ">
                                <div className='flex items-center gap-10 w-[40%] max-md:w-[100%] overflow-hidden'>
                                <h1 className='font-semibold capitalize text-[15px] max-md:text-[12px]'>{emp.id}</h1>
                                <h1 className='font-semibold capitalize text-[15px] max-md:text-[12px] overflow-hidden'>{emp.name}</h1>
                                </div>
                                <h1 className='max-md:hidden'>|</h1>
                                <h1 className='font-semibold capitalize text-[15px] max-md:hidden '>Assigned Tasks: {emp.totalTasks}</h1>
                                <h1 className='font-semibold capitalize text-[15px] max-md:hidden'>Completed Tasks: {emp.completedTasks}</h1>
                                <h1 className='font-semibold capitalize text-[15px] max-md:hidden'>Failed Tasks: {emp.failedTasks}</h1>
                            </div>
                        )
                    }):''}
                </div>
            )}
        </div>
    )
}

export default AllEmployees
