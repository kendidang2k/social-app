import { Grid } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import PostItem from './PostItem'

export default function OtherUserPostList({ otherUserID }) {

    console.log("otherUserID", otherUserID)


    const [otherUserPostList, setOtherUserPostList] = useState([])

    useEffect(() => {
        const getPostList = async () => {
            let dataPost = [];
            const q = query(collection(db, "posts"), where("publisherID", "==", otherUserID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                dataPost.push({ docid: doc.id, ...doc.data() })
            });
            setOtherUserPostList(dataPost)
        }

        getPostList();
    }, [otherUserID])


    return (
        <Grid>
            {
                otherUserPostList && otherUserPostList.map((postItem) => {
                    return (
                        <PostItem postItem={postItem} key={postItem.docid} />
                    )
                })
            }
        </Grid>
    )
}
