import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase/config'
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    
    const router = useRouter();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, uid, docid } = user;
                setUser({ displayName, photoURL, uid, docid });
                console.log(user);
                setLoading(false);
                router.push("/homepage");
                return;
            }
            router.push("/login");
            setLoading(false);
        })
        return () => {
            unsub();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    )
}
