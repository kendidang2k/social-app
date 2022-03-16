import React from 'react'
import { Avatar, ButtonBase, Grid, Typography } from '@mui/material'
import Link from 'next/link'


export default function FriendRequestItem({ friendRequestItem }) {
    return (
        <Grid sx={{ marginBottom: '20px' }}>
            <Grid sx={{ display: 'flex', marginBottom: '10px' }}>
                <Avatar src={friendRequestItem.photoURL}></Avatar>
                <Link href="/">
                    <a>
                        <Typography component={"span"} sx={{ marginLeft: '10px', fontSize: '15px', fontWeight: 'bold' }}>{friendRequestItem.senderName}</Typography>
                    </a>
                </Link>

            </Grid>
            <Grid sx={{ display: 'flex' }}>
                <ButtonBase sx={{ width: '100px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(138deg, rgba(231,120,23,1) 0%, rgba(233,142,57,1) 55%, rgba(252,177,103,1) 86%, rgba(251,200,133,1) 100%)', borderRadius: '35px', fontSize: '15px', fontWeight: 'bold', color: '#fff', marginRight: '15px' }}>Confirm</ButtonBase>
                <ButtonBase sx={{ width: '100px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9e9e9', borderRadius: '35px', fontSize: '15px', fontWeight: 'bold', color: '#343a40', }}>Delete</ButtonBase>
            </Grid>
        </Grid>
    )
}
