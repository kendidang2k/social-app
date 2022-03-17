import React from 'react'
import { ButtonBase, Grid, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import { storyList } from '../mock/storyList';
import { AiOutlinePlus } from "react-icons/ai";
import style from '../styles/Story.module.css'
import 'swiper/css'
import "swiper/css/navigation";
export default function StoryList() {

    const storyListData = storyList;

    return (
        <Grid>
            <Swiper
                spaceBetween={5}
                freeMode={true}
                style={{ display: 'flex' }}
                navigation={true}
                pagination={true}
                modules={[FreeMode, Pagination, Navigation]}
                className={style.swiper__slide__cover}
            >
                <SwiperSlide className={style.swiper__slide}>
                    <Grid sx={{ width: '100%', height: '100%', backgroundColor: '#343a40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ButtonBase sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '35px', height: '35px', borderRadius: '50%', fontSize: '25px' }}><AiOutlinePlus /></ButtonBase>
                            <Typography component={"p"} sx={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>Add Story</Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                {
                    storyListData && storyListData.map((storyItem) => {
                        return (
                            <SwiperSlide className={style.swiper__slide} key={storyItem.storyID} >
                                <Grid sx={{ width: '100%', height: '100%', position: 'relative', backgroundImage: `url(${storyItem.image})`, backgroundSize: 'cover' }}>
                                    {/* <img className={style.story__img} src={storyItem.image} alt="" /> */}
                                </Grid>
                            </SwiperSlide>
                        )
                    })
                }
                {/* 
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide>
                <SwiperSlide className={style.swiper__slide}>Slide 1</SwiperSlide> */}
            </Swiper>
        </Grid >
    )
}
