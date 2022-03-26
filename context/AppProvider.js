import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const { user } = useContext(AuthContext);

    const postCondition = useMemo(() => {
        return {
            fieldName: 'publisherID',
            operator: '==',
            compareValue: user.uid,
            orderBy: true
        }
    }, [user.uid])

    const currentUserPost = useFirestore('posts', postCondition)

    console.log("currentUserPost", currentUserPost)


    return (
        <AppContext.Provider value={{
            currentUserPost
        }}>
            {children}
        </AppContext.Provider>
    )
}
