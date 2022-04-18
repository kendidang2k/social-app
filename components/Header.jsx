import React, { useContext, useState } from 'react'
import headerlogo from '../assets/images/Header/Logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Button, ButtonBase, Grid, Input, InputBase, Popover, Typography } from '@mui/material'
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
import { AppContext } from '../context/AppProvider'


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
    const { currentUser } = useContext(AppContext)

    const [isInputSearchVisible, setIsInputSearchVisible] = useState(false)
    const { isHeaderNotiVisible, setIsHeaderNotiVisible } = useContext(StoreContext)
    const { isSettingVisible, setIsSettingVisible } = useContext(StoreContext)
    const [searchInputValuePc, setSearchInputValuePc] = useState("")
    const [searchInputValueMb, setSearchInputValueMb] = useState("")

    const { searchResultVisible, setSearchResultVisible } = useContext(StoreContext)


    const handleChangeInput = () => {
        const input = document.getElementById("searchInputPc");
        setSearchInputValuePc(input.value)
    }

    const handleChangeInputMobile = () => {
        const input = document.getElementById("searchInput");
        setSearchInputValueMb(input.value)
    }

    const handleSubmitSearch = async (searchInput) => {
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
                    <Link href="/messagebox">
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
                                handleSubmitSearch(JSON.stringify(values.searchInput).replaceAll('"', ''))
                                setSearchResultVisible(true)
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit} className={style.cover__search__form}>
                                    <InputBase id="searchInput" onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Search..." name='searchInput' sx={{ width: '100%', height: '100%', padding: '5px 40px 5px 20px' }}></InputBase>
                                    {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
                                    {
                                        searchResultVisible ? <SearchResult inputValue={searchInputValueMb} /> : ''
                                    }
                                </form>
                            )}
                        </Formik>
                        <button className={style.button__close__search} onClick={() => { setIsInputSearchVisible(!isInputSearchVisible); setSearchResultVisible(false) }}>X</button>
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
                                setSearchResultVisible(true)
                                document.getElementById('searchInputPc').value = ''
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <FiSearch className={style.header__search__input__icon} />
                                    <Field className={style.header__search__input} id="searchInputPc" name="searchInput" placeholder="Start typing to search" />
                                    {/* <input onBlur={setSearchResultVisible(true)} type="text" name="searchInput" placeholder="Start typing to search" /> */}
                                    {
                                        searchResultVisible ? <SearchResult inputValue={searchInputValuePc} /> : ''
                                    }
                                    {/* <SearchResult inputValue={searchInputValuePc} /> */}
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
                        {
                            currentUser[0] && <Typography sx={{ width: '17px', height: '17px', backgroundColor: '#e40000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: '8px', top: '4px', color: '#fff', fontSize: '10px', fontWeight: 'bold', lineHeight: '8px' }}>{currentUser[0].notifications.length}</Typography>
                        }
                        {
                            currentUser[0] && <NotificationBox notificationsData={currentUser[0].notifications} />
                        }
                    </button>
                    <button className={style.header__button__pc} onClick={() => router.push('/messagebox')}><MdChatBubbleOutline /></button>
                    <Grid sx={{ position: 'relative' }}>
                        <button className={`${style.header__button__pc} ${style.header__button__pc__cog}`} onClick={() => setIsSettingVisible(!isSettingVisible)}><HiOutlineCog />
                        </button>
                        <SettingBox />
                    </Grid>

                    <Grid sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="/profile" passHref>
                            <a> <Avatar src={user.user.photoURL}>N</Avatar></a>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
