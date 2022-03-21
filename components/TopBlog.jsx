import { Grid, Typography } from '@mui/material'
import React from 'react'
import { blogList } from '../mock/blogList'
import PageHeader from './PageHeader'
import Link from 'next/link'

import style from '../styles/TopBlog.module.css'


export default function TopBlog() {

    const blogListData = blogList.slice(0, 3);

    console.log('blogListData:', blogListData);

    return (
        <Grid sx={{ marginTop: '10px', backgroundColor: '#fff' }}>
            <PageHeader title={"Top Blog"} />
            <Grid sx={{ padding: '10px' }}>
                {
                    blogListData && blogListData.map((blogItem) => {
                        return (
                            <Grid sx={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '10px', transition: '.3s ease-in-out' }} className={style.blog__single__item}>
                                <Link href='' passHref>
                                    <a >
                                        <Grid sx={{ display: 'flex' }}>
                                            <Grid sx={{ width: '65px', height: '65px', borderRadius: '10px', overflow: 'hidden' }}>
                                                <img src={blogItem.blogAvt} alt="Blog Photo" className={style.blog__avt} />
                                            </Grid>
                                            <Grid sx={{ marginLeft: '10px', padding: '5px 0', width: '60%' }}>
                                                <Typography component={"h4"} sx={{ fontSize: '15px', fontWeight: 'bold', color: '#212529' }}>{blogItem.blogTitle}</Typography>
                                                <Typography component={"p"} sx={{ width: '60%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '12px', color: '#adb5bd' }}>{blogItem.blogContent}</Typography>
                                            </Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid >
    )
}
