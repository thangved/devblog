
import { createContext, useState, useEffect } from 'react';

export const Location = createContext({
    location: {}
})

export default function LocationProvider({ children }) {
    const [location, setLocation] = useState({})


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setLocation(pos.coords)
        })
    }, [])

    return <Location.Provider value={{ location }}>
        {children}
    </Location.Provider>
}

