import { Grid, Typography } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../firebase/config';

import style from '../styles/MessDetail.module.css'

export default function MessDetail(messItem) {

    const [isTimeVisible, setIsTimeVisible] = useState(false);

    if (messItem.messItem.image) {
        getDownloadURL(ref(storage, messItem.messItem.image))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                const img = document.getElementById(`${messItem.messItem.docid}__image__mess`);
                img.setAttribute('src', url);
            })
            .catch((error) => {
                // Handle any errors
                console.log("error:", error)
            });
    }
    else if (messItem.messItem.video) {
        getDownloadURL(ref(storage, messItem.messItem.video))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                const video = document.getElementById(`${messItem.messItem.docid}__video__mess`);
                video.setAttribute('src', url);
            })
            .catch((error) => {
                // Handle any errors
                console.log("error:", error)
            });

    } else {
        console.log("Created")
    }

    return (
        <Grid className={messItem.messItem.uid == messItem.currentUser ? style.cover__current__user__mess : style.cover__other__user__mess} >
            {messItem.messItem.text && <Typography className={messItem.messItem.uid == messItem.currentUser ? style.current__user__mess : style.other__mess} component={"p"} sx={{ maxWidth: '70%', minWidth: 'fit-content', padding: '10px 15px', backgroundColor: '#3a3c48', borderRadius: '20px', color: '#afafaf' }} onClick={() => setIsTimeVisible(!isTimeVisible)}>{messItem.messItem.text}</Typography>}
            {messItem.messItem.video && <video id={`${messItem.messItem.docid}__video__mess`} className={style.video__mess} controls>
                <source src={messItem.messItem.video} />
            </video>}
            {messItem.messItem.image && <img className={style.image} src={messItem.messItem.image} alt='image' id={`${messItem.messItem.docid}__image__mess`} />}
            {messItem.messItem.createdAt && <Typography className={isTimeVisible ? style.created__at : style.created__at__hidden} component={"p"} sx={{ fontSize: '10px' }}>{messItem.messItem.createdAt.toDate().toLocaleString()}</Typography>}
        </Grid>
    )
}
