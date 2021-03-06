import { Grid } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import PostItem from './PostItem'

export default function CurrentUserPostList({ currentuser }) {

    const currentUser = currentuser;
    console.log("currentUser profile", currentUser)


    const [currentUserPostList, setCurrentUserPostList] = useState([])

    useEffect(() => {
        const getPostList = async () => {
            let dataPost = [];
            const q = query(collection(db, "posts"), where("publisherID", "==", currentuser.docid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                dataPost.push({ docid: doc.id, ...doc.data() })
            });
            setCurrentUserPostList(dataPost)
        }

        getPostList();
    }, [currentUser.posts])


    return (
        <Grid>
            {
                currentUserPostList && currentUserPostList.map((postItem) => {

                    console.log("postItem", postItem)
                    return (
                        <PostItem postItem={postItem} key={postItem.docid} />
                    )
                })
            }
        </Grid>
    )
}
