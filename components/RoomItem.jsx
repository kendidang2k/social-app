import { async } from '@firebase/util';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { MessContext } from '../context/MessProvider';
import { StoreContext } from '../context/StoreProvider';
import { db } from '../firebase/config';


export default function RoomItem({ room, currentUser }) {

    const { isChatBoxVisible, setIsChatBoxVisible } = useContext(StoreContext);
    const { setSelectedRoom } = useContext(MessContext);
    const [roomName, setRoomName] = useState('')

    useEffect(() => {
        const getRoomName = () => {
            console.log("room members", room.members)
            console.log("currentUser", currentUser.uid)

            room.members.forEach(async (e) => {
                if (currentUser.uid != e) {
                    const q = await query(collection(db, "users"), where("uid", "==", e));
                    const querySnapshot = await getDocs(q);
                    await querySnapshot.forEach((doc) => {
                        console.log("member room", doc.data().displayName);
                        setRoomName(doc.data().displayName);
                    });
                }
            })
        }

        getRoomName();
    }, [room])


    return (
        <Grid onClick={() => { setIsChatBoxVisible(!isChatBoxVisible); setSelectedRoom(room.docid) }} sx={{ display: 'flex', alignItems: 'center', position: 'relative', borderBottom: '1px solid #1f222f', padding: '10px' }}>
            <Avatar src={room.photoURL}></Avatar>
            <Box sx={{ padding: '0 10px', width: '80%' }}>
                {
                    roomName != '' && <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#b5b7bf' }}>{roomName}</Typography>
                }
                <Typography component={"p"} sx={{ width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', color: '#727585' }}>{room.lastMess}</Typography>
            </Box>
            <Typography component={"p"} sx={{ position: 'absolute', right: '10px', top: '15px', margin: '0', fontSize: '12px', color: '#727585' }}>{room.lastMessCreatedAt}</Typography>
        </Grid>
    )
}
