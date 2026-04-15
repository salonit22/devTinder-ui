import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { clearUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true })
      dispatch(clearUser())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full px-8 py-4 flex items-center justify-between bg-[#f8f5f0] border-b border-[#e6dccf] shadow-sm">

      {/* Brand */}
      <Link
        to="/"
        className="text-2xl tracking-wide text-[#2d2a26] hover:text-[#c8a96a] transition"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        DevConnect
      </Link>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search profiles..."
          className="hidden md:block px-4 py-2 rounded-full bg-white text-[#2d2a26] text-sm border border-[#d6c7a1]
          placeholder:text-[#9c948a]
          focus:outline-none focus:ring-2 focus:ring-[#c8a96a] transition"
        />

        {/* Welcome */}
        {user && (
          <p className="hidden md:block text-sm text-[#4a443d]">
            Welcome,{" "}
            <span className="font-semibold text-[#2d2a26]">
              {user.first_name}
            </span>
          </p>
        )}

        {/* Avatar */}
        <div className="relative group">
          <img
            src={user?.photoUrl || 'https://via.placeholder.com/40'}
            alt="user"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#c8a96a] cursor-pointer hover:scale-105 transition"
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-3 w-48 bg-white border border-[#e6dccf] rounded-xl shadow-xl 
          opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
          transition duration-200 z-50 overflow-hidden">

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-[#2d2a26] hover:bg-[#f8f5f0]"
            >
              Profile
            </Link>

            <Link
              to="/connections"
              className="block px-4 py-2 text-sm text-[#2d2a26] hover:bg-[#f8f5f0]"
            >
              Connections
            </Link>

            <Link
              to="/requests"
              className="block px-4 py-2 text-sm text-[#2d2a26] hover:bg-[#f8f5f0]"
            >
              Requests
            </Link>

            <button
              onClick={logoutHandler}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar