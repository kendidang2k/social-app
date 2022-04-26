import { Avatar, Box, Button, ButtonBase, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import { BsCamera, BsPerson } from "react-icons/bs";
import { BiCake } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import style from '../../styles/EditProfile.module.css'
import { Field, Form, Formik } from 'formik';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function index() {

    const { currentUser } = useContext(AppContext);

    return (
        <>
            {
                currentUser[0] && <Grid container sx={{ paddingBottom: '200px', overflow: 'hidden', maxWidth: '960px', margin: 'auto' }}>
                    <Grid item xs={12} sx={{ height: '100%', position: 'relative', padding: { xs: '0 0px', md: '25px 0 0 0' } }}>
                        <Grid className={style.header__edit} sx={{ height: '500px', width: '120%', position: 'absolute', top: { xs: '-346px', sm: '-369px', md: '-383px' }, left: { xs: '-70px', md: '-175px' } }}>
                        </Grid>
                    </Grid>
                    <Grid sx={{ height: { xs: '220px', sm: '300px' }, width: '100%', zIndex: '2', position: 'relative' }}>
                        <Box sx={{ marginTop: '20px', marginLeft: '20px' }}>
                            <Typography component={"p"} sx={{ color: '#fff', fontSize: { xs: '20px', sm: '30px' }, fontWeight: 'bold' }}>{currentUser[0].displayName}</Typography>
                            {currentUser[0].email && <Typography component={"p"} sx={{ color: '#e8e8e8', fontSize: { xs: '15px', sm: '20px' }, lineHeight: '1' }}>{currentUser[0].email}</Typography>}
                        </Box>
                        <Box sx={{ position: 'absolute', right: { xs: '10%', sm: '20%' }, top: '65px' }}>
                            <Box sx={{ border: '5px solid #f7c99ca6', borderRadius: '50%' }}>
                                <Avatar src={currentUser[0].photoURL} sx={{ width: { xs: '130px', sm: '200px' }, height: { xs: '130px', sm: '200px' }, }}></Avatar>
                                <Button
                                    // className={style.choose__image__message}
                                    variant="contained"
                                    component="label"
                                    sx={{ minWidth: { xs: '40px', sm: '60px' }, minHeight: { xs: '40px', sm: '60px' }, padding: 0, position: 'absolute', bottom: '5px', right: '5px', borderRadius: '50%', fontSize: { xs: '17px', sm: '25px' } }}
                                >
                                    <BsCamera />
                                    <input
                                        type="file"
                                        hidden
                                        name='postImage'
                                        id='postImage'
                                    // onChange={onChangeImageCreatePost}
                                    />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={{ width: '100%', padding: '0 30px' }}>
                        <Formik
                            initialValues={{
                                name: currentUser[0].displayName,
                                age: currentUser[0].age,
                                email: currentUser[0].email,
                                phoneNumber: currentUser[0].phoneNumber
                            }}
                            onSubmit={async (values) => {
                                const userRef = doc(db, "users", currentUser[0].docid);
                                updateDoc(userRef, {
                                    name: JSON.stringify(values.name).replaceAll('"', ''),
                                    age: JSON.stringify(values.age).replaceAll('"', ''),
                                    email: JSON.stringify(values.email).replaceAll('"', ''),
                                    phoneNumber: JSON.stringify(values.phoneNumber).replaceAll('"', '')
                                });
                                toast.success("Update successfully !!")
                            }}
                        >
                            <Form>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: 'rgba(230, 127, 38, 1)' }}>
                                        <BsPerson />
                                    </Box>
                                    <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                        <Typography component={"p"} sx={{ fontSize: '13px', color: '#b6b6b6' }}>First Name</Typography>
                                        <Field className={style.field} id="name" name="name" />
                                    </Box>
                                </Grid>

                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#f887e1', fontSize: '20px' }}>
                                        <BiCake />
                                    </Box>
                                    <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                        <Typography component={"p"} sx={{ fontSize: '13px', color: '#b6b6b6' }}>Age</Typography>
                                        <Field className={style.field} type='number' id="age" name="age" />
                                    </Box>
                                </Grid>

                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', color: '#71aaff', fontSize: '20px' }}>
                                        <AiOutlinePhone />
                                    </Box>
                                    <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                        <Typography component={"p"} sx={{ fontSize: '13px', color: '#b6b6b6' }}>Phone Number</Typography>
                                        <Field className={style.field} type='number' id="phoneNumber" name="phoneNumber" />
                                    </Box>
                                </Grid>

                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px 2px #53535320', fontSize: '20px', color: '#af7d00' }}>
                                        <GoMail />
                                    </Box>
                                    <Box sx={{ width: { xs: '85%', sm: '90%' } }}>
                                        <Typography component={"p"} sx={{ fontSize: '13px', color: '#b6b6b6' }}>Email</Typography>
                                        <Field className={style.field} type='email' id="email" name="email" />
                                    </Box>
                                </Grid>

                                <ButtonBase type="submit" sx={{ width: '100%', height: '30px', backgroundColor: 'rgb(231, 153, 85)', marginTop: '10px', color: '#fff', borderRadius: '5px' }}>Save</ButtonBase>
                            </Form>
                        </Formik>
                    </Grid>
                </Grid >
            }
        </>

    )
}
