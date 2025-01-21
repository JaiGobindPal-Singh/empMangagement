import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AuthContext } from '../../context/AuthProvider'
import { useContext } from 'react'
import Loader from '../loader/loader'
import { useState } from 'react'

//fetch the old employees data from the database
const OldEmployees = () => {
    const Port = useContext(AuthContext)
    const [oldData, setOldData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const oldData = await fetch(`${Port}/showObsolete`, { method: 'POST' }).then(res => res.json())
            setOldData(oldData)
        }
        fetchData()
        setLoading(false)
    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className='text-4xl mt-8 ml-5 max-md:text-3xl max-md:mt-9 max-sm:text-2xl max-sm:mt-9' >Old Employees</div>
            <div className='flex gap-5 flex-wrap w-full p-5 max-h-[80vh] items-center mt-10 overflow-auto'>

                {oldData.length ? oldData.map((emp) => {
                    return (
                        <div key={uuidv4()} className="container bg-gray-800 px-5 py-2 rounded-xl w-full">
                            <h1 className='text-3xl mb-2'>{emp.name}</h1>
                            <h1>Email: {emp.email}</h1>
                        </div>
                    )
                }) : <div className='w-full flex justify-center'>Nothing to show!</div>}
            </div>
        </>
    )
}

export default OldEmployees
