import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { BsPerson } from "react-icons/bs";
import { BiCake } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";

export default function AboutTab({ userDataInfo }) {
    return (
        <Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: 'rgba(230, 127, 38, 1)' }}>
                    <BsPerson />
                </Box>
                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Full Name</Typography>
                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{userDataInfo.displayName}</Typography>
                </Box>
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#f887e1', fontSize: '20px' }}>
                    <BiCake />
                </Box>
                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Age</Typography>
                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{userDataInfo.age}</Typography>
                </Box>
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#71aaff', fontSize: '20px' }}>
                    <AiOutlinePhone />
                </Box>
                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Phone Number</Typography>
                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{userDataInfo.phoneNumber}</Typography>
                </Box>
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: '#af7d00' }}>
                    <GoMail />
                </Box>
                <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                    <Typography component={"p"} sx={{ fontSize: '12px', color: '#b6b6b6' }}>Email</Typography>
                    <Typography component={"p"} sx={{ fontSize: '16px', color: '#ffa04c', fontWeight: 'bold' }}>{userDataInfo.email}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
