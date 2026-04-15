import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('gokila@gmail.com')
  const [password, setPassword] = useState('#Gokila123')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (isLogin) => {
    if (!isLogin) {
      try {
        const res = await axios.post(
          'http://localhost:3000/signup',
          {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          },
          { withCredentials: true }
        )
        dispatch(setUser(res.data))
        navigate('/')
      } catch (err) {
        setError(err.response?.data || 'Something went wrong')
      }
    } else {
      try {
        const res = await axios.post(
          'http://localhost:3000/login',
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        dispatch(setUser(res.data))
        navigate('/')
      } catch (err) {
        setError(err.response?.data || 'Invalid credentials')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">

      <div className="w-[380px] bg-white/90 backdrop-blur-md border border-[#e6dccf] rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <h2
          className="text-3xl text-center mb-6 text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {isLogin ? 'Welcome Back' : 'Join the Circle'}
        </h2>

        {/* First Name */}
        {!isLogin && (
          <div className="mb-4">
            <label className="text-sm text-[#4a443d] font-medium">First Name</label>
            <input
              value={firstName}
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-[#2d2a26] border border-[#d6c7a1] focus:outline-none focus:ring-2 focus:ring-[#c8a96a]"
            />
          </div>
        )}

        {/* Last Name */}
        {!isLogin && (
          <div className="mb-4">
            <label className="text-sm text-[#4a443d] font-medium">Last Name</label>
            <input
              value={lastName}
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-[#2d2a26] border border-[#d6c7a1] focus:outline-none focus:ring-2 focus:ring-[#c8a96a]"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-[#4a443d] font-medium">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-[#2d2a26] border border-[#d6c7a1] focus:outline-none focus:ring-2 focus:ring-[#c8a96a]"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-[#4a443d] font-medium">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white text-[#2d2a26] border border-[#d6c7a1] focus:outline-none focus:ring-2 focus:ring-[#c8a96a]"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 font-medium mb-3 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={() => handleLogin(isLogin)}
          className="w-full py-2 mt-2 rounded-full bg-[#c8a96a] text-white font-semibold hover:bg-[#b89658] transition"
        >
          {isLogin ? 'Enter' : 'Create Account'}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm mt-5 text-[#5a524a]">
          {isLogin ? "New here?" : "Already a member?"}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-[#c8a96a] font-medium hover:underline"
          >
            {isLogin ? 'Join now' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login