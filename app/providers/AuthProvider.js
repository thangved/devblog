import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import constants from '../config/constants';

export const Auth = createContext({
    user: {
        fullName: '',
        username: '',
        createdAt: '',
        login: false,
    },
    token: '',
    setToken: Function,
})

export default function AuthProvider({ children }) {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        setToken(localStorage.getItem('__AUTH__TOKEN__'))
    }, [])

    useEffect(() => {
        if (!token)
            return setUser({})
        axios.post(`${constants.api}/user/auth`, { token })
            .then(({ data }) => {
                if (!data.success)
                    return toast.error(data.message)

                setUser({
                    ...data.data,
                    login: true,
                })
            })
            .catch(error => toast.error(error.toString()))

    }, [token])

    return <Auth.Provider value={{
        token,
        user,
        setToken: value => {
            setToken(value)
            localStorage.setItem('__AUTH__TOKEN__', value)
        }
    }}>
        {children}
    </Auth.Provider>
}