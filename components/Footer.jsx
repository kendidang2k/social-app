import { Avatar, Grid } from '@mui/material'
import React, { useContext } from 'react'
import Link from 'next/link'

import { BiLayout } from "react-icons/bi";
import { FiBox } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { BsStack } from "react-icons/bs";
import { ImStack } from "react-icons/im";




import style from '../styles/Footer.module.css'
import { AuthContext } from '../context/AuthProvider';

export default function Footer() {

    const user = useContext(AuthContext);

    return (
        <Grid className={style.footer} sx={{ display: { xs: 'block', md: 'none' } }}>
            <Grid container>
                <Grid item xs={2.4} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', padding: '10px' }}>
                    <Link href="/homepage" passHref>
                        <a className={style.footer__link__icon}>
                            <GoHome />
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2.4} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', padding: '10px' }}>
                    <Link href="#" passHref>
                        <a className={style.footer__link__icon}>
                            <FiBox />
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2.4} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', padding: '10px' }}>
                    <Link href="#" passHref>
                        <a className={style.footer__link__icon}>
                            <BiLayout />
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2.4} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', padding: '10px' }}>
                    <Link href="#" passHref>
                        <a className={style.footer__link__icon}>
                            <ImStack />
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2.4} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', padding: '10px' }}>
                    <Link href="/profile" passHref>
                        <a className={style.footer__link__icon}>
                            <Avatar sx={{ width: '30px', height: '30px' }} src={user.user.photoURL}></Avatar>
                        </a>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}
