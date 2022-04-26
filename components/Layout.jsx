import { Grid } from '@mui/material'
import React, { Children, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Navbar from './NavBar'
import { useRouter } from 'next/router'

import style from '../styles/Layout.module.css'

export default function Layout({ children }) {

    const [isNavbarVisible, setIsNavbarVisible] = useState(true)

    const router = useRouter();

    console.log("router", router.pathname)

    window.addEventListener('resize', function (event) {
        if (this.screen.width > 900) {
            setIsNavbarVisible(true);
            event.preventDefault();
        }
    }, true);

    return (
        <div className={style.layout}>
            <Header navControl={setIsNavbarVisible} navStatus={isNavbarVisible} />
            <Grid container sx={{ paddingTop: { xs: '72px', md: '100px' }, backgroundColor: '#eeeeee', height: '100vh', overflow: 'hidden' }}>
                <Grid item xs={12} md={3.5} lg={2} sx={{ width: '300px', height: { xs: '100%', md: 'calc(100vh - 100px)' }, position: { xs: 'fixed', md: 'relative' }, top: 0, left: 0, zIndex: '10', backgroundColor: '#fff', boxShadow: { xs: '11px 0px 10px -3px #00000034', md: 'none' }, transition: '0.4s ease-in-out', overflow: 'hidden' }} className={isNavbarVisible ? style.navbar : style.navbar__hidden__mobile}>
                    <Navbar />
                </Grid>
                <Grid className={router.pathname == '/editprofile' ? style.homepage__edit : style.homepage__content} item xs={12} md={8.5} lg={10} sx={{ height: '100vh', overflowY: 'scroll', width: '100%', paddingTop: '10px' }}>
                    <Grid>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
            <Footer></Footer>
        </div>
    )
}
