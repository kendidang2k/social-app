import { Avatar, Grid, Typography, Box, Tabs, Tab, CircularProgress, ButtonBase } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import PropTypes from 'prop-types';
import { user } from '../../mock/user';
import { FaUserEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppProvider';
import { useRouter } from 'next/router';
import { BsPerson } from "react-icons/bs";
import { BiCake } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";

import style from '../../styles/ProfilePage.module.css'
import CurrentUserPostList from '../../components/CurrentUserPostList';
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

    const router = useRouter();

    const { currentUser, loading, setLoading } = useContext(AppContext);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        currentUser[0] != undefined && <Grid container sx={{ paddingBottom: '200px', display: { xs: 'flex', md: 'flex' }, flexFlow: { xs: 'column-reverse', md: 'row' }, maxWidth: '960px', margin: 'auto' }}>
            <Grid item xs={12} sx={{ height: '100%', padding: { xs: '0 10px', md: '25px 0 0 0' } }}>
                <Grid sx={{ padding: '15px 15px 80px 15px', backgroundColor: '#fff', borderRadius: '10px' }}>
                    <Grid sx={{ width: '100%', maxHeight: "300px", height: { xs: 'auto', sm: '300px' }, position: 'relative' }}>
                        {
                            currentUser[0].coverPhoto ?
                                <img src={currentUser[0].coverPhoto} alt="Cover Photo" className={style.cover__photo} />
                                :
                                ""
                        }
                        {
                            currentUser[0].photoURL && <Avatar src={currentUser[0].photoURL} alt="Photo Avat" sx={{ width: { xs: '75px', md: '90px' }, height: { xs: '75px', md: '90px' }, position: 'absolute', bottom: '-60px', left: { xs: '1%', md: '5%' }, border: '5px solid #fff' }}></Avatar>
                        }
                    </Grid>
                    <Grid sx={{ position: 'relative', marginLeft: { xs: '90px', md: '130px', lg: '140px' }, marginTop: '5px' }}>
                        <Typography component={"p"} sx={{ fontSize: { xs: '19px', md: '25px' }, fontWeight: 'bold', lineHeight: '25px' }}>
                            {currentUser[0].displayName}
                        </Typography>
                        <Typography component={"p"} sx={{ color: '#9e9e9e' }}>
                            {currentUser[0].follower.length}
                            <Typography component={'span'} sx={{ marginLeft: '5px' }}>Follower</Typography>
                        </Typography>
                        <Grid sx={{ position: { xs: 'relative', md: 'absolute' }, width: { xs: '80%', sm: '30%', md: '25%' }, right: '0', top: '0' }}>
                            <ButtonBase onClick={() => router.push('/editprofile')} sx={{ width: '100%', padding: { xs: '5px', md: '10px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e25a00', color: '#fff', fontSize: '15px', borderRadius: '5px' }}>
                                <Typography component={'p'} sx={{ fontSize: '20px', marginRight: '7px', lineHeight: '1', fontWeight: 'bold' }}><FaUserEdit /></Typography>
                                <Typography component={'p'} sx={{ display: 'block', lineHeight: '1' }}>Edit Profile</Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="About" {...a11yProps(0)} />
                            <Tab label="Photo" {...a11yProps(1)} />
                            <Tab label="Posts" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: '10px', backgroundColor: '#fff', borderRadius: '10px' }}>
                    <TabPanel value={value} index={0} >
                        <Grid>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: 'rgba(230, 127, 38, 1)' }}>
                                    <BsPerson />
                                </Box>
                                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Full Name</Typography>
                                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{currentUser[0].displayName}</Typography>
                                </Box>
                            </Grid>

                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#f887e1', fontSize: '20px' }}>
                                    <BiCake />
                                </Box>
                                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Age</Typography>
                                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{currentUser[0].age}</Typography>
                                </Box>
                            </Grid>

                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#71aaff', fontSize: '20px' }}>
                                    <AiOutlinePhone />
                                </Box>
                                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Phone Number</Typography>
                                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{currentUser[0].phoneNumber}</Typography>
                                </Box>
                            </Grid>

                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: '#af7d00' }}>
                                    <GoMail />
                                </Box>
                                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Email</Typography>
                                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{currentUser[0].email}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CurrentUserPostList currentuser={currentUser[0]} />
                    </TabPanel>
                </Grid>
            </Grid>
        </Grid >
    )
}
