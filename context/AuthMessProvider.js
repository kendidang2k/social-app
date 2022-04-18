import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase/config'
import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import Router from 'next/router'


export const AuthMessContext = createContext();

export default function AuthMessProvider({ children }) {

    const router = useRouter();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("adasdasdasd")
                const { displayName, photoURL, coverPhoto, uid, docid } = user;
                setUser({ displayName, photoURL, coverPhoto, uid, docid });
                setLoading(false);
                return;
            }
            setLoading(false);
            return;
        })
        return () => {
            unsub();
        }
    }, [])

    return (
        <AuthMessContext.Provider value={{
            user, setUser
        }}>
            {loading ?
                <Grid sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress />
                </Grid>
                : children}
        </AuthMessContext.Provider>
    )
}
