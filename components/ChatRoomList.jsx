import { Avatar, Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from '../context/AppProvider';

import "swiper/css";
import "swiper/css/pagination";

import style from '../styles/MessageBox.module.css'
import { AuthContext } from '../context/AuthProvider';


const testAvatarData = [
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
    {
        src: '/'
    },
]


const testMessData = [
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
    {
        displayName: 'dasdasdsa',
        photoURL: '/',
        lastMess: 'sdasdadasdasdasd',
        lastMessCreatedAt: '10:20'
    },
]

export default function ChatRoomList() {

    return (
        <Grid sx={{ margin: '35px 0 50px 0', padding: '10px 0', height: 'calc(100vh - 45px - 40px)', overflow: 'scroll' }}>
            <Box sx={{ padding: '0 10px' }}>
                <Typography component={"p"} sx={{ color: '#fff' }}>Friends</Typography>
                <Grid sx={{ display: 'flex' }}>
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={10}
                        className="mySwiper"
                    >
                        {
                            testAvatarData && testAvatarData.map((item, index) => {
                                return (
                                    <SwiperSlide className={style.avatar__slide} key={index}>
                                        <Grid sx={{}}>
                                            <Avatar src={item.src}></Avatar>
                                        </Grid>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <Box>
                    {
                        testMessData && testMessData.map((messItem, index) => {
                            return (
                                <Grid sx={{ display: 'flex', alignItems: 'center', position: 'relative', borderBottom: '1px solid #1f222f', padding: '10px' }} key={index}>
                                    <Avatar src={messItem.photoURL}></Avatar>
                                    <Box sx={{ padding: '0 10px', width: '80%' }}>
                                        <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#b5b7bf' }}>{messItem.displayName}</Typography>
                                        <Typography component={"p"} sx={{ width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', color: '#727585' }}>{messItem.lastMess}</Typography>
                                    </Box>
                                    <Typography component={"p"} sx={{ position: 'absolute', right: '10px', top: '15px', margin: '0', fontSize: '12px', color: '#727585' }}>{messItem.lastMessCreatedAt}</Typography>
                                </Grid>
                            )
                        })
                    }

                </Box>
            </Box>
        </Grid>
    )
}
