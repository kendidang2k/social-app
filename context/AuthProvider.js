import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase/config'
import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';


export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const router = useRouter();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, coverPhoto, uid, docid } = user;
                setUser({ displayName, photoURL, coverPhoto, uid, docid });
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
            {loading ?
                <Grid sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress />
                </Grid>
                : children}
        </AuthContext.Provider>
    )
}
