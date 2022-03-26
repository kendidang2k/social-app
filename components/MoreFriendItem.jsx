import React from 'react'
import { Avatar, ButtonBase, Grid, Typography } from '@mui/material'
import { AiOutlineUserAdd } from "react-icons/ai";
import Link from 'next/link'

export default function MoreFriendItem({ moreFriendItem }) {
    return (
        <Grid sx={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={moreFriendItem.photoURL}></Avatar>
                    <Link href="/" passHref>
                        <a>
                            <Typography component={"span"} sx={{ marginLeft: '10px', fontSize: '15px', fontWeight: 'bold' }}>{moreFriendItem.senderName}</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid>
                    <ButtonBase sx={{ border: 'none', outline: 'none', fontSize: '25px', width: '35px', height: '35px', backgroundColor: '#fff', borderRadius: '50%', color: '#6c6c6c' }}><AiOutlineUserAdd /></ButtonBase>
                </Grid>
            </Grid>
        </Grid>
    )
}
