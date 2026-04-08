import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async() => {
     try{
      const res = await axios.post('http://localhost:3000/login' , {
        email,
        password
      },{withCredentials: true})
      dispatch(setUser(res.data)) 
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="flex justify-center card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="input" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input"/>
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login