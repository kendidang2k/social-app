import { ButtonBase, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { auth } from '../firebase/config';
import { useRouter } from 'next/router'

import style from '../styles/SettingBox.module.css'

export default function SettingBox() {

    const router = useRouter();

    const { isSettingVisible } = useContext(StoreContext);

    return (
        <Grid className={isSettingVisible ? '' : style.settingbox__hidden} sx={{ display: 'block', position: 'absolute', right: 0, top: '50px', width: 'auto', backgroundColor: '#fff', padding: '10px 15px', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.48)', borderRadius: '10px' }}>
            <Grid>
                <Typography component={"p"} sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fd6600' }}>Setting</Typography>
            </Grid>
            <Grid>
                <Grid>
                    <ButtonBase onClick={() => { router.push('/profile') }} sx={{ width: 'auto', height: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', fontSize: '25px', padding: '10px 10px 10px 0', color: '#6e6e6e' }}>
                        <BsPersonFill />
                        <Typography component={"span"} sx={{ fontSize: '15px', lineHeight: '19px', marginLeft: '5px' }}>Profile</Typography>
                    </ButtonBase>
                </Grid>
                <Grid>
                    <ButtonBase onClick={() => auth.signOut()} sx={{ width: 'auto', height: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', fontSize: '25px', padding: '10px 10px 10px 0', color: '#6e6e6e' }}>
                        <AiOutlineLogout />
                        <Typography component={"span"} sx={{ fontSize: '15px', lineHeight: '19px', marginLeft: '5px' }}>Logout</Typography>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Grid>
    )
}
