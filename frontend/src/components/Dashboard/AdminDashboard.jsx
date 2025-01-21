import React, { useContext, useState, useEffect, useMemo } from 'react';
import Header from '../../Others/Header';
import AllEmployees from './AllEmployees';
import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import OldEmployees from './OldEmployees';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../loader/loader';
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const Port = useContext(AuthContext)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { employeesData, adminData } = await fetch(`${Port}/login`, { method: 'POST' }).then(res => res.json())
      setEmployeesData(employeesData);

    }
    fetchData()
    setLoading(false)
  }, [])

  const UserData = employeesData
  const [totalTasks, setTotalTasks] = useState(0);
  const [activeTasks, setActiveTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [failedTasks, setFailedTasks] = useState(0);

  useEffect(() => {
    let total = 0;
    let active = 0;
    let completed = 0;
    let failed = 0;
    {
      UserData ?
        UserData.forEach((user) => {
          total += user.tasks.length;
          user.tasks.forEach((task) => {
            if (task.status === 'active') {
              active += 1;
            } else if (task.status === 'completed') {
              completed += 1;
            } else if (task.status === 'failed') {
              failed += 1;
            }
          });
        }) : ''
    }

    setTotalTasks(total);
    setActiveTasks(active);
    setCompletedTasks(completed);
    setFailedTasks(failed);
  }, [UserData]);

  const [ModifyEmp, setModifyEmp] = useState('')

  //function to add new employee
  const addNewEmployee = () => {
    setModifyEmp('add')
  }

  //function to remove employee
  const removeEmployee = () => {
    setModifyEmp('remove')
  }

  //function to show old employees
  const showOldEmployee = () => {
    setModifyEmp('old')
  }

  //view
  if (loading) {
    return (<><Loader /></>)
  }
  return (
    <>
      {ModifyEmp === 'add' ? <>
        <button className='absolute top-9 right-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded' onClick={() => setModifyEmp('')}>Back</button>
        <AddEmployee /></> : ModifyEmp === 'remove' ? <>
          <button className='absolute top-9 right-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded' onClick={() => setModifyEmp('')}>Back</button>
          <RemoveEmployee /></> : ModifyEmp === 'old' ? <><button className='absolute top-9 right-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded' onClick={() => setModifyEmp('')}>Back</button>
            <OldEmployees /></> :
        <>
          <Header />
          <div className='p-10 bg-[#1C1C1C] h-screen'>
            <>
              <div className='flex max-md:flex-wrap w-full gap-5 mt-10 justify-center'>
                <div className='max-md:w-[100px] max-md:h-[100px] bg-blue-500 w-[300px] h-[300px] rounded-xl px-4'>
                  <h1 className='text-white w-[100%] max-md:mt-1 max-md:pt-1 max-md:pb-0 max-md:text-2xl mt-16 py-5 text-6xl font-semibold'>{totalTasks}</h1>
                  <h2 className='text-3xl font-semibold max-md:text-[15px] max-md:leading-5 break-normal'>Total Tasks</h2>
                </div>
                <div className='max-md:w-[100px] max-md:h-[100px] bg-yellow-500 w-[300px] h-[300px] rounded-xl px-4'>
                  <h1 className='text-white w-[100%] max-md:mt-1 max-md:pt-1 max-md:pb-0 max-md:text-2xl mt-16 py-5 text-6xl font-semibold'>{activeTasks}</h1>
                  <h2 className='text-3xl font-semibold max-md:text-[15px] max-md:leading-5 break-normal'>Active Tasks</h2>
                </div>

                <div className='max-md:w-[100px] max-md:h-[100px] bg-green-500 w-[300px] h-[300px] rounded-xl px-4'>
                  <h1 className='text-white w-[100%] max-md:mt-1 max-md:pt-1 max-md:pb-0 max-md:text-2xl mt-16 py-5 text-6xl font-semibold'>{completedTasks}</h1>
                  <h2 className='text-3xl font-semibold max-md:text-[15px] max-md:leading-5 break-normal'>Completed Tasks</h2>
                </div>
                <div className='max-md:w-[100px] max-md:h-[100px] bg-red-500 w-[300px] h-[300px] rounded-xl px-4'>
                  <h1 className='text-white w-[100%] max-md:mt-1 max-md:pt-1 max-md:pb-0 max-md:text-2xl mt-16 py-5 text-6xl font-semibold'>{failedTasks}</h1>
                  <h2 className='text-3xl font-semibold max-md:text-[15px] max-md:leading-5 break-normal'>Failed Tasks</h2>
                </div>
              </div>
              <div className="allEmpWrapper mt-6 h-[34%] overflow-auto">
                <h1 className='text-white text-4xl font-semibold max-md:text-2xl'>All Employees</h1>
                <div className="buttons flex gap-5 max-sm:gap-y-2 max-sm:gap-x-1 flex-wrap mt-5">
                  <button className=' px-4 py-2 bg-green-600 font-semibold rounded-xl hover:bg-green-700 max-md:px-2 max-md:py-1 max-sm:px-2 max-[430px]:w-[49%]  max-sm:text-xs max-md:text-sm' onClick={addNewEmployee}>New Employee +</button>
                  <button className=' px-4 py-2 bg-red-600 font-semibold rounded-xl hover:bg-red-700 max-md:px-2 max-md:py-1 max-[430px]:w-[49%] max-sm:text-xs max-md:text-sm' onClick={removeEmployee}>Remove Employee</button>
                  <button className=' px-4 py-2 bg-orange-600 font-semibold rounded-xl hover:bg-orange-700 max-md:px-3 max-md:py-1 max-sm:px-3 max-[430px]:w-full max-sm:text-xs max-md:text-sm' onClick={showOldEmployee}>Old Employees</button>
                </div>
                <AllEmployees />
              </div>
            </>
          </div>
        </>
      }
    </>
  );
};

export default AdminDashboard;
