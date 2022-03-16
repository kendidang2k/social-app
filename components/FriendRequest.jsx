import React from 'react'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import FriendRequestItem from './FriendRequestItem'
import { friendRequestList } from '../mock/friendRequestList'

import style from '../styles/FriendRequest.module.css'

export default function FriendRequest() {

    const FriendRequestListData = friendRequestList;

    console.log('FriendRequestListData', friendRequestList)

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', borderBottom: '2px solid #eeeeee' }}>
                <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#252525', fontSize: '14px' }}>Friend Request</Typography>
                <Link href="/">
                    <a className={style.see__all__request}>See all</a>
                </Link>
            </Grid>
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
