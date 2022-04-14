import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

const chatDataFollowing = [
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
    {
        photoURL: '/',
        displayName: 'test'
    },
]

export default function ChatBoxFollowingList() {

    // const { currentUser } = useContext(AppContext);
    // console.log("currentUser", currentUser)

    return (
        <Grid sx={{ marginTop: '45px' }}>
            <Box sx={{ position: 'fixed', top: 0, left: '0', width: '100%', height: '45px', backgroundColor: '#252837', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
                <Box sx={{ position: 'absolute', left: '10px' }}>
                    <Avatar src='/' sx={{ width: '25px', height: '25px' }}></Avatar>
                </Box>
                <Typography component={"p"} sx={{ color: '#b6bbc1', fontWeight: 'bold' }}>Following List</Typography>
            </Box>
            <Box sx={{ height: 'calc(100vh - 45px - 48px)', backgroundColor: '#252837', overflow: 'scroll' }}>
                {
                    chatDataFollowing && chatDataFollowing.map((item, index) => {
                        return (
                            <Grid onClick={() => console.log("asasdasd")} sx={{ display: 'flex', alignItems: 'center', padding: '10px' }} key={index}>
                                <Avatar src={item.photoURL} sx={{ width: '30px', height: '30px' }}></Avatar>
                                <Typography component={"p"} sx={{ marginLeft: '10px', color: '#fff' }}>{item.displayName}</Typography>
                            </Grid>
                        )
                    })
                }
            </Box >
        </Grid >
    )
}
