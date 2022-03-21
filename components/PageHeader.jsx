import { Grid, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'

import style from '../styles/FriendRequest.module.css'

export default function PageHeader({ title }) {
    return (
        <Grid sx={{ width: '100%', height: '70px', padding: '10px 20px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '10px', borderBottom: '2px solid #eeeeee' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#252525', fontSize: '14px' }}>{title}</Typography>
            </Grid>
            <Link href="/">
                <a className={style.see__all__request}>See all</a>
            </Link>
        </Grid>
    )
}
