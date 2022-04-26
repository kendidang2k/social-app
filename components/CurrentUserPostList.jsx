import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'

export default function CurrentUserPostList({ currentuser }) {

    const currentUser = currentuser;
    console.log("currentUser", currentUser)


    const [currentUserPostList, setCurrentUserPostList] = useState([])

    useEffect(() => {
        const getPostList = () => {
            currentUser.posts.forEach(element => {
                console.log("element", element)
            });
        }

        getPostList();
    }, [currentUser.posts])


    return (
        <Grid>
            {/* <PostItem /> */}
        </Grid>
    )
}
