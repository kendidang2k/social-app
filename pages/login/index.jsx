import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Formik, Form } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import bgimg from '../../assets/images/LoginPage/background1.jpg'
import Image from 'next/image';
import { async } from '@firebase/util';
import { auth, db } from '../../firebase/config';
import { useRouter } from 'next/router';

import logo from '../../assets/images/LoginPage/logo.jpg'
import style from '../../styles/Login.module.css'


const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function Login() {

  const router = useRouter();

  const [changeToSignUp, setChangeToSignUp] = useState(false);

  const changeLoginUI = () => {
    setChangeToSignUp(!changeToSignUp);
    console.log(changeToSignUp);
  }

  const handleFbLogin = async () => {
    try {
      const data = await signInWithPopup(auth, fbProvider);
      console.log(data);
      router.push('homepage')
    } catch (error) {

    }
  }

  const handleGgLogin = async () => {
    try {
      const data = await signInWithPopup(auth, ggProvider);
      console.log(data);
      router.push('homepage')
    } catch (error) {

    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values, actions) => {
        // setTimeout(() => {
        //   actions.setSubmitting(false);
        //   signInWithEmailAndPassword(auth, values.email, values.password)
        //     .then((userCredential) => {

        //     })
        //     .catch((error) => {
        //       // const errorCode = error.code;

        //     });
        // }, 1000);
      }}
    >
      {
        formik => (
          <Grid className={style.login__page} sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container sx={{ width: '70%', height: '80%', transition: '.3s ease-in-out', position: 'relative' }}>
              <Grid item xs={0} lg={6} sx={{ display: { xs: 'none', lg: 'none' } }}>
              </Grid>
              <Grid item xs={12} md={6} className={changeToSignUp ? style.item__right__changed : style.item__right} sx={{ width: { xs: '100%', lg: '50%' }, height: '100%', padding: '20px 50px', position: 'relative', backgroundColor: '#fff', position: 'absolute', right: 0, top: 0, transition: '.3s ease-in-out' }}>
                {/* <Image src={bgimg} width='100%' height= '100%'></Image> */}
                <Grid className={changeToSignUp ? '' : style.hide__item}>
                  <img src={logo} width='30px' height='30px' alt='logo' />
                  <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#6a6262' }}>Login</Typography>
                  <Typography variant='p' sx={{ fontSize: '12px', }}>Share your fantastic moments with other</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" sx={{ width: '100%', borderColor: '#ec6308', color: '#ec6308', outlineColor: '#ec6308' }} onClick={handleGgLogin}><BsGoogle />Login with Google</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" sx={{ width: '100%' }} onClick={handleFbLogin}><BsFacebook />Login with Facebook</Button>
                    </Grid>
                  </Grid>
                  <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}><span className={style.or__tag}>OR</span></Typography>
                  <TextField id="outlined-basic" label="Username" variant="outlined" sx={{ width: '100%', marginBottom: '20px' }} />
                  <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ width: '100%' }} />
                  <Button variant="outlined" sx={{ width: '100%', margin: '20px 0' }}>Login to your account</Button>
                  <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}>Not a member yet ?<button className={style.button__change__status} onClick={changeLoginUI}>Register now</button></Typography>
                </Grid>
                <Grid className={changeToSignUp ? style.hide__item : ''} >
                  <img src={logo} width='30px' height='30px' alt='logo' />
                  <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Sign up</Typography>
                  <Typography variant='p' sx={{ fontSize: '12px', }}>Share your fantastic moments with other</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" sx={{ width: '100%' }} onClick={handleGgLogin}><BsGoogle />Sign up with Google</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button variant="outlined" sx={{ width: '100%' }} onClick={handleFbLogin}><BsFacebook />Sign up with Facebook</Button>
                    </Grid>
                  </Grid>
                  <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}><span className={style.or__tag}>OR</span></Typography>
                  <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%', marginBottom: '20px' }} />
                  <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ width: '100%', marginBottom: '20px' }} />
                  <TextField id="outlined-basic" label="Confirm Password" variant="outlined" sx={{ width: '100%' }} />
                  <Button variant="outlined" sx={{ width: '100%', margin: '20px 0' }}>Login to your account</Button>
                  <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}>Already have an Account ?<button className={style.button__change__status} onClick={changeLoginUI}>Sign in</button></Typography>
                </Grid>
              </Grid>
              <Grid className={changeToSignUp ? style.item__left__changed : style.item__left} sx={{ display: { xs: 'none', md: 'block' }, width: '50%', height: '100%', padding: '30px 50px', position: 'absolute', left: 0, top: 0, transition: '.3s ease-in-out' }}>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Formik>
  );
};

Login.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}