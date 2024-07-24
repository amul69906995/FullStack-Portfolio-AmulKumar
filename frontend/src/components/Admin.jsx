import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { toastifyOption } from '../constant';
import {Link, useNavigate} from 'react-router-dom'
import { useContext ,useEffect} from 'react';
import { authContext } from '../context/AuthContext';

const Admin = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [onLoading, setOnLoading] = useState(false);
const navigate=useNavigate();
  const {isAuth,setIsAuth,setUser,user}=useContext(authContext);
console.log("in admin auth here",isAuth,user)
useEffect(() => {
  if (isAuth) {
    navigate('/protected/portfolio');
  }
}, [isAuth]); 

  const handleSendLink = async () => {
    setOnLoading(true)
    console.log(import.meta.env.VITE_BACKEND_URL)
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/sign-up`, { email, password })
      console.log(result.data.message)
      toast.success(result.data.message,toastifyOption);
    }
    catch (e) {
      console.log(e.response.data.message)
      toast.error(e.response.data.message,toastifyOption);
    }
    setOnLoading(false)
  }
  return (
    <>
      <h2>
        admin
      </h2>
      <ToastContainer/>
      <h3>testing email:amul123@gmail.com and password:amul123@gmail.com </h3>
      <div>
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type={showPassword ? 'password' : 'text'} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Text Form" : "password Form"}</button>
        <button onClick={handleSendLink} disabled={onLoading}>send Link</button>
        <Link to='/login'><button>Login</button></Link>
      </div>
    </>
  )
}

export default Admin;
