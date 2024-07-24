import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { authContext } from './context/AuthContext'

const ProtectedLayout = () => {
    const { isAuth } = useContext(authContext);
    const navigate = useNavigate()
    console.log(isAuth,"protectedLayout auth")
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            {isAuth ? <Outlet /> : null}
        </>
    )
}

export default ProtectedLayout
