import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UseCard from './UseCard'

const Profile = () => {
  const user = useSelector((store) => store.user)

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f0] via-[#f3ece4] to-[#e8dfd2] py-12 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1
          className="text-3xl text-center mb-12 text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Your Presence
        </h1>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Edit Section */}
          <div>
            <EditProfile />
          </div>

          {/* Preview Section */}
          <div>
            <div>
              <UseCard user={user} from="profile" />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile