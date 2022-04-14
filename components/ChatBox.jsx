import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import { ImArrowLeft2 } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";

import style from '../styles/ChatBox.module.css'
import MessDetail from './MessDetail';


const dataTest = [
    {
        uid: '1',
        displayName: 'HiHI',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: 'aasdasd',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
]

export default function ChatBox() {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, []);


    return (
        <Grid sx={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#252837', zIndex: '10000000' }}>
            <Box sx={{ display: 'flex', width: '100%', padding: '15px 10px', alignItems: 'center', justifyContent: 'space-between', color: '#b6bbc1' }}>
                <Grid sx={{ display: 'flex' }}>
                    <ButtonBase sx={{ fontSize: '20px', }}>
                        <ImArrowLeft2 />
                    </ButtonBase>
                    <Avatar src="/" sx={{ width: '25px', height: '25px', marginLeft: '15px' }}></Avatar>
                    <Typography component={"p"} sx={{ marginLeft: '10px' }}>Name</Typography>
                </Grid>
                <Grid>
                    <ButtonBase sx={{ fontSize: '20px', marginRight: '10px' }}>
                        <BsFillTelephoneFill />
                    </ButtonBase>
                </Grid>
            </Box>
            <Box>
                <Grid className={style.eact__scroll__to__bottom} sx={{ height: '500px', overflow: 'scroll', padding: '0 10px' }}>
                    {
                        dataTest && dataTest.map((messItem, index) => {
                            return (
                                <Grid className={messItem.uid == 1 ? style.current__user__mess : style.other__mess} sx={{ display: 'flex', marginTop: '10px' }} key={index}>
                                    <Avatar src={messItem.photoURL}></Avatar>
                                    <MessDetail uid={messItem.uid} messDetail={messItem.messDetail} createdAt={messItem.createdAt} />
                                </Grid>
                            )
                        })
                    }


                    {/* <Grid className={style.current__user__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid>
                    <Grid className={style.other__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid>
                    <Grid className={style.current__user__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid>
                    <Grid className={style.other__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid>
                    <Grid className={style.current__user__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid>
                    <Grid className={style.other__mess} sx={{ display: 'flex', marginTop: '10px' }}>
                        <Avatar src='/'></Avatar>
                        <MessDetail />
                    </Grid> */}
                    <Box style={{ marginBottom: 10 }} ref={messagesEndRef} />
                </Grid>
            </Box>
            <Box>

            </Box>
        </Grid >
    )
}
