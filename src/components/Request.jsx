import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setRequest, clearRequest } from '../utils/requestSlice'
import { useNavigate } from 'react-router-dom'

const Request = () => {
  const requestData = useSelector((store) => store.request)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const requests = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
       'http://localhost:3000/users/request/recevied',
        { withCredentials: true }
      )
      dispatch(setRequest(res.data.data))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRequest = async (e, id, status) => {
    e.stopPropagation()
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      )
      dispatch(clearRequest(id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCardClick = (user) => {
    navigate(`/profile/${user._id}`, {
      state: {
        user,
        isConnection: false,
      },
    })
  }

  useEffect(() => {
    requests()
  }, [])

  return (
    <div className="min-h-screen bg-[#fdfaf6] py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h2
          className="text-3xl mb-8 text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Invitations
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-sm text-[#5a524a] animate-pulse">
            Gathering your invitations...
          </p>
        )}

        {/* Empty */}
        {!loading && (!requestData || requestData.length === 0) && (
          <div className="text-center bg-white border border-[#eee6da] p-6 rounded-xl shadow-sm">
            <p className="text-[#3e3a36] text-lg">
              No invitations yet
            </p>
            <p className="text-sm text-[#7a7268] mt-2">
              When someone admires you, it will appear here ✨
            </p>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-5">
          {requestData?.map((req) => {
            const user = req.fromUserID

            return (
              <div
                key={req._id}
                onClick={() => handleCardClick(user)}
                className="flex items-center justify-between gap-4 p-5 
                bg-white border border-[#eee6da] rounded-2xl 
                shadow-sm hover:shadow-md hover:bg-[#fffdf9] 
                transition duration-200 cursor-pointer"
              >

                {/* Left */}
                <div className="flex items-center gap-4">

                  <img
                    src={user.photoUrl || 'https://via.placeholder.com/40'}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border border-[#e0d5c0]"
                  />

                  <div>
                    <h3 className="text-[#2d2a26] font-semibold">
                      {user.first_name} {user.last_name}
                    </h3>

                    <p className="text-sm text-[#6b645c] font-medium">
                      Wishes to connect
                    </p>

                    {user.about && (
                      <p className="text-sm text-[#8a8178] mt-1 line-clamp-2 max-w-md">
                        {user.about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">

                  <button
                    onClick={(e) =>
                      handleRequest(e, req._id, 'rejected')
                    }
                    className="px-4 py-1.5 rounded-full border border-[#e0d5c0] text-[#5a524a] text-sm 
                    hover:bg-[#f5efe6] transition"
                  >
                    Pass
                  </button>

                  <button
                    onClick={(e) =>
                      handleRequest(e, req._id, 'accepted')
                    }
                    className="px-5 py-1.5 rounded-full bg-[#c8a96a] text-white text-sm font-medium 
                    hover:bg-[#b89658] transition"
                  >
                    Accept
                  </button>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Request