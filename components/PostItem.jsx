import { Avatar, ButtonBase, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { AiOutlineExclamationCircle, AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import style from '../styles/PostItem.module.css'
import { Field, Form, Formik } from 'formik';
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase/config';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where, orderBy } from 'firebase/firestore';
import { async } from '@firebase/util';
import { AppContext } from '../context/AppProvider';
import { addDocument } from '../firebase/service';


export default function PostItem({ postItem }) {

    const { currentUser } = useContext(AppContext);
    const postItemData = postItem;

    const [currentPostLike, setCurrentPostLike] = useState(postItemData.like.length)
    const [currentPostComment, setCurrentPostComment] = useState([])
    const [likeStatus, setLikeStatus] = useState(true)
    const [isPostLoading, setIsPostLoading] = useState(true)

    const [optionsVisible, setOptionsVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);

    const docRef = doc(db, "posts", postItemData.docid);

    useEffect(() => {
        const handleCommentPost = async () => {
            let commentArrayTemp = [];
            const q = query(collection(db, "comments"), orderBy('createdAt', 'desc'), where("postId", "==", postItemData.docid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                commentArrayTemp.push(doc.data())
            });
            setCurrentPostComment(commentArrayTemp)
        }
        handleCommentPost()
    }, [postItemData.comments])

    const handleLikePost = () => {
        setLikeStatus(!likeStatus);
        if (likeStatus) {
            console.log("post Item post home", postItemData)
            setCurrentPostLike(currentPostLike + 1)
            updateDoc(docRef, {
                like: arrayUnion(currentUser[0].docid)
            })
        } else {
            setCurrentPostLike(currentPostLike - 1)
            updateDoc(docRef, {
                like: arrayRemove(currentUser[0].docid)
            })
        }
    }

    const updatePostComment = (commentId) => {
        updateDoc(docRef, {
            comments: arrayUnion(commentId)
        })
    }

    if (postItemData.image) {
        getDownloadURL(ref(storage, postItemData.image))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                const img = document.getElementById(`${postItemData.docid}__image`);
                img.setAttribute('src', url);
                setIsPostLoading(true)
            })
            .catch((error) => {
                // Handle any errors
                console.log("error:", error)
            });
    }
    else if (postItemData.video) {
        getDownloadURL(ref(storage, postItemData.video))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                const video = document.getElementById(`${postItemData.docid}__video`);
                video.setAttribute('src', url);
                setIsPostLoading(true)
            })
            .catch((error) => {
                // Handle any errors
                console.log("error:", error)
            });

    } else {
        console.log("Created")
    }




    return (
        isPostLoading ? <Grid className="post__item" sx={{ padding: '20px', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '10px', transition: '.3s ease-in-out' }}>
            <Grid className="post__item__header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={postItemData.publisherAvt} sx={{ marginRight: '15px' }}></Avatar>
                    <Grid>
                        <Link href={`profile/${postItemData.publisherID}`} passHref>
                            <a className={style.post__item__publisher}>{postItemData.publisher}</a>
                        </Link>
                        {
                            postItemData.createdAt ? <Typography component={"p"} sx={{ fontSize: '11px', fontWeight: '500', color: '#adb5bd' }}>{postItemData.createdAt.toDate().toLocaleString()}</Typography> : ''
                        }
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
                    postItemData.image && <img src={postItemData.image} alt="Post image" id={`${postItemData.docid}__image`} className={style.image__post__item} />
                }
                {
                    postItemData.video && <video className={style.video__post__item} id={`${postItem.docid}__video`} controls>
                        <source src={postItemData.video} />
                    </video>
                }
                <Grid sx={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <ButtonBase onClick={handleLikePost} className={style.post__item__button_like} sx={{ width: { xs: '28px', md: '32px' }, height: { xs: '28px', md: '32px' }, display: 'flex', alignItems: 'center', justiContent: 'center', border: 'none', borderRadius: '50%', background: 'linear-gradient(135deg,#05f,#09f)', color: '#fff', fontSize: { xs: '15px', md: '20px' }, marginRight: { xs: '5px', md: '10px' }, transition: '.2s ease-in-out' }}>
                            <AiOutlineLike />
                        </ButtonBase>
                        {/* <ButtonBase className={style.post__item__button_heart} sx={{ width: { xs: '28px', md: '32px' }, height: { xs: '28px', md: '32px' }, display: 'flex', alignItems: 'center', justiContent: 'center', border: 'none', borderRadius: '50%', background: 'linear-gradient(to right,#e44d26,#f16529)', color: '#fff', fontSize: { xs: '15px', md: '20px' }, transition: '.2s ease-in-out' }}>
                            <AiOutlineHeart />
                        </ButtonBase> */}
                        <Typography sx={{ marginLeft: '5px', color: '#313131', fontWeight: 'bold', fontSize: { xs: '13px', md: '15px' } }}>{currentPostLike} Like</Typography>
                        <ButtonBase className={style.comment__icon__post__item} sx={{ marginLeft: { xs: '15px', md: '25px' }, color: '#313131', fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: { xs: '13px', md: '15px', transition: '.2s ease-in-out' } }} onClick={() => setCommentVisible(!commentVisible)}><FaRegComment />{postItemData.comments.length} Comment</ButtonBase>
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
                        onSubmit={async (values, actions) => {
                            // alert(JSON.stringify(values.commentInput))
                            const q = query(collection(db, "comments"), where("postId", "==", postItemData.docid));
                            const querySnapshot = await getDocs(q);
                            addDocument('comments', {
                                postId: postItemData.docid,
                                publisherID: currentUser[0].docid,
                                publisher: currentUser[0].displayName,
                                publisherAvt: currentUser[0].photoURL,
                                detail: JSON.stringify(values.commentInput).replaceAll('"', '')
                            })
                            querySnapshot.forEach((doc) => {
                                updatePostComment(doc.id)
                            });
                            actions.resetForm({
                                values: {
                                    commentInput: '',
                                }
                            })
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
                        currentPostComment && currentPostComment.map((cmtItem, index) => {
                            return (
                                <Grid key={index} sx={{ marginTop: '10px' }}>
                                    <Grid container className='post__item__comment__box__detail' >
                                        <Grid sx={{ marginBottom: '10px' }}>
                                            <Avatar src={cmtItem.publisherAvt} sx={{ width: { xs: 30, sm: 32, md: 37 }, height: { xs: 30, sm: 32, md: 37 }, marginLeft: '3px' }}></Avatar>
                                        </Grid>
                                        <Grid item xs={10.5} className={style.post__item__comment__box__detail__content} sx={{ marginLeft: '10px' }}>
                                            <Link href={`profile/${cmtItem.publisherID}`} passHref>
                                                <a >{cmtItem.publisher}</a>
                                            </Link>
                                            {
                                                cmtItem.createdAt && <Typography component={"span"} sx={{ marginLeft: '10px', color: '#92929e', fontSize: '12px' }}>{cmtItem.createdAt.toDate().toLocaleString()}</Typography>
                                            }
                                            <Typography component={"p"}>{cmtItem.detail}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid >
            :
            <Grid sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <CircularProgress />
            </Grid>
    )
}
