import { collection, limit, onSnapshot, orderBy, query, QuerySnapshot, startAfter } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { db } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';
import { AppContext } from './AppProvider';
import { AuthContext } from './AuthProvider';

export const PostContext = createContext();

export default function PostProvider({ children }) {

    const { user } = useContext(AuthContext);
    const { currentUser } = useContext(AppContext)
    const [lastDataPost, setLastDataPost] = useState(null)
    const [postList, setPostList] = useState([])


    let currentUserPost;
    let getPostByFollowing;


    // useEffect(() => {
    //     const tempDataArray = [];
    //     const getPostByFollowing = () => {
    //         if (currentUser[0]) {
    //             const postArrayUser = currentUser[0].following;
    //             postArrayUser.push(currentUser[0].docid)
    //             console.log("postArrayUser", postArrayUser)
    //             const postRef = null;
    //             // if (condition) {

    //             // }
    //             if (lastDataPost != null) {
    //                 postRef = query(collection(db, "posts"), orderBy('createdAt', 'desc'), startAfter(lastDataPost.createdAt), limit(5))
    //             } else {
    //                 postRef = query(collection(db, "posts"), orderBy('createdAt', 'desc'), limit(5))
    //             }
    //             onSnapshot(postRef, (querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     if (postArrayUser.includes(doc.data().publisherID)) {
    //                         tempDataArray.push({ docid: doc.id, ...doc.data() })
    //                         console.log("tempDataArray:", tempDataArray)
    //                     }
    //                 })
    //                 setPostList(tempDataArray)
    //                 setLastDataPost(tempDataArray[tempDataArray.length - 1])
    //                 console.log("lastDataPost:", lastDataPost)
    //                 console.log("postList:", postList)
    //             })
    //         }
    //     }

    //     getPostByFollowing();
    // }, [currentUser[0]])

    // const postCondition = useMemo(() => {
    //     return {
    //         fieldName: 'publisherID',
    //         operator: '==',
    //         compareValue: currentUser[0].docid,
    //         orderBy: true
    //     }
    // }, [user.uid])

    // currentUserPost = useFirestore('posts', postCondition)
    // useGetPost(currentUser[0])


    // const getPostByFollowingCondition = useMemo(() => {
    //     return {
    //         fieldName: 'publisherID',
    //         operator: 'array-contains-any',
    //         compareValue: currentUser[0].following,
    //         orderBy: true
    //     }
    // }, [user.uid])

    // getPostByFollowing = useFirestore('posts', getPostByFollowingCondition)

    // console.log("getPostByFollowing:", getPostByFollowing)


    return (
        <PostContext.Provider value={{
            currentUserPost
        }}>
            {children}
        </PostContext.Provider>
    )
}
