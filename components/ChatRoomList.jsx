import { Avatar, Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from '../context/AppProvider';

import "swiper/css";
import "swiper/css/pagination";

import { AuthContext } from '../context/AuthProvider';
import { StoreContext } from '../context/StoreProvider';
import { MessContext } from '../context/MessProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { addDocument } from '../firebase/service';
import RoomItem from './RoomItem';

import style from '../styles/MessageBox.module.css'
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

    const date = new Date;
    var minutes = date.getMinutes();
    var hour = date.getHours();




    const handleAddRoom = async (user) => {
        const q = query(collection(db, "rooms"), where("members", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);
        let addRoomEnable = true;
        await querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().members.includes(user.uid)) {
                alert("existed")
                setIsChatBoxVisible(!isChatBoxVisible)
                addRoomEnable = false;
                return
            } else {
                addRoomEnable = false;
                addDocument('rooms', {
                    name: user.displayName,
                    lastMess: '',
                    lastMessCreatedAt: `${hour}:${minutes}`,
                    members: [user.uid, currentUser.uid],
                })
                setIsChatBoxVisible(!isChatBoxVisible)
                return
            }
        });
        if (addRoomEnable) {
            addDocument('rooms', {
                name: user.displayName,
                lastMess: '',
                lastMessCreatedAt: `${hour}:${minutes}`,
                members: [user.uid, currentUser.uid],
            })
        }
    }

    return (
        <Grid className={style.cover__roomlist} sx={{ margin: '35px 0 50px 0', padding: '30px 0 10px 0', height: 'calc(100vh - 45px - 40px)', overflowY: 'scroll' }}>
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
                                <RoomItem key={index} room={room} currentUser={currentUser} />
                            )
                        })
                    }

                </Box>
            </Box>
        </Grid>
    )
}
