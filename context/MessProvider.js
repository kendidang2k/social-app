import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthMessContext } from './AuthMessProvider';
import { AuthContext } from './AuthProvider';

export const MessContext = createContext();

export default function MessProvider({ children }) {

    const { user } = useContext(AuthMessContext);
    const [selectedRoom, setSelectedRoom] = useState({})

    const currentUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: user.uid,
        }
    }, [user.uid])

    const currentUser = useFirestore('users', currentUserCondition)

    // rooms
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
            orderBy: true
        }
    }, [user.uid])

    const rooms = useFirestore('rooms', roomsCondition)

    const allFollowingUserCondition = useMemo(() => {
        return {
            fieldName: 'follower',
            operator: 'array-contains',
            compareValue: user.uid,
            orderBy: true
        }
    }, [user.uid])

    const allFollowingUser = useFirestore('users', allFollowingUserCondition)

    console.log('allFollowingUser', allFollowingUser)

    const recentRoom = useMemo(() => rooms.find((room) =>
        room.docid === selectedRoom
    )
        || {}, [rooms, selectedRoom])

    // const userCondition = useMemo(() => {
    //     return {
    //         fieldName: 'uid',
    //         operator: 'in',
    //         compareValue: recentRoom.members,
    //     }
    // }, [recentRoom.members])

    // const members = useFirestore('user', userCondition)

    const messCondition = useMemo(() => {
        return {
            fieldName: 'roomID',
            operator: '==',
            compareValue: recentRoom.docid,
            orderBy: false
        }
    }, [recentRoom.docid])

    const messages = useFirestore('messages', messCondition);

    return (
        <MessContext.Provider value={{
            currentUser,
            allFollowingUser,
            selectedRoom, setSelectedRoom,
            rooms,
            recentRoom,
            messages
        }}>
            {children}
        </MessContext.Provider>
    )

}
