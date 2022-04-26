import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import FriendRequestItem from './FriendRequestItem'
import PageHeader from './PageHeader'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

import style from '../styles/FriendRequest.module.css'
import useGetFriendRequest from '../hooks/useGetFriendRequest'
export default function FriendRequest({ currentUser }) {

    const [friendRequestList, setFriendRequestList] = useState([])

    useEffect(() => {
        const getFriendRequest = () => {
            let arrayRequestList = [];
            currentUser.notifications.forEach(async (element, index) => {
                if (index == 3) {
                    return;
                }
                const requestsUserref = await doc(db, "users", element);
                const requestsUserSnap = await getDoc(requestsUserref);
                if (requestsUserSnap.exists()) {
                    arrayRequestList.push({
                        docid: requestsUserSnap.id,
                        ...requestsUserSnap.data()
                    })
                }
            });
            setFriendRequestList(arrayRequestList)
        }
        getFriendRequest();
    }, [currentUser.notifications])

    const testReq = useGetFriendRequest({ currentUser });
    console.log('testReq', testReq);

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
            <PageHeader title={"Friend Request"} linkTo={"/"} />
            {
                friendRequestList != null ?
                    <Grid sx={{ padding: '20px' }}>
                        {
                            friendRequestList && friendRequestList.map((friendRequestItem, index) => {
                                console.log("item", friendRequestItem);
                                return (
                                    <FriendRequestItem friendRequestItem={friendRequestItem} key={friendRequestItem.docid} />
                                )
                            })
                        }
                    </Grid>
                    :
                    <Grid>asdas</Grid>
            }
        </Grid>
    )
}
