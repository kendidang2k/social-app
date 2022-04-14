import { Avatar, AvatarGroup, Grid, Typography } from '@mui/material'
import React from 'react'
import PageHeader from './PageHeader'
import Link from 'next/link'

import { groupList } from '../mock/groupList'

import style from '../styles/SuggestGroup.module.css'

export default function SuggestGroup() {

    const suggestGroup = groupList[0];

    return (
        <Grid sx={{ backgroundColor: '#fff', borderRadius: '10px', marginTop: '10px' }}>
            <PageHeader title={"Suggest Group"} linkTo={"/group"} />
            <Grid sx={{ padding: '15px' }}>
                <Grid sx={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                    <img src={suggestGroup.groupCover} alt="Group Cover IMG" className={style.suggestGroup__bg__cover} />
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                    <AvatarGroup max={4} >
                        <Avatar alt="Remy Sharp" sx={{ width: '35px', height: '35px' }} src="https://c8.alamy.com/comp/R2B7N5/portrait-of-young-handsome-man-in-white-shirt-outdoor-nice-appearance-with-stylish-hair-and-beard-leaning-with-a-side-on-a-wall-R2B7N5.jpg" />
                        <Avatar alt="Travis Howard" sx={{ width: '35px', height: '35px' }} src="https://i.pinimg.com/originals/e1/c8/76/e1c876ab572bdb700fd04319788003ab.jpg" />
                        <Avatar alt="Cindy Baker" sx={{ width: '35px', height: '35px' }} src="https://i.pinimg.com/originals/bb/1d/3c/bb1d3c90c312b3ddf4c02ced8c6d5a2c.jpg" />
                        <Avatar alt="Agnes Walker" sx={{ width: '35px', height: '35px' }} src="https://1.bp.blogspot.com/-hJ4zjTtWIDY/XyTr43gpMEI/AAAAAAAA6kg/NmIXfQjrFno6tGFtumkxcxJq4NN3xAMUQCLcBGAsYHQ/s1600/1.Thailand-Beautiful-Girl-View-Benyapa-Long-Hair-Sport-Girl-TruePic.net.jpg" />
                        <Avatar alt="Cindy Baker" sx={{ width: '35px', height: '35px' }} src="https://i.pinimg.com/originals/bb/1d/3c/bb1d3c90c312b3ddf4c02ced8c6d5a2c.jpg" />
                        <Avatar alt="Agnes Walker" sx={{ width: '35px', height: '35px' }} src="https://1.bp.blogspot.com/-hJ4zjTtWIDY/XyTr43gpMEI/AAAAAAAA6kg/NmIXfQjrFno6tGFtumkxcxJq4NN3xAMUQCLcBGAsYHQ/s1600/1.Thailand-Beautiful-Girl-View-Benyapa-Long-Hair-Sport-Girl-TruePic.net.jpg" />
                        <Avatar alt="Cindy Baker" sx={{ width: '35px', height: '35px' }} src="https://i.pinimg.com/originals/bb/1d/3c/bb1d3c90c312b3ddf4c02ced8c6d5a2c.jpg" />
                        <Avatar alt="Agnes Walker" sx={{ width: '35px', height: '35px' }} src="https://1.bp.blogspot.com/-hJ4zjTtWIDY/XyTr43gpMEI/AAAAAAAA6kg/NmIXfQjrFno6tGFtumkxcxJq4NN3xAMUQCLcBGAsYHQ/s1600/1.Thailand-Beautiful-Girl-View-Benyapa-Long-Hair-Sport-Girl-TruePic.net.jpg" />
                    </AvatarGroup>
                    <Link href='/' passHref>
                        <a className={style.group__member}>{suggestGroup.groupMember} Members</a>
                    </Link>
                    <Typography component={"p"}></Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
