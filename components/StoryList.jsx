import React, { useContext, useState } from 'react'
import { ButtonBase, Grid, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import { storyList } from '../mock/storyList';
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import style from '../styles/Story.module.css'
import 'swiper/css'
import "swiper/css/navigation";
import "swiper/css/free-mode";
import StoryItem from './StoryItem';
import ReactInstaStories from 'react-insta-stories';

import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { storage } from '../firebase/config';
import { ref, uploadBytes } from 'firebase/storage';
import { addDocument } from '../firebase/service';
import { AppContext } from '../context/AppProvider';
import { StoreContext } from '../context/StoreProvider';
toast.configure();

export default function StoryList() {

    const { currentUser } = useContext(AppContext)
    const { isStoryVisible, setIsStoryVisible } = useContext(StoreContext)

    const storyListData = storyList;
    const [isStoryPosted, setIsStoryPosted] = useState(false)
    const [file, setFile] = useState(null)
    const [thumb, setThumb] = useState("")

    const handleResetFileChoosen = () => {
        setThumb("");
    }

    const onSubmitImage = () => {

    }

    const onChangeImageCreatePost = (e) => {
        handleResetFileChoosen();
        setFile(e.target.files[0])
        setThumb(URL.createObjectURL(e.target.files[0]));
        const storageRef = ref(storage, e.target.files[0].name)
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log('Uploaded file!');
        });
        handleAddStory();
        toast.success("Post story successfully !!")
    }

    const handleAddStory = () => {
        addDocument('stories', {
            publisherID: currentUser[0].docid,
            publisher: currentUser[0].displayName,
            publisherAvt: currentUser[0].photoURL,
            url: [thumb]
        })
    }



    return (
        <Grid sx={{ marginBottom: '15px', marginTop: { xs: '15px', md: '0' } }}>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                breakpoints={{
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 5,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 5,
                    },
                }}
                className="mySwiper"
            >
                <SwiperSlide className={style.swiper__slide}>
                    <Grid sx={{ width: '100%', height: '100%', backgroundColor: '#343a40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid sx={{ width: '100%', marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', bottom: '0', left: '0' }}>
                            <ButtonBase
                                className={style.choose__image__create__post}
                                variant="contained"
                                component="label"
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '45px', height: '45px', borderRadius: '50%', fontSize: '25px', color: '#fd6600' }}
                            >
                                <AiOutlinePlus />
                                <input
                                    type="file"
                                    hidden
                                    name='postImage'
                                    id='postImage'
                                    onChange={onChangeImageCreatePost}
                                />
                            </ButtonBase>
                            {/* <ButtonBase onClick={() => handleAddStory()} ><AiOutlinePlus /></ButtonBase> */}
                            <Typography component={"p"} sx={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>Add Story</Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                {
                    storyListData && storyListData.map((storyItem) => {
                        return (
                            <SwiperSlide className={style.swiper__slide} key={storyItem.storyID}>
                                <StoryItem storyItem={storyItem} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                storyListData[0] && isStoryVisible && <Grid sx={{ width: '100%', height: '100%', position: 'absolute', left: '0', top: '0', display: 'flex', justifyContent: 'center', padding: '20px 0', backgroundColor: '#0e0e0ec7', zIndex: '1000' }}>
                    <Grid sx={{ maxWidth: '432px', width: 'auto', position: 'relative' }}>
                        {
                            <ReactInstaStories
                                stories={storyListData[0].url}
                                defaultInterval={3000}
                                width={'100%'}
                                height={'100%'}
                                loop
                                loader
                                keyboardNavigation
                            />
                            // <ReactInstaStories
                            //     stories={storyListData[0].url}
                            //     defaultInterval={1500}
                            //     width={432}
                            //     height={768}
                            // />
                        }
                    </Grid>
                    <ButtonBase onClick={() => setIsStoryVisible(false)} sx={{ position: 'absolute ', right: '10px', top: '10px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#b3b3b3bc', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}><AiOutlineClose /></ButtonBase>
                </Grid>
            }
        </Grid >
    )
}
