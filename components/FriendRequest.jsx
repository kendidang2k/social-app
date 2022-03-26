import React from 'react'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import FriendRequestItem from './FriendRequestItem'
import { friendRequestList } from '../mock/friendRequestList'

import style from '../styles/FriendRequest.module.css'
import PageHeader from './PageHeader'

export default function FriendRequest() {

    const FriendRequestListData = friendRequestList;

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
            <PageHeader title={"FriendRequest"} linkTo={"/"} />
            <Grid sx={{ padding: '20px' }}>
                {
                    FriendRequestListData && FriendRequestListData.map((friendRequestItem, index) => {
                        return (
                            <FriendRequestItem friendRequestItem={friendRequestItem} key={index} />
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}
