import { Avatar, Grid, Typography } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { MessContext } from '../context/MessProvider'
import { db } from '../firebase/config'
import { addDocument } from '../firebase/service'

export default function SearchResultList({ searchValue, currentUser }) {

    console.log("searchValue", searchValue)
    console.log("currentUser", currentUser)
    const { allFollowingUser } = useContext(MessContext);

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
        <Grid sx={{ width: '100%', height: '100%', backgroundColor: '#252837', position: 'absolute', top: 0, left: 0, zIndex: 1, paddingTop: '50px' }}>
            <Grid>
                {
                    allFollowingUser && allFollowingUser.filter(user => user.displayName.includes(searchValue)).map((item) => {
                        console.log("item", item)
                        return (
                            <Grid onClick={() => handleAddRoom(item)} sx={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }} key={item.docid}>
                                <Avatar src={item.photoURL} sx={{ width: '30px', height: '30px' }}></Avatar>
                                <Typography component={"p"} sx={{ marginLeft: '10px', color: '#fff' }}>{item.displayName}</Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}
