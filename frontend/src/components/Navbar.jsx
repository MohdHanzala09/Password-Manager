import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = ({}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const logout = await fetch("http://localhost:3000/logout",{
        method:"GET",
        credentials:"include",
      })
      const toJson = await logout.json();
      if (toJson) {
        navigate('/login')
      }
    } catch (error) {
      console.log("error on logout", error.message)
    }
  }
  return (
    <div className='flex justify-between items-center h-16 bg-gray-800 text-white'>
        <div className='font-bold text-2xl ml-2'>&lt;Pass <span className='text-blue-800'>OP</span>&gt;</div>
      <nav>
        <ul>
            <button type="button" className="text-white mr-3 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-900" onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
