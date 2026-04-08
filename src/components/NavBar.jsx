import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const NavBar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try{
          await axios.post(BASE_URL + '/logout',{}, {withCredentials: true})
          dispatch(clearUser())
          navigate('/login')
        }catch(err){
          console.log(err)
        }
}
    return (
        <div class="navbar bg-base-100 shadow-sm">
            <div class="flex-1">
                <Link to="/" class="btn btn-ghost text-xl">daisyUI</Link>
            </div>
            <div class="flex gap-2">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                         <div class="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><a onClick={logoutHandler} >Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar