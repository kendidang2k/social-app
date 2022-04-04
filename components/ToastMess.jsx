import { Grid } from '@mui/material';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function ToastMess(mess, type) {

    return (
        <Grid>
            {
                type == success ?
                    toast.success(mess)
                    :
                    toast.error(mess)
            }
        </Grid>

    )
}
