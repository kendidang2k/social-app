import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AppContext } from './AppProvider';
import { AuthContext } from './AuthProvider';

export const PostContext = createContext();

export default function PostProvider({ children }) {

    const { user } = useContext(AuthContext);
    const { currentUser } = useContext(AppContext)

    console.log("currentUser asdasd", currentUser);

    let currentUserPost;

    if (currentUser[0]) {
        const postCondition = useMemo(() => {
            return {
                fieldName: 'publisherID',
                operator: '==',
                compareValue: currentUser[0].docid,
                orderBy: true
            }
        }, [user.uid])

        currentUserPost = useFirestore('posts', postCondition)
    }



    return (
        <PostContext.Provider value={{
            currentUserPost
        }}>
            {children}
        </PostContext.Provider>
    )
}
