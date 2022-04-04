import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { ErrorMessage, FieldArray, useField } from 'formik';
import { BiShow } from "react-icons/bi";

import style from '../styles/TextInput.module.css'

function TextInput(props) {
    const [field, meta] = useField(props)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                className={style.text__input__form}
                sx={{ width: "100%", height: 'auto', marginBottom: '0' }}
                {...field}
                error={meta.touched && meta.error ? true : false}
                label={props.label}
                // type={props.type}
                type={!showPassword && props.InputProps ? "password" : "text"}
                InputProps={props.InputProps ? {
                    endAdornment: (
                        <Box sx={{ position: 'absolute', right: '10px', lineHeight: '10px', color: 'rgba(0, 0, 0, 0.6)', cursor: 'pointer' }}>
                            <BiShow onClick={() => {
                                setShowPassword(!showPassword)
                            }} />
                        </Box>
                    )
                }
                    : null}
            />

            <Box sx={{ position: 'absolute', left: { xs: '0' }, display: 'block', fontSize: '10px', color: 'red', marginBottom: '15px' }}>
                <ErrorMessage name={field.name}></ErrorMessage>
            </Box>
        </Box>
    );
}

export default TextInput;
