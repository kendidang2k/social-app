import { Avatar, ButtonBase, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { AiOutlineExclamationCircle, AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import style from '../styles/PostItem.module.css'
import { Field, Form, Formik } from 'formik';


export default function PostItem({ postItem }) {

    const postItemData = postItem;
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);

    return (
        <Grid className="post__item" sx={{ padding: '20px', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '10px', transition: '.3s ease-in-out' }}>
            <Grid className="post__item__header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={postItemData.publisherAvt} sx={{ marginRight: '15px' }}></Avatar>
                    <Grid>
                        <Link href="/" passHref>
                            <a className={style.post__item__publisher}>{postItemData.publisher}</a>
                        </Link>
                        <Typography component={"p"} sx={{ fontSize: '11px', fontWeight: '500', color: '#adb5bd' }}>{postItemData.publishedAt}</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{ position: 'relative' }}>
                    <button className={style.post__item__button__options} onClick={() => setOptionsVisible(!optionsVisible)}><BsThreeDots /></button>
                    <Grid className={optionsVisible ? '' : style.hide__option__post} sx={{ width: '200px', position: 'absolute', bottom: '-60px', right: '0', padding: '10px 15px', boxShadow: '0px 0px 15px -2px #b3b3b39f', backgroundColor: '#fff', borderRadius: '10px', zIndex: 2 }}>
                        <ButtonBase sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '26px', color: '#adb5bd', fontWeight: 'bold' }}>
                            <AiOutlineExclamationCircle />
                            <Grid sx={{ textAlign: 'left', marginLeft: '10px' }}>
                                <Typography component={"p"} sx={{ color: '#000', fontWeight: 'bold', fontSize: '15px', lineHeight: '15px' }}>Hide Post</Typography>
                                <Typography component={"p"} sx={{ fontSize: '13px' }}>Hide this post</Typography>
                            </Grid>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="post__item__content" sx={{ marginTop: '10px' }}>
                <Grid>
                    <Typography component={"p"} sx={{ fontSize: '13px', fontWeight: 'bold', color: '#adb5bd', lineHeight: '22px', marginBottom: '20px' }}>{postItemData.content}</Typography>
                </Grid>
                {
                    postItemData.image && <img src={postItemData.image} alt="Post image" className={style.image__post__item} />
                }
                {
                    postItemData.video && <video className={style.video__post__item} controls>
                        <source src={postItemData.video} />
                    </video>
                }
                <Grid sx={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <ButtonBase className={style.post__item__button_like} sx={{ width: { xs: '28px', md: '32px' }, height: { xs: '28px', md: '32px' }, display: 'flex', alignItems: 'center', justiContent: 'center', border: 'none', borderRadius: '50%', background: 'linear-gradient(135deg,#05f,#09f)', color: '#fff', fontSize: { xs: '15px', md: '20px' }, marginRight: { xs: '5px', md: '10px' }, transition: '.2s ease-in-out' }}>
                            <AiOutlineLike />
                        </ButtonBase>
                        <ButtonBase className={style.post__item__button_heart} sx={{ width: { xs: '28px', md: '32px' }, height: { xs: '28px', md: '32px' }, display: 'flex', alignItems: 'center', justiContent: 'center', border: 'none', borderRadius: '50%', background: 'linear-gradient(to right,#e44d26,#f16529)', color: '#fff', fontSize: { xs: '15px', md: '20px' }, transition: '.2s ease-in-out' }}>
                            <AiOutlineHeart />
                        </ButtonBase>
                        <Typography sx={{ marginLeft: '5px', color: '#313131', fontWeight: 'bold', fontSize: { xs: '13px', md: '15px' } }}>{postItemData.like} Like</Typography>
                        <ButtonBase className={style.comment__icon__post__item} sx={{ marginLeft: { xs: '15px', md: '25px' }, color: '#313131', fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: { xs: '13px', md: '15px', transition: '.2s ease-in-out' } }} onClick={() => setCommentVisible(!commentVisible)}><FaRegComment />{postItemData.comment.length} Comment</ButtonBase>
                    </Grid>
                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ButtonBase className={style.button__share__post__item} sx={{ fontSize: { xs: '15px', md: '17px' }, color: '#313131', fontWeight: 'bold', transition: '.2s ease-in-out' }}><BsShare /> Share</ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ marginTop: '10px' }} className={commentVisible ? style.post__item__comment__box : style.hide__comment}>
                <Grid sx={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Formik
                        initialValues={{
                            commentInput: '',
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form className={style.comment__form}>
                            <Field id={style.comment__input} name="commentInput" placeholder="Write Your Comment" />
                            <ButtonBase type="submit" sx={{ position: 'absolute', top: '14px', right: '10px', color: '#f16529', fontSize: '20px ' }}><FiSend /></ButtonBase>
                        </Form>
                    </Formik>
                </Grid>
                <Grid >
                    {
                        postItemData.comment && postItemData.comment.map((cmtItem, index) => {
                            return (
                                <Grid key={index} sx={{ marginTop: '10px' }}>
                                    <Grid container className='post__item__comment__box__detail' >
                                        <Grid sx={{ marginBottom: '10px' }}>
                                            <Avatar src={cmtItem.cmtPublisherAvt} sx={{ width: { xs: 30, sm: 32, md: 37 }, height: { xs: 30, sm: 32, md: 37 }, marginLeft: '3px' }}></Avatar>
                                        </Grid>
                                        <Grid item xs={10.5} className={style.post__item__comment__box__detail__content} sx={{ marginLeft: '10px' }}>
                                            <Link href="/" passHref>
                                                <a >{cmtItem.cmtPublisher}</a>
                                            </Link>
                                            <Typography component={"span"} sx={{ marginLeft: '10px', color: '#92929e', fontSize: '12px' }}>{cmtItem.cmtPublishedAt}</Typography>
                                            <Typography component={"p"}>{cmtItem.cmtDetail}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid >
    )
}
