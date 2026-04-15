// based on your file :contentReference[oaicite:0]{index=0}

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const EditProfile = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [about, setAbout] = useState('')
  const [gender, setGender] = useState('')
  const [skills, setSkills] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '')
      setLastName(user.last_name || '')
      setAge(user.age || '')
      setAbout(user.about || '')
      setGender(user.gender || '')
      setSkills(user.skills?.join(', ') || '')
      setPhotoUrl(user.photoUrl || '')
    }
  }, [user])

  const update = async () => {
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        age,
        about,
        gender,
        skills: skills.split(',').map((s) => s.trim()),
        photoUrl,
      }

      const res = await axios.put(BASE_URL + '/edit', payload, {
        withCredentials: true,
      })

      dispatch(setUser(res.data))
      setIsUpdated(true)

      setTimeout(() => setIsUpdated(false), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  const inputStyle =
    "w-full mt-1 px-4 py-2 rounded-lg bg-[#f1ebe3] text-[#2d2a26] placeholder:text-[#9c948a] focus:outline-none focus:ring-1 focus:ring-[#c8a96a]"

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Success Message */}
      {isUpdated && (
        <div className="mb-4 text-center text-sm text-green-700 bg-green-50 border border-green-200 py-2 rounded-lg">
          Profile refined successfully ✨
        </div>
      )}

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md border border-[#e6dccf] rounded-2xl shadow-lg p-7">

        {/* Heading */}
        <h2
          className="text-2xl text-center mb-6 text-[#2d2a26]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Edit Profile
        </h2>

        <div className="flex flex-col gap-4">

          {/* First Name */}
          <div>
            <label className="text-sm text-[#4a443d]">First Name</label>
            <input
              value={firstName}
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-[#4a443d]">Last Name</label>
            <input
              value={lastName}
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Age + Gender */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm text-[#4a443d]">Age</label>
              <input
                type="number"
                value={age}
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="w-1/2">
              <label className="text-sm text-[#4a443d]">Gender</label>
              <input
                value={gender}
                placeholder="Enter gender"
                onChange={(e) => setGender(e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="text-sm text-[#4a443d]">About</label>
            <textarea
              value={about}
              placeholder="Tell something about yourself..."
              onChange={(e) => setAbout(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm text-[#4a443d]">Skills</label>
            <input
              value={skills}
              placeholder="e.g. React, Node, Design"
              onChange={(e) => setSkills(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-sm text-[#4a443d]">Photo URL</label>
            <input
              value={photoUrl}
              placeholder="Paste image URL"
              onChange={(e) => setPhotoUrl(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Button */}
          <button
            onClick={update}
            className="mt-4 py-2 rounded-full bg-[#c8a96a] text-white font-semibold hover:bg-[#b89658] transition"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  )
}

export default EditProfile