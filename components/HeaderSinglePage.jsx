import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function HeaderSinglePage({ title }) {
    return (
        <Grid sx={{ width: '100%', height: '70px', padding: '10px 20px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '10px', borderBottom: '2px solid #eeeeee' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontWeight: 'bold', color: '#252525', fontSize: '20px' }}>{title}</Typography>
            </Grid>
        </Grid>
    )
}
