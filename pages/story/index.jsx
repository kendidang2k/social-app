import { Grid } from '@mui/material'
import React from 'react'
import HeaderSinglePage from '../../components/HeaderSinglePage'
import StoryPageList from '../../components/StoryPageList'

export default function Story() {
    return (
        <Grid container sx={{ paddingBottom: '200px', display: { xs: 'flex', md: 'flex' }, flexFlow: { xs: 'column-reverse', md: 'row' }, maxWidth: '960px', margin: 'auto' }}>
            <Grid item xs={12} sx={{ height: '100%', padding: { xs: '0 10px', md: '25px 0 0 0' } }}>
                <HeaderSinglePage title={"Stories"} />
                <StoryPageList />
            </Grid>
        </Grid >
    )
}
