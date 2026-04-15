import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const ProfileView = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const user = location.state?.user
  const isConnection = location.state?.isConnection

  if (!user) {
    return (
      <div className="text-center mt-20 text-[#5a524a]">
        No profile available
      </div>
    )
  }

  const handleAction = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${user._id}`,
        {},
        { withCredentials: true }
      )
      navigate('/requests')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f5f0] via-[#f3ece4] to-[#e8dfd2] px-4">

      <div className="max-w-md w-full text-center bg-white/80 border border-[#e6dccf] rounded-2xl shadow-xl p-8">

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user.photoUrl || 'https://via.placeholder.com/150'}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-[#c8a96a] shadow-md"
          />
        </div>

        {/* Name */}
        <h2
          className="text-3xl text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {user.first_name} {user.last_name}
        </h2>

        {/* Info */}
        <p className="text-sm text-[#5a524a] mt-2">
          {user.age}, {user.gender}
        </p>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-[#c8a96a] mx-auto my-5"></div>

        {/* About */}
        {user.about && (
          <p className="text-[#3e3a36] leading-relaxed px-4">
            {user.about}
          </p>
        )}

        {/* Actions */}
        {!isConnection && (
          <div className="flex justify-center gap-4 mt-8">

            <button
              onClick={() => handleAction('rejected')}
              className="px-5 py-2 rounded-full border border-[#d6c7a1] text-[#5a524a] hover:bg-[#f1ebe3] transition"
            >
              Pass
            </button>

            <button
              onClick={() => handleAction('accepted')}
              className="px-6 py-2 rounded-full bg-[#c8a96a] text-white font-medium hover:bg-[#b89658] transition"
            >
              Admire
            </button>

          </div>
        )}

        {/* Connection */}
        {isConnection && (
          <div className="mt-8">
            <button className="px-6 py-2 rounded-full border border-[#c8a96a] text-[#c8a96a] font-medium hover:bg-[#c8a96a] hover:text-white transition">
              Begin Conversation
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfileView