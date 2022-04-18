import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import style from '../styles/MessDetail.module.css'

export default function MessDetail(messItem) {

    const [isTimeVisible, setIsTimeVisible] = useState(false);

    return (
        <Grid className={messItem.messItem.uid == messItem.currentUser ? style.cover__current__user__mess : style.cover__other__user__mess} >
            <Typography className={messItem.messItem.uid == messItem.currentUser ? style.current__user__mess : style.other__mess} component={"p"} sx={{ maxWidth: '70%', minWidth: 'fit-content', padding: '10px 15px', backgroundColor: '#3a3c48', borderRadius: '20px', color: '#afafaf' }} onClick={() => setIsTimeVisible(!isTimeVisible)}>{messItem.messItem.text}</Typography>
            {messItem.createdAt && <Typography className={isTimeVisible ? style.created__at : style.created__at__hidden} component={"p"} sx={{ fontSize: '10px' }}>{messItem.messItem.createdAt.toDate().toLocaleString()}</Typography>}
        </Grid>
    )
}
