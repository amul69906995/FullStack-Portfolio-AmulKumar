import React, { useState, useEffect } from 'react'
import { toastifyOption } from '../constant';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [onLoading, setOnLoading] = useState(false)
  const { isAuth, setIsAuth, setUser, user } = useContext(authContext);
  const navigate = useNavigate()
  console.log("in login auth here", isAuth, user)
  const handleLogin = async () => {
    setOnLoading(true)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/log-in`, { email, password },
        {
          withCredentials: true,
        }
      )
      console.log(data)
      localStorage.setItem('jwtToken', data.jwtToken)
      setIsAuth(true);
      setUser(data.user)
   
      navigate('/protected/portfolio');
      toast.success(data?.message, toastifyOption);
    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message, toastifyOption)
    }
    setOnLoading(false)
  }
  useEffect(() => {
    if (isAuth) {
      navigate('/protected/portfolio');
    }
  }, [isAuth]);
  return (
    <div>
      <ToastContainer />
      <h1>log in</h1>
      <label htmlFor="email">Email</label>
      <input type="text" name='email' id="email" placeholder='xyz@gmail.com' onChange={(e) => setEmail(e.target.value)} /><br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />
      <button disabled={onLoading} onClick={handleLogin}>Login</button>
      <Link to='/'><button>sign up</button></Link>
    </div>
  )
}

export default Login;
