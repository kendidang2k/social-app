import { Grid } from '@mui/material'
import React from 'react'
import { storyList } from '../mock/storyList'
import StoryItem from './StoryItem';

export default function StoryPageList() {


    const storyListData = storyList;

    return (
        <Grid>
            <Grid container sx={{ display: 'flex' }}>
                {
                    storyListData && storyListData.map((storyItem) => {
                        return (
                            <Grid item xs={6} md={4} sx={{ padding: '10px', borderRadius: '10px', height: { xs: '270px', md: '350px' } }} key={storyItem.storyID}>
                                <StoryItem storyItem={storyItem} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}
