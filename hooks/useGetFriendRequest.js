import { Grid } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

export default function useGetFriendRequest({ currentUser }) {

    const [friendRequestList, setFriendRequestList] = useState([])

    useEffect(() => {
        let arrayRequestList = [];

        const getFriendRequest = () => {
            currentUser.notifications.forEach(async (element, index) => {
                if (index == 3) {
                    return;
                }
                const requestUserRef = await doc(db, "users", element);
                const requestsUserSnap = await getDoc(requestUserRef);
                if (requestsUserSnap.exists()) {
                    arrayRequestList.push({
                        docid: requestsUserSnap.id,
                        ...requestsUserSnap.data()
                    })
                }
                setFriendRequestList(...arrayRequestList)
            });
        }

        return getFriendRequest;

    }, [currentUser.notifications])

    if (friendRequestList && friendRequestList.length > 0) {
        return friendRequestList;
    }
}
