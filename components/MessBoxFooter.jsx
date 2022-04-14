import React from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { TiMessage } from "react-icons/ti";
import { BsFillPersonFill, BsMessenger } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useRouter } from 'next/router';
import { SiMessenger } from "react-icons/si";
import { RiMessage3Fill } from "react-icons/ri";


import style from '../styles/MessBoxFooter.module.css'

const footerItem = [
    {
        id: '1',
        icon: <AiFillHome />,
        path: '/'
    },
    {
        id: '2',
        icon: <BiMessageRoundedDetail />,
        path: '/messagebox'
    },
    {
        id: '3',
        icon: <BsFillPersonFill />,
        path: '/messfriend'
    },
]

export default function MessBoxFooter() {

    const router = useRouter();

    console.log('path', router.pathname)

    return (
        <Grid sx={{ position: 'fixed', bottom: '40px', left: 0, width: '100%', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#252837', color: '#b6bbc1', padding: '0 80px', boxShadow: '0px -10px 12px 0px #33344b92' }}>
            {
                footerItem && footerItem.map((item) => {
                    return (
                        <Box sx={{ color: '#545768', width: '50px', textAlign: 'center' }} key={item.id}>
                            <Link href={item.path} passHref>
                                <a className={router.pathname == item.path ? style.footer__item__active : style.footer__link}>
                                    {
                                        item.icon
                                    }
                                </a>
                            </Link>
                        </Box>
                    )
                })
            }
        </Grid >
    )
}
