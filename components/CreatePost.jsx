import { Avatar, Button, ButtonBase, Grid, InputBase, TextareaAutosize, Typography } from '@mui/material'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';
import { StoreContext } from '../context/StoreProvider';
import { db, storage } from '../firebase/config';
import { addDocument } from '../firebase/service';

import style from '../styles/Createpost.module.css'

export default function CreatePost() {

    const [file, setFile] = useState(null)

    const { currentUser } = useContext(AppContext)
    const { setIsUpdateByCreate } = useContext(StoreContext)

    const { user } = useContext(AuthContext)

    const [thumb, setThumb] = useState("")
    const [video, setVideo] = useState("")

    const handleResetFileChoosen = () => {
        setThumb("");
        setVideo("");
    }

    const handleReset = () => {
        setFile(null)
        handleResetFileChoosen();
    };

    const onSubmitImage = () => {
        const storageRef = ref(storage, file.name)
        uploadBytes(storageRef, file)
    }

    const onChangeImageCreatePost = (e) => {
        handleResetFileChoosen();
        setFile(e.target.files[0])
        console.log("file", file)
        if (e.target.files[0].type == "image/jpeg") {
            setThumb(URL.createObjectURL(e.target.files[0]));

        }
        else {
            setVideo(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpdateUserPosts = async () => {
        const docRef = doc(db, "users", currentUser[0].docid);
        await updateDoc(docRef, {
            posts: arrayUnion(localStorage.getItem("currentDocRefId")),
            photo: arrayUnion(file.name)
        })
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
                onSubmit={(values, actions) => {
                    if (file == null) {
                        addDocument('posts', {
                            publisherID: currentUser[0].docid,
                            publisher: currentUser[0].displayName,
                            publisherAvt: currentUser[0].photoURL,
                            content: values.postContent,
                            image: '',
                            video: '',
                            like: [],
                            comments: [],
                        })
                    }
                    else if (file.type == 'image/jpeg') {
                        addDocument('posts', {
                            publisherID: currentUser[0].docid,
                            publisher: currentUser[0].displayName,
                            publisherAvt: currentUser[0].photoURL,
                            content: values.postContent,
                            image: file.name,
                            video: '',
                            like: [],
                            comments: [],
                        })
                        onSubmitImage();
                        handleUpdateUserPosts();
                    }
                    else {
                        addDocument('posts', {
                            publisherID: currentUser[0].docid,
                            publisher: currentUser[0].displayName,
                            publisherAvt: currentUser[0].photoURL,
                            content: values.postContent,
                            image: '',
                            video: file.name,
                            like: [],
                            comments: [],
                        })
                        onSubmitImage();
                        handleUpdateUserPosts();
                    }
                    actions.resetForm({
                        values: {
                            postContent: '',
                            postImage: thumb,
                            postVideo: video,
                        }
                    })
                    handleReset();
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
                                id='postImage'
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
