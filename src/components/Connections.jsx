import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../utils/connectionSlice'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
  const connectionData = useSelector((store) => store.connection)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const loadConnections = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        BASE_URL + '/user/connections',
        { withCredentials: true }
      )
      dispatch(setConnection(res.data))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (e, user) => {
    e.stopPropagation()
    navigate(`/profile/${user._id}`, {
      state: {
        user,
        isConnection: true,
      },
    })
  }

  useEffect(() => {
    loadConnections()
  }, [])

  return (
    <div className="min-h-screen bg-[#fdfaf6] py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h2
          className="text-3xl mb-8 text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Your Circle
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-[#5a524a] text-sm animate-pulse text-center">
            Gathering your connections...
          </p>
        )}

        {/* Empty */}
        {!loading && (!connectionData?.data || connectionData.data.length === 0) && (
          <div className="text-center bg-white border border-[#eee6da] p-6 rounded-xl shadow-sm">
            <p className="text-[#3e3a36] text-lg">
              No connections yet
            </p>
            <p className="text-sm text-[#7a7268] mt-2">
              Start exploring to build your circle ✨
            </p>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-5">
          {connectionData?.data?.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between gap-4 p-5 
              bg-white border border-[#eee6da] rounded-2xl 
              shadow-sm hover:shadow-md hover:bg-[#fffdf9] 
              transition duration-200"
            >

              {/* Left */}
              <div className="flex items-center gap-4">

                <img
                  src={user.photoUrl}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover border border-[#e0d5c0]"
                />

                <div>
                  <h3 className="text-[#2d2a26] font-semibold">
                    {user.first_name} {user.last_name}
                  </h3>

                  <p className="text-sm text-[#6b645c]">
                    {user.age}, {user.gender}
                  </p>

                  {user.about && (
                    <p className="text-sm text-[#8a8178] mt-1 line-clamp-2 max-w-md">
                      {user.about}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <button
                onClick={(e) => handleView(e, user)}
                className="px-4 py-1.5 rounded-full border border-[#c8a96a] text-[#c8a96a] text-sm font-medium
                hover:bg-[#c8a96a] hover:text-white transition"
              >
                View
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Connections