import React from 'react'
import { useState } from 'react'
const Login = (props) => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const submitHandler = (e)=>{
    e.preventDefault()
    props.handleLogin(Email,Password)
    setEmail('')
    setPassword('')
  }
  return (
    <>
    
    <div className='flex items-center justify-center h-screen w-screen flex-col '>
      <div className=" bg-[#1C1C1C] rounded p-14 flex items-center justify-center flex-col space-y-7 ">
        <h1 className='text-4xl mb-7'>Login</h1>

        <form action="" onSubmit={submitHandler} className='flex flex-col space-y-4 items-center'>
          <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='outline-none border-2 border-red-600 bg-transparent rounded-3xl px-4 py-2' type="email" placeholder="Enter Your Email" name="user" id="user" required/>
          <input value={Password} onChange={(e)=>setPassword(e.target.value)}  className='outline-none border-2 border-red-600 bg-transparent rounded-3xl px-4 py-2' type="password" placeholder='Enter Password' name="pass" id="pass" required/>
          <button  className=' bg-red-600 rounded-3xl px-4 py-2 hover:bg-red-700'>Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
