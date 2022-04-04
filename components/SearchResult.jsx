import { Grid } from '@mui/material';
import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import SearchResultItem from './SearchResultItem';

export default function SearchResult(inputValue) {

    const { allUser } = useContext(AppContext);

    console.log("inputValue", inputValue)
    const inputSearchValue = inputValue;

    return (
        <Grid sx={{ position: 'absolute', top: '50px', backgroundColor: '#fff', minWidth: '100%', zIndex: '10', padding: '10px 20px' }}>
            {
                allUser && allUser.filter(user => user.displayName.includes(inputValue)).map((item) => {

                    console.log('item', item)
                    return (
                        <SearchResultItem key={item.docid} searchItem={item} />
                    )
                })
            }
        </Grid>
    )
}
