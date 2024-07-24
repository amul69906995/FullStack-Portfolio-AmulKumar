import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext(false);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const verifyToken = async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/auto-login`, { jwtToken: token }, {
                    withCredentials: true
                });
                console.log(data);
                setUser(data.user);
                setIsAuth(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            verifyToken();
        }
    }, []);

    return (
        <authContext.Provider value={{ isAuth, user, setIsAuth, setUser }}>
            {children}
        </authContext.Provider>
    );
};
