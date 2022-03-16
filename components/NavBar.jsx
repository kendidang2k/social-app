import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Link from 'next/link';
import { BiTv } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { FaBlog, FaStore } from "react-icons/fa";

import style from '../styles/Navbar.module.css'
import { StoreContext } from '../context/StoreProvider';

const newsFeedListItem = [
    {
        title: 'Newsfeed',
        icon: <BiTv />,
        linkTo: '/',
        bgColor: 'linear-gradient(to right,#0575e6,#021b79)'
    },
    {
        title: 'Explore Stories',
        icon: <RiGlobalLine />,
        linkTo: '/',
        bgColor: 'linear-gradient(to right,#f2994a,#f2c94c)'
    },
    {
        title: 'Groups',
        icon: <HiOutlineUserGroup />,
        linkTo: '/',
        bgColor: 'linear-gradient(to right,#ee0979,#ff6a00)'
    },
    {
        title: 'Profile',
        icon: <BsPerson />,
        linkTo: '/',
        bgColor: 'linear-gradient(135deg,#05f,#09f)'
    },

]


const morePageItem = [
    {
        title: 'Blog',
        icon: <FaBlog />,
        linkTo: '/',
        bgColor: 'linear-gradient(135deg,#05f,#09f)'
    },
    {
        title: 'Market',
        icon: <FaStore />,
        linkTo: '/',
        bgColor: 'linear-gradient(to right,#ee0979,#ff6a00)'
    },
]

export default function Navbar() {

    return (
        <Grid container sx={{ backgroundColor: '#f7f7f7', height: '100%', width: '100%' }} >
            <Grid item xs={12} sx={{ padding: '25px 15px', }}>
                <Grid container>
                    <Grid item xs={12} sx={{ borderRadius: '10px', backgroundColor: '#fff', padding: '10px 15px' }}>
                        <Grid className={style.title} sx={{ fontSize: '30px' }}>
                            <Typography sx={{ fontSize: '15px', color: '#adb5bd' }}>News Feed</Typography>
                        </Grid>
                        <ul className={style.list__link}>
                            {
                                newsFeedListItem.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link href={item.linkTo}>
                                                <a className={style.link__item}>
                                                    <Grid sx={{ width: '45px', height: '45px', background: `${item.bgColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', fontSize: '25px', marginRight: '15px' }}>
                                                        {item.icon}
                                                    </Grid>
                                                    {item.title}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={12}
                        sx={{ borderRadius: '10px', backgroundColor: '#fff', padding: '10px 15px', marginTop: '15px' }}>
                        <Grid className={style.title} sx={{ fontSize: '30px' }}>
                            <Typography sx={{ fontSize: '15px', color: '#adb5bd' }}>More Page</Typography>
                        </Grid>
                        <ul className={style.list__link}>
                            {
                                morePageItem.map((itemLink, index) => {
                                    return (
                                        <li key={index}>
                                            <Link href={itemLink.linkTo}>
                                                <a className={style.link__item}>
                                                    <Grid sx={{ width: '45px', height: '45px', background: `${itemLink.bgColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', fontSize: '25px', marginRight: '15px' }}>
                                                        {itemLink.icon}
                                                    </Grid>
                                                    {itemLink.title}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    {/* <Grid item xs={12}></Grid> */}
                </Grid >
            </Grid>
        </Grid >
    )
}
