import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedroom] = useState({})

    const currentUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: user.uid,
        }
    }, [user.uid])

    const currentUser = useFirestore('users', currentUserCondition)
    console.log('currentUser', currentUser)

    const allUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '!=',
            compareValue: user.uid
        }
    }, [user.uid])

    const allUser = useFirestore('users', allUserCondition)

    const currentUserStoryCondition = useMemo(() => {
        return {
            fieldName: 'publisherID',
            operator: '==',
            compareValue: user.uid
        }
    }, [user.uid])

    const allPosts = useFirestore('posts', '')

    return (
        currentUser && <AppContext.Provider value={{
            currentUser,
            loading,
            allUser,
            allPosts
        }}>
            {children}
        </AppContext.Provider>
    )
}
