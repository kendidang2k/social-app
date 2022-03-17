import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function StoryPageHeader() {
    return (
        <Grid sx={{ width: '100%', height: '70px', padding: '10px 20px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', borderRadius: '10px', marginBottom: '15px' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontSize: '23px', fontWeight: 'bold' }}>Storie</Typography>
            </Grid>
        </Grid>
    )
}
