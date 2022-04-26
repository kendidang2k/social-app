import { async } from '@firebase/util'
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { MessContext } from '../context/MessProvider'
import { db } from '../firebase/config'
import { addDocument } from '../firebase/service'

import style from '../styles/MessageBox.module.css'

export default function ChatBoxFollowingList({ currentUser }) {

    const { allFollowingUser, selectedRoom, setSelectedRoom } = useContext(MessContext);

    const date = new Date;
    var minutes = date.getMinutes();
    var hour = date.getHours();

    const handleAddRoom = async (user) => {
        const q = query(collection(db, "rooms"), where("members", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);
        let addRoomEnable = true;
        querySnapshot.forEach((doc) => {
            if (doc.data().members.includes(user.uid)) {
                alert("existed")
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
        <Grid sx={{}}>
            <Box sx={{ position: 'absolute', top: 0, left: '0', width: '100%', height: '60px', backgroundColor: '#252837', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
                <Box sx={{ position: 'absolute', left: '10px' }}>
                    <Avatar src={currentUser.photoURL} sx={{ width: '25px', height: '25px' }}></Avatar>
                </Box>
                <Typography component={"p"} sx={{ color: '#b6bbc1', fontWeight: 'bold' }}>Following List</Typography>
            </Box>
            <Box className={style.cover__roomlist} sx={{ height: 'calc(100vh - 45px - 40px)', backgroundColor: '#252837', overflowY: 'scroll', overflowX: 'hidden', margin: '35px 0 50px 0', paddingTop: '20px' }}>
                {
                    allFollowingUser && allFollowingUser.map((item, index) => {
                        return (
                            <Grid onClick={() => handleAddRoom(item)} sx={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }} key={index}>
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
