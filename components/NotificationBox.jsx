import { Avatar, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'
import { notificationData } from '../mock/notificationData'

import style from '../styles/NotificationBox.module.css'

export default function NotificationBox() {

    const notificationDataList = notificationData;
    const { isHeaderNotiVisible } = useContext(StoreContext)

    return (
        <Grid className={isHeaderNotiVisible ? '' : style.notibox__hidden} sx={{ display: 'block', position: 'absolute', right: 0, top: '50px', width: 'auto', backgroundColor: '#fff', padding: '10px 15px', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.48)', borderRadius: '10px' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontSize: '20px', fontWeight: 'bold' }}>Notification</Typography>
            </Grid>
            <ul className={style.noti__list}>
                {
                    notificationDataList && notificationDataList.map((notiItem) => {
                        return (
                            <li key={notiItem.notificationID}>
                                <Link href='/' passHref>
                                    <a>
                                        <Grid container sx={{ width: '250px', backgroundColor: '#f3f3f3', padding: '10px', borderRadius: '10px' }}>
                                            <Grid item xs={2}>
                                                <Avatar src={notiItem.senderAvt} alt={notiItem.notiSender} sx={{ width: '40px', height: '40px' }}></Avatar>
                                            </Grid>
                                            <Grid item xs={10} sx={{ paddingLeft: '10px' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography component={"p"} sx={{ color: '#000', fontSize: '14px', fontWeight: 'bold', }}>{notiItem.notiSender}</Typography>
                                                    <Typography component={"p"} sx={{ fontSize: '9px', fontWeight: 'bold', color: '#b4b4b4' }}>{notiItem.sentAt}</Typography>
                                                </Grid>
                                                <Typography component={"p"} sx={{ textAlign: 'left', color: "#b4b4b4", fontSize: '13px' }}>Sent you a request</Typography>
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
