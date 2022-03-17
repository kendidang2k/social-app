import { Avatar, Button, ButtonBase, Grid, InputBase, TextareaAutosize, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AuthContext } from '../context/AuthProvider';

import style from '../styles/Createpost.module.css'

export default function CreatePost() {

    const { user } = useContext(AuthContext)

    const getInitialState = () => {
        return { file: [] }
    }

    const [thumb, setThumb] = useState("")
    const [video, setVideo] = useState("")
    // const [image    ]

    const reader = new FileReader()

    const handleResetFileChoosen = () => {
        setThumb("");
        setVideo("");
    }

    const onChangeImageCreatePost = (e) => {
        handleResetFileChoosen();
        console.log(e.target.files[0])
        if (e.target.files[0].type == "image/jpeg") {
            setThumb(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setVideo(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <Grid container sx={{ backgroundColor: '#fff', padding: '10px 20px', borderRadius: '10px' }}>

            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Grid sx={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fd6600' }}>
                    <BsPencilSquare />
                </Grid>
                <Typography component={"p"} sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#adb5bd' }}>
                    Create Post</Typography>
            </Grid>
            <Formik
                initialValues={{
                    postContent: '',
                    postImage: thumb,
                    postVideo: video,
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form className={style.create__post__form}>
                    <Grid item xs={12} sx={{ position: 'relative', width: '100%' }}>
                        <Grid sx={{ position: 'absolute', left: '10px', top: '10px' }}>
                            <Avatar src={user.photoURL} sx={{ width: '30px', height: '30px' }}></Avatar>
                        </Grid>
                        <Grid className={style.createpost__content} >
                            <Field as="textarea" placeholder="What's on your mind ?" name="postContent" id="postContent" className={style.createpost__input__content} />
                            {
                                thumb && <img src={thumb} alt="Img Post" className={style.img__post} />
                            }
                            {
                                video && <video className={style.video__post} controls>
                                    <source src={video} />
                                </video>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className={style.choose__image__create__post}
                            variant="contained"
                            component="label"
                            sx={{ backgroundColor: 'inherit', boxShadow: 'none', color: '#fd6600', fontSize: '25px', padding: '5px 0' }}
                        >
                            <HiOutlinePhotograph />
                            <Typography component={"p"} sx={{ fontSize: '13px', textTransform: 'initial', color: "#7c7c7c", fontWeight: 'bold', marginLeft: '5px' }}>Photo/Video</Typography>
                            <input
                                type="file"
                                hidden
                                name='postImage'
                                onChange={onChangeImageCreatePost}
                            />
                        </Button>
                    </Grid>
                    <ButtonBase sx={{ width: '100%', height: '30px', backgroundColor: '#fd6600', border: 'none', outline: 'none', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', color: '#fff' }} type="submit">Post</ButtonBase>
                </Form>
            </Formik>
        </Grid >
    )
}
