import React from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import Link from 'next/link'

export default function MoreFriendItem({ moreFriendItem }) {
    return (
        <Grid>
            <Grid>
                <Avatar src={moreFriendItem.photoURL}></Avatar>
                <Link href="/">
                    <a>
                        <Typography component={"span"} sx={{ marginLeft: '10px', fontSize: '15px', fontWeight: 'bold' }}>{moreFriendItem.senderName}</Typography>
                    </a>
                </Link>
            </Grid>
        </Grid>
    )
}
