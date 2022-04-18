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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { async } from '@firebase/util';

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
    const { recentRoom, messages } = useContext(MessContext)
    const [messIsLoading, setMessIsLoading] = useState(true)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleUpdateLastMess = async () => {
        const q = query(collection(db, "rooms"), where("members", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // if (doc.data().docid) {
            //     alert("existed")
            // } else {

            // }
            console.log("doc id", doc.id);
        });
    }

    useMemo(() => {
        setMessIsLoading(true)
        setTimeout(() => {
            setMessIsLoading(false)
            scrollToBottom()
        }, 1500)
    }, [recentRoom])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <Grid className={isChatBoxVisible ? style.chat__box : style.chat__box__hidden} sx={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, right: 0, backgroundColor: '#252837', zIndex: '10000000', transition: '.3s ease-in-out' }}>
            <Box sx={{ display: 'flex', width: '100%', padding: '15px 10px', alignItems: 'center', justifyContent: 'space-between', color: '#b6bbc1', height: '60px', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
                <Grid sx={{ display: 'flex' }}>
                    <ButtonBase sx={{ fontSize: '20px', }} onClick={() => setIsChatBoxVisible(false)}>
                        <ImArrowLeft2 />
                    </ButtonBase>
                    <Avatar src="/" sx={{ width: '25px', height: '25px', marginLeft: '15px' }}></Avatar>
                    <Typography component={"p"} sx={{ marginLeft: '10px' }}>Name</Typography>
                </Grid>
                <Grid>
                    <ButtonBase sx={{ fontSize: '20px', marginRight: '10px' }}>
                        <BsFillTelephoneFill />
                    </ButtonBase>
                </Grid>
            </Box>
            <Box sx={{ height: 'calc(100vh - 60px - 50px)' }}>
                <Grid className={style.eact__scroll__to__bottom} sx={{ height: '100%', overflow: 'scroll', padding: '0 10px' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', height: '50px' }}>
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
                        name='postImage'
                        id='postImage'
                    // onChange={onChangeImageCreatePost}
                    />
                </Button>
                {/* <ButtonBase sx={{ width: '40px', height: '40px', fontSize: '30px' }}><FcGallery /></ButtonBase> */}
                <Formik
                    initialValues={{
                        message: ''
                    }}
                    onSubmit={async (values, actions) => {
                        if (values.message) {
                            addDocument('messages', {
                                text: JSON.stringify(values.message).replaceAll('"', ''),
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                                roomID: recentRoom.docid,
                            })
                            handleUpdateLastMess()
                            // document.getElementsByClassName('test__input').value = ''
                            actions.resetForm()
                        } else {
                            return
                        }
                    }}

                >
                    <Form style={{ width: '85%' }}>
                        <Grid sx={{ padding: '5px 10px', height: '35px', width: '100%', borderRadius: '30px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Field id={style.message__input} name="message" placeholder="Type message here..." />
                            <ButtonBase type='submit' sx={{ width: '30px', height: '30px', fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography component={"span"} className={style.message__button__submit}><BiSend /></Typography></ButtonBase>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Grid >
    )
}
