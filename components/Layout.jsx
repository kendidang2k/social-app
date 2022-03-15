import { Grid } from '@mui/material'
import React, { Children, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Navbar from './NavBar'

import style from '../styles/Layout.module.css'

export default function Layout({ children }) {

    const [isNavbarVisible, setIsNavbarVisible] = useState(true)

    // let currentHideNav = (window.innerWidth <= 760);
    // if (window.innerWidth >= 900) {
    //     setIsNavbarVisible(true)
    // }

    return (
        <div className={style.layout}>
            <Header navControl={setIsNavbarVisible} navStatus={isNavbarVisible} />
            <Grid container sx={{ paddingTop: '100px', backgroundColor: '#f7f7f7' }}>
                <Grid item xs={12} md={3.5} lg={2.5} sx={{ width: '300px', height: { xs: '100%', md: 'calc(100vh - 100px)' }, position: { xs: 'fixed', md: 'relative' }, top: 0, left: 0, zIndex: '10', backgroundColor: '#fff', boxShadow: { xs: '11px 0px 10px -3px #00000034', md: 'none' }, transition: '0.4s ease-in-out', overflow: 'scroll' }} className={isNavbarVisible ? " " : style.navbar__hidden}>
                    <Navbar />
                </Grid>
                <Grid item xs={12} md={8.5} lg={9.5}>
                    <Grid container>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
            <Footer></Footer>
        </div>
    )
}