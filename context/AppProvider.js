import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const currentUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: user.uid,
        }
    }, [user.uid])

    const currentUser = useFirestore('users', currentUserCondition)

    console.log("current user context: ", currentUser)

    const allUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '!=',
            compareValue: user.uid
        }
    }, [user.uid])

    const allUser = useFirestore('users', allUserCondition)

    console.log("all user:", allUser);

    // if (currentUser && allUser) {
    //     setLoading(false)
    // } else {
    //     setLoading(true)
    // }

    return (
        <AppContext.Provider value={{
            currentUser,
            loading,
            allUser
        }}>
            {children}
        </AppContext.Provider>
    )
}
