import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import style from '../styles/MessDetail.module.css'

export default function MessDetail({ messDetail, createdAt, uid }) {

    const [isTimeVisible, setIsTimeVisible] = useState(false);

    return (
        <Grid className={uid == 1 ? style.cover__current__user__mess : style.cover__other__user__mess} >
            <Typography className={uid == 1 ? style.current__user__mess : style.other__mess} component={"p"} sx={{ maxWidth: '70%', padding: '10px 15px', backgroundColor: '#3a3c48', borderRadius: '20px', color: '#afafaf' }} onClick={() => setIsTimeVisible(!isTimeVisible)}>{messDetail}</Typography>
            <Typography className={isTimeVisible ? style.created__at : style.created__at__hidden} component={"p"} sx={{ fontSize: '10px' }}>{createdAt}</Typography>
        </Grid>
    )
}
