import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { moreFriendList } from '../mock/moreFriendList'
import MoreFriendItem from './MoreFriendItem'

export default function MoreFriend() {

    console.log('moreFriendList', moreFriendList)
    const moreFriendListData = moreFriendList;

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px', marginTop: '15px' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', borderBottom: '2px solid #eeeeee' }}>
                <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#252525', fontSize: '14px' }}>More Friend</Typography>
                <Link href="/">
                    <a >See all</a>
                </Link>
            </Grid>
            <Grid sx={{ padding: '20px' }}>
                {
                    moreFriendListData && moreFriendListData.map((moreFriendItem, index) => {
                        return (
                            <MoreFriendItem moreFriendItem={moreFriendItem} key={index} />
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}
