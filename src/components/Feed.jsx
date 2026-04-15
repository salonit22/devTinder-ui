import React, { useEffect, useState } from 'react'
import { addUser } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import UseCard from './UseCard'

const Feed = () => {
  const dispatch = useDispatch()
  const feedData = useSelector((store) => store.feed)
  const [loading, setLoading] = useState(false)

  const loadFeed = async () => {
    if (feedData && feedData.length > 0) return

    setLoading(true)
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeed()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f5f0] via-[#f3ece4] to-[#e8dfd2] px-4">

      {/* Content Wrapper */}
      <div className="flex flex-col items-center">

        {/* Title */}
        <h1
          className="text-3xl mb-8 text-[#2d2a26] tracking-wide"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Discover
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-[#5a524a] text-sm animate-pulse">
            Finding your matches...
          </p>
        )}

        {/* Card */}
        {!loading && feedData?.length > 0 && (
          <div className="transition-all duration-500 ease-in-out">
            <UseCard user={feedData[0]} key={feedData[0]._id} />
          </div>
        )}

        {/* Empty State */}
        {!loading && (!feedData || feedData.length === 0) && (
          <div className="text-center mt-10 bg-white/70 border border-[#e6dccf] px-6 py-5 rounded-xl shadow-md">
            <p
              className="text-lg text-[#3e3a36]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              No new connections at the moment
            </p>
            <p className="text-sm text-[#7a7268] mt-2">
              Please return later or refresh
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Feed