import React, {useEffect} from 'react'

export default function Logout() {
    
    useEffect(() => {
        const signout = () => {
            localStorage.removeItem('token');               
            window.location = '/';                 
        } 
        signout();       
    }, [])

    return ( null )
}
