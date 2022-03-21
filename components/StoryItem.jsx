import { Grid, Typography } from '@mui/material'
import React from 'react'

import style from '../styles/StoryItem.module.css'
import Image from 'next/image'

export default function StoryItem({ storyItem }) {

  return (
    <Grid sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={storyItem.image[0].photoStory} className={style.swiper__slide__img} alt="test" />
      <Grid sx={{ display: 'flex', width: '100%', marginBottom: '15px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column-reverse', flexDirection: 'column', position: 'absolute', bottom: '0', left: '0' }}>
        <Grid sx={{ width: '45px', height: '45px', borderRadius: '50%', position: 'relative', overflow: 'hidden', border: '1px solid #fff' }}>
          <img className={style.story__publisher__avt} src={storyItem.publisherAvt} alt="publisher avt" />
        </Grid>
        <Typography component={"p"} sx={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', zIndex: '5' }}>{storyItem.publisher}</Typography>
      </Grid>
    </Grid>
  )
}
