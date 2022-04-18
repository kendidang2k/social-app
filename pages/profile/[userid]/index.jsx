import { Avatar, Grid, Typography, Box, Tabs, Tab, ButtonBase, CircularProgress, InputBase, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { user } from '../../../mock/user';
import { AuthContext } from '../../../context/AuthProvider';
import { useRouter } from 'next/router'

import { arrayRemove, arrayUnion, doc, getDoc, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';

import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { AppContext } from '../../../context/AppProvider';

import style from '../../../styles/ProfilePage.module.css'

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

export default function Profile() {

    const { currentUser } = useContext(AppContext);

    // const currentUser = user;
    const router = useRouter()

    const userClickedId = router.query.userid;
    const userClickedUID = localStorage.getItem("userClickedUID")

    const [userDataInfo, setUserDataInfo] = useState({})
    const [isFollowed, setIsFollowed] = useState(false)
    const [followerNumber, setFollowerNumber] = useState(0)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const userClickedId = router.query.userid;

        const getDataUser = async () => {
            const docRef = doc(db, "users", userClickedId);
            const docSnap = await getDoc(docRef);
            setFollowerNumber(docSnap.data().follower.length)
            if (currentUser[0] && currentUser[0].following.includes(userClickedId)) {
                setIsFollowed(true)
            } else {
                setIsFollowed(false)
            }
            setUserDataInfo(docSnap.data());
            return
        }

        getDataUser();
    }, [userClickedId])

    const handleChangeCoverPhoto = () => {

    }

    const handleUnfollow = async () => {
        const docRef = doc(db, 'users', currentUser[0].docid);
        updateDoc(docRef, {
            following: arrayRemove(userClickedUID)
        });
        const userClickedRef = doc(db, 'users', userClickedId);
        updateDoc(userClickedRef, {
            follower: arrayRemove(currentUser[0].uid)
        });
        const docSnap = await getDoc(userClickedRef);
        setFollowerNumber(docSnap.data().follower.length)
        setIsFollowed(false)
    }

    const handleFollow = () => {
        const docRef = doc(db, 'users', currentUser[0].docid);
        updateDoc(docRef, {
            following: arrayUnion(userClickedUID)
        });
        const userClickedRef = doc(db, 'users', userClickedId);
        updateDoc(userClickedRef, {
            follower: arrayUnion(currentUser[0].uid)
        });
        updateDoc(userClickedRef, {
            notifications: arrayUnion(currentUser[0].docid)
        });
        setFollowerNumber(followerNumber + 1)
        setIsFollowed(true)
    }

    return (
        userDataInfo != {} ?
            <Grid container sx={{ paddingBottom: '200px', display: { xs: 'flex', md: 'flex' }, flexFlow: { xs: 'column-reverse', md: 'row' }, maxWidth: '960px', margin: 'auto' }}>
                <Grid item xs={12} sx={{ height: '100%', padding: { xs: '0 10px', md: '25px 0 0 0' } }}>
                    <Grid sx={{ padding: '15px 15px 80px 15px', backgroundColor: '#fff', borderRadius: '10px' }}>
                        <Grid sx={{ width: '100%', maxHeight: "300px", height: { xs: 'auto', sm: '300px' }, position: 'relative' }}>
                            {
                                userDataInfo.coverPhoto ? <img src={userDataInfo.coverPhoto} alt="Cover Photo" className={style.cover__photo} /> : ''
                            }
                            <Box sx={{ position: 'absolute', right: '0', top: '0' }}>
                                <Button
                                    className={style.button__change__cover__photo}
                                    variant="contained"
                                    component="label"
                                    sx={{ backgroundColor: 'inherit', boxShadow: 'none', color: '#fd6600', fontSize: '25px', padding: '5px 0' }}
                                >
                                    <Typography component={"p"} sx={{ fontSize: '10px', textTransform: 'initial', color: "#7c7c7c", fontWeight: 'bold', marginLeft: '5px' }}>Change Cover Photo</Typography>
                                    <input
                                        type="file"
                                        hidden
                                        name='postImage'
                                        id='postImage'
                                        accept="image/*"
                                    // onChange={onChangeImageCreatePost}
                                    />
                                </Button>
                            </Box>
                            <Avatar src={userDataInfo.photoURL} alt="Photo Avat" sx={{ width: '90px', height: '90px', position: 'absolute', bottom: '-60px', left: '5%', border: '5px solid #fff' }}></Avatar>
                        </Grid>
                        <Grid sx={{ position: 'relative', marginLeft: { xs: '120px', md: '130px', lg: '140px', marginTop: '5px' } }}>
                            <Typography component={"p"} sx={{ fontSize: '25px', fontWeight: 'bold', lineHeight: '25px' }}>
                                {userDataInfo.displayName}
                            </Typography>
                            {
                                userDataInfo.follower && <Typography component={"p"} sx={{ color: '#9e9e9e' }}>
                                    {followerNumber} Follower
                                </Typography>
                            }
                            {
                                currentUser[0] && currentUser[0].docid != userClickedId ?
                                    <Grid sx={{ position: 'absolute', right: '0', top: '0' }}>
                                        {
                                            isFollowed ? <ButtonBase onClick={handleUnfollow} sx={{ width: '150px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e25a00', color: '#fff', fontSize: '15px' }}>
                                                <Typography component={'p'} sx={{ fontSize: '20px', marginRight: '7px' }}><RiUserUnfollowLine /></Typography>
                                                <Typography component={'p'}>Unfollow</Typography>
                                            </ButtonBase>
                                                :
                                                <ButtonBase onClick={handleFollow} sx={{ width: '150px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e25a00', color: '#fff', fontSize: '15px' }}>
                                                    <Typography component={'p'} sx={{ fontSize: '20px', marginRight: '7px' }}><RiUserFollowLine /></Typography>
                                                    <Typography component={'p'}>Follow</Typography>
                                                </ButtonBase>
                                        }
                                    </Grid>
                                    : ""
                            }

                        </Grid>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '10px' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="About" {...a11yProps(0)} />
                                <Tab label="Photo" {...a11yProps(1)} />
                                <Tab label="Blog" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: '10px' }}>
                        <TabPanel value={value} index={0}>
                            About
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid >
            :
            <CircularProgress />
    )
}
