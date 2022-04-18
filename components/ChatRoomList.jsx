import { Avatar, Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from '../context/AppProvider';

import "swiper/css";
import "swiper/css/pagination";

import style from '../styles/MessageBox.module.css'
import { AuthContext } from '../context/AuthProvider';
import { StoreContext } from '../context/StoreProvider';
import { MessContext } from '../context/MessProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { addDocument } from '../firebase/service';

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

export default function ChatRoomList({ currentUser }) {

    const { isChatBoxVisible, setIsChatBoxVisible } = useContext(StoreContext);

    const { allFollowingUser, rooms, selectedRoom, setSelectedRoom } = useContext(MessContext);


    const handleAddRoom = async (user) => {
        const q = query(collection(db, "rooms"), where("members", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().members.includes(user.uid)) {
                alert("existed")
            } else {
                addDocument('rooms', {
                    name: user.displayName,
                    lastMess: '',
                    lastMessCreatedAt: `${hour}:${minutes}`,
                    members: [user.uid, currentUser.uid],
                })
            }
        });
    }

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
                            allFollowingUser && allFollowingUser.map((item, index) => {
                                return (
                                    <SwiperSlide className={style.avatar__slide} key={index}>
                                        <Grid onClick={() => handleAddRoom(item)}>
                                            <Avatar src={item.photoURL}></Avatar>
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
                        rooms && rooms.map((room, index) => {
                            return (
                                <Grid onClick={() => { setIsChatBoxVisible(!isChatBoxVisible); setSelectedRoom(room.docid) }} sx={{ display: 'flex', alignItems: 'center', position: 'relative', borderBottom: '1px solid #1f222f', padding: '10px' }} key={index}>
                                    <Avatar src={room.photoURL}></Avatar>
                                    <Box sx={{ padding: '0 10px', width: '80%' }}>
                                        <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#b5b7bf' }}>{room.name}</Typography>
                                        <Typography component={"p"} sx={{ width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', color: '#727585' }}>{room.lastMess}</Typography>
                                    </Box>
                                    <Typography component={"p"} sx={{ position: 'absolute', right: '10px', top: '15px', margin: '0', fontSize: '12px', color: '#727585' }}>{room.lastMessCreatedAt}</Typography>
                                </Grid>
                            )
                        })
                    }

                </Box>
            </Box>
        </Grid>
    )
}
