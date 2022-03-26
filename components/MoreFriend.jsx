import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { moreFriendList } from '../mock/moreFriendList'
import MoreFriendItem from './MoreFriendItem'
import PageHeader from './PageHeader'

export default function MoreFriend() {

    const moreFriendListData = moreFriendList;

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px', marginTop: '15px' }}>
            <PageHeader title={"More Friend"} linkTo={"/"} />
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
