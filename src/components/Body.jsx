import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
const Body = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const userData = useSelector((store) => store.user)

  const fetchUser = async() =>{
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL + '/info',{withCredentials: true})
       dispatch(setUser(res.data)) 
    }catch(err){
      if(err.response.status === 401){
       navigate('/login')
      }
      console.log(err)
    }
  }
  
  useEffect( ()=>{
    fetchUser()
  },[])

  return (
    <div>
      {userData && <NavBar />}
      <Outlet />
    </div>
  )
}

export default Body