import { Grid } from '@mui/material';
import React from 'react'
import { groupList } from '../mock/groupList'
import GroupItem from './GroupItem';

export default function GroupList() {

    const groupListData = groupList;

    return (
        <Grid>
            <Grid container sx={{ display: 'flex', marginTop: '10px' }}>
                {
                    groupListData && groupListData.map((groupItem) => {
                        return (
                            <Grid item xs={12} sm={6} sx={{ padding: { xs: 0, sm: '0 10px' }, borderRadius: '10px', marginBottom: '20px' }} key={groupItem.groupID}>
                                <GroupItem groupItem={groupItem} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid >
    )
}
