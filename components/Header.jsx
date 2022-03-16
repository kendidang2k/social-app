import React, { useContext, useState } from 'react'
import headerlogo from '../assets/images/Header/Logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Button, Grid, Input, InputBase } from '@mui/material'
import { useRouter } from 'next/router';

import { BsCameraVideo, BsPerson } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiChat3Line, RiShoppingBag3Line } from "react-icons/ri";
import { MdHistory, MdChatBubbleOutline } from "react-icons/md";
import { FiSearch, FiBell } from "react-icons/fi";
import { HiOutlineCog } from "react-icons/hi";
import { BiHome } from "react-icons/bi";

import style from '../styles/Header.module.css'
import { AuthContext } from '../context/AuthProvider'
import { Form, Formik } from 'formik'


const HeaderLink = [
    {
        id: '1',
        icon: <BiHome />,
        url: '/homepage'
    },
    {
        id: '2',
        icon: <AiOutlineThunderbolt />,
        url: '/story'
    },
    {
        id: '3',
        icon: <BsCameraVideo />,
        url: '/'
    },
    {
        id: '4',
        icon: <BsPerson />,
        url: '/'
    },
    {
        id: '5',
        icon: <RiShoppingBag3Line />,
        url: '/'
    },

]

const handleReset = () => {
    if (!window.confirm('Reset?')) {
        throw new Error('Cancel reset');
    }
};

export default function Header({ navControl, navStatus }) {

    const user = useContext(AuthContext);
    const router = useRouter();

    const [isInputSearchVisible, setIsInputSearchVisible] = useState(false)

    return (
        <div className={style.header}>
            <Grid className="header__wrapper" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: { xs: '0', md: '15px 0 15px 20px' }, transition: '.3s ease-in-out' }}>
                <Link href="#" className={style.homepage__logo}>
                    <Image src={headerlogo} alt="Header logo" width={100} height={49} />
                </Link>
                <Grid sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between' }}>
                    <button className={style.header__button}><RiChat3Line /></button>
                    <button className={style.header__button}><MdHistory /></button>
                    <button className={style.header__button} onClick={() => setIsInputSearchVisible(!isInputSearchVisible)}><FiSearch /></button>
                    <button className={style.menu__button} onClick={() => navControl(!navStatus)}></button>
                    <Grid className={isInputSearchVisible ? style.search__form : style.search__form__off}>
                        <Formik
                            sx={{ width: '100%', height: '100%' }}
                            initialValues={{ searchInput: '' }}
                            onSubmit={(values, actions) => {
                                document.getElementById('searchInput').value = ''
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }, 1000);
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit} className={style.cover__search__form}>
                                    <InputBase id="searchInput" onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Search..." name='searchInput' sx={{ width: '100%', height: '100%', padding: '5px 40px 5px 20px' }}></InputBase>
                                    {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
                                </form>
                            )}
                        </Formik>
                        <button className={style.button__close__search} onClick={() => setIsInputSearchVisible(!isInputSearchVisible)}>X</button>
                        {/* <form >
                            
                            <button>X</button>
                        </form> */}
                    </Grid>
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, width: { md: '350px', lg: '350px' } }}>
                    <Grid sx={{ width: '100%', position: 'relative' }}>
                        <FiSearch className={style.header__search__input__icon} />
                        <input className={style.header__search__input} placeholder='Start typing to search'></input>
                    </Grid>
                </Grid>
                <Grid sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    {
                        HeaderLink.map((item) => {
                            return (
                                <Link href={item.url} key={item.id}>
                                    <a className={router.pathname == item.url ? style.header__button__lg__active : style.header__button__lg}>{item.icon}</a>
                                </Link>
                            )
                        })
                    }
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                    <button className={style.header__button__pc}><FiBell /></button>
                    <button className={style.header__button__pc}><MdChatBubbleOutline /></button>
                    <button className={`${style.header__button__pc} ${style.header__button__pc__cog}`}><HiOutlineCog /></button>
                    <Grid sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="/">
                            <a> <Avatar src={user.user.photoURL}>N</Avatar></a>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
