import { Avatar, ButtonBase, Grid, Typography } from '@mui/material'
import { height } from '@mui/system'
import React from 'react'

export default function GroupItem({ groupItem }) {
    return (
        <Grid sx={{ borderRadius: '10px', overflow: 'hidden' }}>
            <Grid sx={{ width: '100%', height: '150px', backgroundImage: `url(${groupItem.groupCover})`, backgroundSize: 'cover' }}></Grid>
            <Grid sx={{ position: 'relative', width: '100%', height: '70px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px 0 83px' }}>
                <Grid sx={{ position: 'absolute', top: '-25px', left: '10px', border: '4px solid #fff', borderRadius: '50%' }}>
                    <Avatar sx={{ width: '60px', height: '60px' }} src={groupItem.groupAvt} alt={groupItem.groupName} />
                </Grid>
                <Grid sx={{ minWidth: '50%', marginBottom: '15px' }}>
                    <Typography component={"p"} sx={{ textOverflow: 'clip', whiteSpace: 'nowrap', overflow: 'hidden', fontWeight: 'bold' }}>{groupItem.groupName}</Typography>
                    <Typography component={"p"} sx={{ fontSize: '10px', color: '#b9b9b9' }}>{groupItem.groupMember} Members</Typography>
                </Grid>
                <Grid sx={{ marginBottom: '15px' }}>
                    <ButtonBase sx={{ width: '100px', height: '38px', border: 'none', outline: 'none', borderRadius: '30px', background: 'linear-gradient(138deg, rgba(231,120,23,1) 0%, rgba(233,142,57,1) 55%, rgba(252,177,103,1) 86%, rgba(251,200,133,1) 100%)', fontWeight: 'bold', color: '#fff' }}>Join</ButtonBase>
                </Grid>
            </Grid>
        </Grid>
    )
}
