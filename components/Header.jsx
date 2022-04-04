import React, { useContext, useState } from 'react'
import headerlogo from '../assets/images/Header/Logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Button, Grid, Input, InputBase, Popover } from '@mui/material'
import { useRouter } from 'next/router';
import { BsCameraVideo, BsPerson } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiChat3Line, RiShoppingBag3Line } from "react-icons/ri";
import { MdHistory, MdChatBubbleOutline } from "react-icons/md";
import { FiSearch, FiBell } from "react-icons/fi";
import { HiOutlineCog, HiOutlineUserGroup } from "react-icons/hi";
import { BiHome } from "react-icons/bi";

import style from '../styles/Header.module.css'
import { AuthContext } from '../context/AuthProvider'
import { Field, Form, Formik } from 'formik'
import NotificationBox from './NotificationBox'
import BasicPopover from './BasicPopover'
import { StoreContext } from '../context/StoreProvider'
import SettingBox from './SettingBox'
import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import SearchResult from './SearchResult'


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
        icon: <HiOutlineUserGroup />,
        url: '/group'
    },
    {
        id: '4',
        icon: <BsPerson />,
        url: '/profile'
    },
    {
        id: '5',
        icon: <RiShoppingBag3Line />,
        url: '/'
    },

]

export default function Header({ navControl, navStatus }) {

    const user = useContext(AuthContext);
    const router = useRouter();

    const [isInputSearchVisible, setIsInputSearchVisible] = useState(false)
    const { isHeaderNotiVisible, setIsHeaderNotiVisible } = useContext(StoreContext)
    const { isSettingVisible, setIsSettingVisible } = useContext(StoreContext)
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [searchInputValuePc, setSearchInputValuePc] = useState("")


    const handleChangeInput = () => {
        setSearchResultVisible(true)
        const input = document.getElementById("searchInputPc");
        console.log("input value:", input.value)
        setSearchInputValuePc(input.value)
    }

    const handleSubmitSearch = async (searchInput) => {
        console.log('aasdasd', searchInput);
        const q = query(collection(db, "users"), where("displayName", "array-contains", searchInput));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("filter user with input", doc.data());
        });
    }

    return (
        <div className={style.header}>
            <Grid className="header__wrapper" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: { xs: '0', md: '15px 0 15px 20px' }, transition: '.3s ease-in-out' }}>
                <Link href="/homepage" className={style.homepage__logo} passHref>
                    <a>
                        <Image src={headerlogo} alt="Header logo" width={100} height={49} />
                    </a>
                </Link>
                <Grid sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between' }}>
                    {/* <button className={style.header__button}><RiChat3Line /></button> */}
                    <Link href="/messagebox" passHref>
                        <a className={style.header__button}><RiChat3Line /></a>
                    </Link>
                    <Link href="/story" passHref>
                        <a className={style.header__button}><MdHistory /></a>
                    </Link>
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
                    </Grid>
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, width: { md: '350px', lg: '350px' } }}>
                    <Grid sx={{ width: '100%', position: 'relative' }}>
                        <Formik
                            initialValues={{ searchInput: '' }}
                            onSubmit={(values, actions) => {
                                // alert(JSON.stringify(values.searchInput).replaceAll('"', ''))
                                handleSubmitSearch(JSON.stringify(values.searchInput).replaceAll('"', ''))
                                handleChangeInput();
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <FiSearch className={style.header__search__input__icon} />
                                    <Field className={style.header__search__input} id="searchInputPc" name="searchInput" placeholder="Start typing to search" />
                                    {/* {
                                        searchResultVisible ? <SearchResult inputValue={searchInputValuePc} /> : <SearchResult inputValue={searchInputValuePc} />
                                    } */}
                                    <SearchResult inputValue={searchInputValuePc} />
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
                <Grid sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    {
                        HeaderLink.map((item) => {
                            return (
                                <Link href={item.url} key={item.id} passHref>
                                    <a className={router.pathname == item.url ? style.header__button__lg__active : style.header__button__lg}>{item.icon}</a>
                                </Link>
                            )
                        })
                    }
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                    <button className={style.header__button__pc} onClick={() => setIsHeaderNotiVisible(!isHeaderNotiVisible)}><FiBell />
                        <NotificationBox />
                    </button>
                    <button className={style.header__button__pc} onClick={() => router.push('/messagebox')}><MdChatBubbleOutline /></button>
                    <Grid sx={{ position: 'relative' }}>
                        <button className={`${style.header__button__pc} ${style.header__button__pc__cog}`} onClick={() => setIsSettingVisible(!isSettingVisible)}><HiOutlineCog />
                        </button>
                        <SettingBox />
                    </Grid>

                    <Grid sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="/" passHref>
                            <a> <Avatar src={user.user.photoURL}>N</Avatar></a>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
