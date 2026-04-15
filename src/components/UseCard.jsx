import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/feedSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const UseCard = ({ user, from }) => {
  const dispatch = useDispatch()

  const handleStatusChange = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + id,
        {},
        { withCredentials: true }
      )
      dispatch(removeUser(id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="relative w-[340px] h-[520px] rounded-[28px] overflow-hidden 
    shadow-[0_15px_50px_rgba(0,0,0,0.25)] bg-black 
    transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">

      {/* Image */}
      <img
        src={user.photoUrl || 'https://via.placeholder.com/400'}
        alt={user.first_name}
        className="w-full h-full object-cover scale-110"
      />

      {/* Overlay (improved contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t 
      from-black/90 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

        {/* Name */}
        <h2
          className="text-3xl tracking-wide leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {user.first_name} {user.last_name}
        </h2>

        {/* Meta */}
        <p className="text-sm text-[#d1ccc4] mt-1">
          {user.age && user.gender
            ? `${user.age} • ${user.gender}`
            : ''}
        </p>

        {/* About */}
        <p className="text-sm mt-3 text-[#f1eee8] leading-relaxed line-clamp-2">
          {user.about || 'Prefers to reveal more in conversation'}
        </p>

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {user.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full 
                bg-white/20 backdrop-blur-md border border-white/30 text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Actions */}
      {from !== 'profile' && (
        <div className="absolute bottom-5 right-5 flex gap-3">

          {/* Pass */}
          <button
            onClick={() =>
              handleStatusChange('ignored', user._id)
            }
            className="w-12 h-12 rounded-full border border-[#e0d5c0] text-white 
            backdrop-blur-md bg-white/10 hover:bg-white/20 
            hover:scale-110 active:scale-95 transition"
          >
            ✕
          </button>

          {/* Admire */}
          <button
            onClick={() =>
              handleStatusChange('interested', user._id)
            }
            className="w-12 h-12 rounded-full bg-[#c8a96a] text-white 
            shadow-lg hover:bg-[#b89658] hover:scale-110 active:scale-95 transition"
          >
            ♥
          </button>

        </div>
      )}
    </div>
  )
}

export default UseCard