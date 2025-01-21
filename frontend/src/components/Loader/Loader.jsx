import React from 'react'
import './loader.css'
const Loader = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className=" loadingPart flex gap-x-2">
        <div className="dot text-9xl leading-3 text-red-500">.</div>
        <div className="dot text-9xl leading-3 text-green-500">.</div>
        <div className="dot text-9xl leading-3 text-blue-500">.</div>
        <div className="dot text-9xl leading-3 text-yellow-500">.</div>
        <div className="dot text-9xl leading-3 text-orange-500">.</div>
      </div>
    </div>
  )
}

export default Loader
