import React from 'react'

const Header = () => {
  const logOut = () => {
    localStorage.removeItem('loggedInUser')
    window.location.reload()   // to reload the page
  }
  const userName = JSON.parse(localStorage.getItem('loggedInUser')).data.name
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1C1C1C] text-white">
      <h1 className='text-xl sm:text-2xl' >
        Hello<br />
        <span className='text-2xl sm:text-4xl font-medium'> {userName} 👋</span>
      </h1>
      <button className='mt-4 sm:mt-0 bg-red-600 text-white py-2 px-5 rounded hover:bg-red-700 text-lg font-medium' onClick={logOut}>
        Log Out
      </button>
    </div>
  )
}

export default Header
