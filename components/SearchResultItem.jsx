import React, { useContext } from 'react'
import Link from 'next/link'
import { Avatar, Grid, Typography } from '@mui/material'
import { StoreContext } from '../context/StoreProvider';

import style from '../styles/SearchResultItem.module.css'


export default function SearchResultItem(searchItem) {

    const { setSearchResultVisible } = useContext(StoreContext);

    return (
        <Grid className={style.cover__search__item} sx={{ backgroundColor: '#fff', padding: '10px', borderRadius: '10px', transition: '.3s ease-in-out' }} >
            <Link href={`/profile/${searchItem.searchItem.docid}`} passHref>
                <a onClick={() => setSearchResultVisible(false)} className={style.search__item__detail}>
                    <Avatar src={searchItem.searchItem.photoURL}></Avatar>
                    <Typography component={"p"} sx={{ marginLeft: '10px' }}>{searchItem.searchItem.displayName}</Typography>
                </a >
            </Link >
        </Grid >
    )
}
