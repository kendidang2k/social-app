import React, { useContext, useState } from 'react'
import { Box, ButtonBase, Grid, Typography } from '@mui/material'
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { Field, Formik } from 'formik';

import style from '../styles/MessBoxHeader.module.css'
import { StoreContext } from '../context/StoreProvider';

export default function MessBoxHeader() {

    const [isSearchFormVisible, setIsSearchFormVisible] = useState(false)
    const { searchMessVisible, setSearchMessVisible, setMessSearchValue } = useContext(StoreContext);

    return (
        <Grid sx={{ position: 'absolute', top: '0', left: 0, width: '100%', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#252837', padding: '0 5px', color: '#b6bbc1', zIndex: '5', boxShadow: '0px 10px 12px -4px #3a3c6092' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ButtonBase sx={{ fontSize: '25px' }} onClick={() => { setIsSearchFormVisible(!isSearchFormVisible); setSearchMessVisible(!searchMessVisible) }}>
                    <BiSearchAlt />
                </ButtonBase>
                <Formik
                    initialValues={{ searchMessInput: '' }}
                    onSubmit={(values, actions) => {
                        setMessSearchValue(JSON.stringify(values.searchMessInput).replaceAll('"', ''));
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} className={isSearchFormVisible ? style.form__search : style.form__search__hidden}>
                            <Field className={style.mess__search__input} id="searchMessInput" name="searchMessInput" placeholder="Search..." />
                        </form>
                    )}
                </Formik>
            </Box>
            <Box>
                <Typography component={"p"} sx={{ fontWeight: 'bold' }}>Message</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                <ButtonBase sx={{ fontSize: '20px' }}><FaPlus /></ButtonBase>
            </Box>
        </Grid>
    )
}
