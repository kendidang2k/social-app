import { Avatar, Grid, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreProvider'
import { db } from '../firebase/config'
// import { notificationData } from '../mock/notificationData'

import style from '../styles/NotificationBox.module.css'

export default function NotificationBox({ notificationsData }) {

    const { isHeaderNotiVisible } = useContext(StoreContext)
    const notificationDataList = notificationsData;

    const [notificationDataDetail, setNotificationDataDetail] = useState([])

    useEffect(() => {
        const getNotiData = () => {
            let arrayData = [];
            notificationDataList.forEach(async (docid) => {
                const docRef = doc(db, "users", docid);
                const docSnap = await getDoc(docRef);
                const { displayName, photoURL, createdAt } = docSnap.data();
                arrayData.push({ displayName, photoURL, createdAt, docid })
            });
            setNotificationDataDetail(arrayData)
        }

        getNotiData()

    }, [notificationDataList])


    return (
        <Grid className={isHeaderNotiVisible ? '' : style.notibox__hidden} sx={{ display: 'block', position: 'absolute', right: 0, top: '50px', width: 'auto', height: 'auto', maxHeight: '400px', backgroundColor: '#fff', padding: '10px 15px', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.48)', borderRadius: '10px', overflow: 'overlay' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontSize: '20px', fontWeight: 'bold' }}>Notification</Typography>
            </Grid>
            <ul className={style.noti__list}>
                {
                    notificationDataDetail && notificationDataDetail.map((notiItem, index) => {

                        return (
                            <li key={index}>
                                <Link href={`/profile/${notiItem.docid}`} passHref>
                                    <a>
                                        <Grid container sx={{ width: '270px', backgroundColor: '#f3f3f3', padding: '10px', borderRadius: '10px' }}>
                                            <Grid item xs={2}>
                                                <Avatar src={notiItem.photoURL} alt={notiItem.displayName} sx={{ width: '40px', height: '40px' }}></Avatar>
                                            </Grid>
                                            <Grid item xs={10} sx={{ paddingLeft: '10px' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography component={"p"} sx={{ color: '#000', fontSize: '14px', fontWeight: 'bold', textAlign: 'left' }}>{notiItem.displayName}</Typography>
                                                    <Typography component={"p"} sx={{ fontSize: '9px', fontWeight: 'bold', color: '#b4b4b4' }}>{notiItem.createdAt.toDate().toLocaleString()}</Typography>
                                                </Grid>
                                                <Typography component={"p"} sx={{ textAlign: 'left', color: "#b4b4b4", fontSize: '13px' }}>Followed you</Typography>
                                            </Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

        </Grid>
    )
}
