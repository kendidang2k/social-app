import { Avatar, Box, Grid, Tab, Tabs, Typography, } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import MessBoxFooter from '../../components/MessBoxFooter'
import MessBoxHeader from '../../components/MessBoxHeader'
import AppProvider, { AppContext } from '../../context/AppProvider'
import Link from 'next/link'
import { SiMessenger } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from 'next/router';
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import "swiper/css";
import "swiper/css/pagination";

import style from '../../styles/MessageBox.module.css'
import { styled } from '@mui/system';
import ChatRoomList from '../../components/ChatRoomList';
import ChatBoxFollowingList from '../../components/ChatBoxFollowingList';
import Head from 'next/head';
import ChatBox from '../../components/ChatBox';
import AuthProvider from '../../context/AuthProvider';
import PostProvider from '../../context/PostProvider';
import StoreProvider, { StoreContext } from '../../context/StoreProvider';
import { MessContext } from '../../context/MessProvider';
import SearchResultList from '../../components/SearchResultList';

const footerItem = [
    {
        id: '2',
        icon: <BiMessageRoundedDetail />,
        path: '/messagebox'
    },
    {
        id: '3',
        icon: <BsFillPersonFill />,
        path: '/messfriend'
    },
]

const StyledTabs = styled(Tabs)({
    padding: '0 15%',
    '& .MuiTabs-flexContainer': {
        justifyContent: 'space-between'
    },
    '& .css-naufw4-MuiButtonBase-root-MuiTab-root.Mui-selected': {
        color: '#7877ff'
    },
    '& .MuiTabs-indicator': {
        backgroundColor: '#7877ff'
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MessageBox() {

    const router = useRouter();
    const { currentUser } = useContext(MessContext)
    const { searchMessVisible, messSearchValue } = useContext(StoreContext);

    // if (currentUser[0]) {
    //     console.log("currentUser chat", currentUser)
    // }


    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     const getRoomName = () => {

    //     }

    //     return () => {
    //         getRoomName;
    //     }
    // }, [third])


    // const { currentUser } = useContext(AppContext)

    return (
        <>
            <Head>
                <title>Heyo Chat</title>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>

            {
                currentUser[0] && <Grid container sx={{ backgroundColor: '#252837' }}>
                    <Grid xs={12} md={4} sx={{ position: 'relative' }}>
                        <Box >
                            <Grid container>
                                <Grid item xs={12} >
                                    <TabPanel className={style.cover__mess} value={value} index={1} sx={{ padding: '0', position: 'relative' }} >
                                        <MessBoxHeader />
                                        <ChatRoomList currentUser={currentUser[0]} />
                                    </TabPanel>
                                </Grid>
                                <Grid item xs={12}>
                                    <TabPanel value={value} index={2}>
                                        <ChatBoxFollowingList currentUser={currentUser[0]} />
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ position: 'absolute', bottom: '0', left: 0, width: '100%', backgroundColor: '#252837', color: '#b6bbc1', boxShadow: '0px -10px 12px 0px #33344b92', zIndex: '1000000' }}>
                            <StyledTabs className={style.testClass} value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Link href='/' passHref>
                                    <a className={style.footer__tab}>
                                        <AiFillHome />
                                    </a>
                                </Link>
                                {
                                    footerItem.map((item, index) => {
                                        return (
                                            <Tab className={style.footer__tab} label={item.icon} {...a11yProps(index)} sx={{ fontSize: '20px' }} key={index} />
                                        )
                                    })
                                }
                            </StyledTabs>
                        </Box>
                    </Grid>
                    <ChatBox currentUser={currentUser[0]} />
                    {searchMessVisible && <SearchResultList currentUser={currentUser[0]} searchValue={messSearchValue} />}
                </Grid>
            }
        </>
    )
}

MessageBox.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}


