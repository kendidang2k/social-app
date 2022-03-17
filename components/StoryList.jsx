import React from 'react'
import { ButtonBase, Grid, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import { storyList } from '../mock/storyList';
import { AiOutlinePlus } from "react-icons/ai";
import style from '../styles/Story.module.css'
import 'swiper/css'
import "swiper/css/navigation";
import "swiper/css/free-mode";
import StoryItem from './StoryItem';

export default function StoryList() {

    const storyListData = storyList;

    return (
        <Grid sx={{ marginBottom: '15px' }}>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 5,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className={style.swiper__slide}>
                    <Grid sx={{ width: '100%', height: '100%', backgroundColor: '#343a40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '-90%' }}>
                            <ButtonBase sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '45px', height: '45px', borderRadius: '50%', fontSize: '25px', color: '#fd6600' }}><AiOutlinePlus /></ButtonBase>
                            <Typography component={"p"} sx={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>Add Story</Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                {
                    storyListData && storyListData.map((storyItem) => {
                        return (
                            <SwiperSlide className={style.swiper__slide} key={storyItem.storyID} >
                                <StoryItem storyItem={storyItem} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Grid >
    )
}
