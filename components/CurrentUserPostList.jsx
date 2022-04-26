import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'

export default function CurrentUserPostList({ currentuser }) {

    const currentUser = currentuser;
    console.log("currentUser profile", currentUser)


    const [currentUserPostList, setCurrentUserPostList] = useState([])

    useEffect(() => {
        const getPostList = async () => {
            const q = query(collection(db, "posts"), where("publisherID", "==", currentuser.docid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
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
