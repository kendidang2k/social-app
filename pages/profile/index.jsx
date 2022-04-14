import { Avatar, Grid, Typography, Box, Tabs, Tab, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import PropTypes from 'prop-types';
import { user } from '../../mock/user';

import style from '../../styles/ProfilePage.module.css'
import { AppContext } from '../../context/AppProvider';

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
                            currentUser[0].photoURL && <Avatar src={currentUser[0].photoURL} alt="Photo Avat" sx={{ width: '90px', height: '90px', position: 'absolute', bottom: '-60px', left: '5%', border: '5px solid #fff' }}></Avatar>
                        }
                    </Grid>
                    <Grid sx={{ position: 'relative', marginLeft: { xs: '120px', md: '130px', lg: '140px', marginTop: '5px' } }}>
                        <Typography component={"p"} sx={{ fontSize: '25px', fontWeight: 'bold', lineHeight: '25px' }}>
                            {currentUser[0].displayName}
                        </Typography>
                        <Typography component={"p"} sx={{ color: '#9e9e9e' }}>
                            {currentUser[0].follower.length}
                            <Typography component={'span'} sx={{ marginLeft: '5px' }}>Follower</Typography>
                        </Typography>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
    )
}
