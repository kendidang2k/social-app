import { async } from '@firebase/util'
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import { MessContext } from '../context/MessProvider'
import { db } from '../firebase/config'
import { addDocument } from '../firebase/service'

export default function ChatBoxFollowingList({ currentUser }) {

    const { allFollowingUser, selectedRoom, setSelectedRoom } = useContext(MessContext);

    const date = new Date;
    var minutes = date.getMinutes();
    var hour = date.getHours();

    console.log()

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
        <Grid sx={{ marginTop: '45px' }}>
            <Box sx={{ position: 'fixed', top: 0, left: '0', width: '100%', height: '45px', backgroundColor: '#252837', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
                <Box sx={{ position: 'absolute', left: '10px' }}>
                    <Avatar src={currentUser.photoURL} sx={{ width: '25px', height: '25px' }}></Avatar>
                </Box>
                <Typography component={"p"} sx={{ color: '#b6bbc1', fontWeight: 'bold' }}>Following List</Typography>
            </Box>
            <Box sx={{ height: 'calc(100vh - 45px - 48px)', backgroundColor: '#252837', overflow: 'scroll' }}>
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
