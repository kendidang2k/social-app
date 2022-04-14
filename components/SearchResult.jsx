import { Grid } from '@mui/material';
import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import SearchResultItem from './SearchResultItem';

import style from '../styles/SearchResult.module.css'

export default function SearchResult(inputValue) {

    const { allUser } = useContext(AppContext);

    const inputSearchValue = inputValue.inputValue;

    return (
        <Grid className={style.cover__search__result} sx={{ position: 'absolute', top: '45px', backgroundColor: '#fff', minWidth: '100%', height: 'auto', maxHeight: '450px', zIndex: '100', padding: '10px 20px', boxShadow: '0px 5px 15px -1px rgba(0,0,0,0.39)', borderRadius: '10px', overflow: 'overlay' }}>
            {
                allUser && allUser.filter(user => user.displayName.includes(inputSearchValue)).map((item) => {
                    return (
                        <SearchResultItem key={item.docid} searchItem={item} />
                    )
                })
            }
        </Grid>
    )
}
