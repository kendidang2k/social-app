import { Avatar, Box, Button, ButtonBase, CircularProgress, Grid, InputBase, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ImArrowLeft2 } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import MessDetail from './MessDetail';
import { Field, Form, Formik } from 'formik';
import { StoreContext } from '../context/StoreProvider';

import style from '../styles/ChatBox.module.css'
import { addDocument } from '../firebase/service';
import { MessContext } from '../context/MessProvider';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { async } from '@firebase/util';
import { ref, uploadBytes } from 'firebase/storage';

const dataTest = [
    {
        uid: '1',
        displayName: 'HiHI',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: 'aasdasd',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '2',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
    {
        uid: '1',
        displayName: '',
        photoURL: '/',
        messDetail: 'asdasdasda sad asd asd ad asd adasd ',
        createdAt: '18:20'
    },
]

export default function ChatBox({ currentUser }) {

    const messagesEndRef = useRef(null)
    const { isChatBoxVisible, setIsChatBoxVisible } = useContext(StoreContext);
    const { recentRoom, messages, selectedRoom } = useContext(MessContext)
    const [messIsLoading, setMessIsLoading] = useState(true)
    const [currentRoomName, setCurrentRoomName] = useState('')

    const [thumb, setThumb] = useState("")
    const [video, setVideo] = useState("")
    const [file, setFile] = useState(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleUpdateLastMess = async (mess) => {
        const date = new Date;
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        var hour = date.getHours();
        const roomRef = doc(db, "rooms", recentRoom.docid);
        await updateDoc(roomRef, {
            lastMess: mess
        });
        await updateDoc(roomRef, {
            lastMessCreatedAt: `${hour}:${minutes}`
        });
    }

    useMemo(() => {
        const getRoomData = () => {
            if (recentRoom && recentRoom.members) {
                recentRoom.members.forEach(async (e) => {
                    if (currentUser.uid != e) {
                        const q = await query(collection(db, "users"), where("uid", "==", e));
                        const querySnapshot = await getDocs(q);
                        await querySnapshot.forEach((doc) => {
                            setCurrentRoomName(doc.data().displayName);
                        });
                    }
                })
            }
            setMessIsLoading(true)
            setTimeout(() => {
                setMessIsLoading(false)
                scrollToBottom()
            }, 1500)
        }
        getRoomData();
    }, [selectedRoom])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleReset = () => {
        setFile(null)
        handleResetFileChoosen();
    };

    const handleResetFileChoosen = () => {
        setThumb("");
        setVideo("");
    }

    const onSubmitImage = () => {
        const storageRef = ref(storage, file.name)
        uploadBytes(storageRef, file)
    }

    const onChangeImageMess = (e) => {
        handleResetFileChoosen();
        setFile(e.target.files[0])
        if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png") {
            setThumb(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setVideo(URL.createObjectURL(e.target.files[0]))
        }
    }

    // const handlePostImage = () => {
    //     if (file != null) {
    //         console.log('file', file)
    //         addDocument('messages', {
    //             text: '',
    //             uid: currentUser.uid,
    //             displayName: currentUser.displayName,
    //             photoURL: currentUser.photoURL,
    //             roomID: recentRoom.docid,
    //             image: thumb,
    //             video: video
    //         })
    //         handleUpdateLastMess("Sent a image")
    //     }
    //     else {
    //         console.log('erroe post img');
    //     }
    // }

    return (
        <Grid xs={12} md={8} className={isChatBoxVisible ? style.chat__box : style.chat__box__hidden} sx={{ width: '100%', height: '100vh', position: 'fixed', top: 0, right: 0, backgroundColor: '#252837', zIndex: '10000000', transition: '.3s ease-in-out' }}>
            <Box sx={{ display: 'flex', width: '100%', padding: '15px 10px', alignItems: 'center', justifyContent: 'space-between', color: '#b6bbc1', height: '60px', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
                <Grid sx={{ display: 'flex' }}>
                    <ButtonBase sx={{ fontSize: '20px', display: { xs: 'block', md: 'none' } }} onClick={() => setIsChatBoxVisible(false)}>
                        <ImArrowLeft2 />
                    </ButtonBase>
                    <Avatar src="/" sx={{ width: '25px', height: '25px', marginLeft: '15px' }}></Avatar>
                    {currentRoomName != '' && <Typography component={"p"} sx={{ marginLeft: '10px' }}>{currentRoomName}</Typography>}
                </Grid>
                <Grid>
                    <ButtonBase sx={{ fontSize: '20px', marginRight: '10px' }}>
                        <BsFillTelephoneFill />
                    </ButtonBase>
                </Grid>
            </Box>
            <Box sx={{ height: 'calc(100vh - 60px - 50px)' }}>
                <Grid className={style.auto__scroll__to__bottom} sx={{ height: '100%', padding: '0 10px' }}>
                    {
                        messIsLoading ?
                            <Grid sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <CircularProgress />
                            </Grid>
                            :
                            messages && messages.map((messItem, index) => {
                                return (
                                    <Grid className={messItem.uid == currentUser.uid ? style.current__user__mess : style.other__mess} sx={{ display: 'flex', marginTop: '10px' }} key={index}>
                                        {messItem.uid != currentUser.uid && <Avatar src={messItem.photoURL}></Avatar>}
                                        <MessDetail messItem={messItem} currentUser={currentUser.uid} />
                                    </Grid>
                                )
                            })
                    }
                    <Box style={{ marginBottom: 10 }} ref={messagesEndRef} />
                </Grid>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: 'auto', display: 'flex', alignItems: 'center', padding: '5px 0', backgroundColor: '#252837', boxShadow: '0px -10px 12px 0px #33344b92' }}>
                <Button
                    className={style.choose__image__message}
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: 'inherit', boxShadow: 'none', color: '#fd6600', fontSize: '25px', padding: '5px 0', minWidth: '40px', height: '20px' }}
                >
                    <FcGallery />
                    <input
                        type="file"
                        hidden
                        name='mess__image'
                        id='mess__image'
                        // onClick={() => onChangeImageMess}
                        onChange={onChangeImageMess}
                    />
                </Button>
                <Formik
                    initialValues={{
                        message: '',
                    }}
                    onSubmit={(values, actions) => {
                        if (values.message && file == null) {
                            addDocument('messages', {
                                text: JSON.stringify(values.message).replaceAll('"', ''),
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                                roomID: recentRoom.docid,
                                image: '',
                                video: ''
                            })
                            onSubmitImage();
                            handleUpdateLastMess(JSON.stringify(values.message).replaceAll('"', ''))
                        } else if (file.type == 'image/jpeg' || file.type == 'image/png') {
                            addDocument('messages', {
                                text: JSON.stringify(values.message).replaceAll('"', ''),
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                                roomID: recentRoom.docid,
                                image: file.name,
                                video: ''
                            })
                            onSubmitImage();
                            handleUpdateLastMess("Sent an image")
                        } else {
                            addDocument('messages', {
                                text: JSON.stringify(values.message).replaceAll('"', ''),
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                                roomID: recentRoom.docid,
                                image: '',
                                video: file.name
                            })
                            onSubmitImage();
                            handleUpdateLastMess("Sent a video")
                        }
                        actions.resetForm({
                            message: '',
                        })
                        handleReset();
                    }}
                >
                    <Form style={{ width: '85%' }}>
                        <Grid sx={{ padding: '5px 10px', height: 'auto', width: '100%', borderRadius: '30px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '100%' }}>
                                <Field id={style.message__input} name="message" placeholder="Type message here..." />
                                {
                                    thumb && <img src={thumb} alt="Img Post" className={style.img__mess__input} />
                                }
                                {
                                    video && <video className={style.video__post} controls>
                                        <source src={video} />
                                    </video>
                                }
                            </Box>
                            <ButtonBase type='submit' sx={{ width: '30px', height: '30px', fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography component={"span"} className={style.message__button__submit}><BiSend /></Typography></ButtonBase>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Grid >
    )
}
