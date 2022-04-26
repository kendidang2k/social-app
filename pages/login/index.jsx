// import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Formik, Form, Field } from 'formik';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { collection, addDoc } from "firebase/firestore";
import logo from '../../assets/images/LoginPage/logo.jpg'
import style from '../../styles/Login.module.css'
import { addDocument } from '../../firebase/service';
import { auth, db } from '../../firebase/config';
import * as Yup from 'yup'
import TextInput from '../../components/TextInput';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
toast.configure();

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function Login() {

  const router = useRouter();

  const [changeToSignUp, setChangeToSignUp] = useState(false);

  const changeLoginUI = () => {
    setChangeToSignUp(!changeToSignUp);
  }

  const userContext = useContext(AuthContext)

  const handleFbLogin = async () => {
    try {
      const data = await signInWithPopup(auth, fbProvider)
      if (data._tokenResponse.isNewUser) {
        addDocument("users", {
          uid: data.user.uid,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          coverPhoto: '',
          following: [],
          follower: [],
          notifications: [],
          photo: [],
          video: [],
          posts: [],
          blog: [],
          phoneNumber: '',
          email: '',
          age: '',
        })
      }
      router.push('homepage');
    } catch (e) {
      toast.error("Login fail !! Check agian !!")
    }
  }

  const handleGgLogin = async () => {
    try {
      const data = await signInWithPopup(auth, ggProvider);
      if (data._tokenResponse.isNewUser) {
        addDocument("users", {
          uid: data.user.uid,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          coverPhoto: '',
          following: [],
          follower: [],
          notifications: [],
          photo: [],
          video: [],
          posts: [],
          blog: [],
          phoneNumber: '',
          email: '',
          age: '',
        })
      }
      router.push('homepage')
    } catch (error) {
      toast.error("Login fail !! Check agian !!")
    }
  }

  const validateLogin = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email must be required !"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password must be required !"),
  })

  const validateSignup = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email must be required !"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password must be required !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match !')
      .required("Confirm Password must be required !")
  })

  return (
    <Grid className={style.login__page} sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container sx={{ width: { xs: '80%', md: '70%' }, height: '80%', transition: '.3s ease-in-out', position: 'relative' }}>
        <Grid item xs={0} lg={6} sx={{ display: { xs: 'none', lg: 'none' } }}>
        </Grid>
        <Grid item xs={12} md={6} className={changeToSignUp ? style.item__right__changed : style.item__right} sx={{ width: { xs: '100%', lg: '50%' }, height: '100%', display: 'flex', alignItems: 'center', padding: { xs: '10px 20px', md: '20px 50px' }, position: 'relative', backgroundColor: '#fff', position: 'absolute', right: 0, top: 0, transition: '.3s ease-in-out', borderRadius: { xs: '10px', md: '0' } }}>
          {/* <Image src={bgimg} width='100%' height= '100%'></Image> */}
          <Grid className={changeToSignUp ? '' : style.hide__item} sx={{ width: '100%', padding: { xs: '0', sm: '0 20%', md: '0', lg: '0' } }}>
            <Image src={logo} width='30px' height='30px' alt='logo'></Image>
            {/* <img src='../../assets/images/LoginPage/logo.jpg  ' width='30px' height='30px' alt='logo' /> */}
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#6a6262', fontSize: '25px' }}>Login</Typography>
            <Typography variant='p' sx={{ fontSize: { xs: '10px', md: '14px' }, color: '#a4a4a4' }}>Share your fantastic moments with other</Typography>
            <Grid container spacing={1} sx={{ marginTop: '0px' }}>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" sx={{ width: '100%', borderColor: '#ec6308', color: '#ec6308', outlineColor: '#ec6308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '10px', md: '12px' }, fontWeight: 'bold', padding: { xs: '3px 10px', md: '10px 10px' } }} onClick={handleGgLogin}><Typography component={"span"} sx={{ marginRight: '10px' }}><BsGoogle /></Typography>Login with Google</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '10px', md: '12px' }, fontWeight: 'bold', padding: { xs: '3px 10px', md: '10px 10px' } }} onClick={handleFbLogin}><Typography component={"span"} sx={{ marginRight: '10px' }}><FaFacebookF /></Typography> Login with Facebook</Button>
              </Grid>
            </Grid>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async (values) => {
                signInWithEmailAndPassword(auth, values.email, values.password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    router.push('homepage');
                  })
                  .catch((error) => {
                    toast.error("Login fail !! Check agian !!")
                    console.log(error.message);
                  });
              }}
              validationSchema={validateLogin}
            >
              <Form>
                <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}><span className={style.or__tag}>OR</span></Typography>
                <Box sx={{ marginBottom: '15px' }}>
                  <TextInput sx={{ width: '100%', height: '10px', marginBottom: '10px' }} label="Email" id='email' name='email' type='email' />
                </Box>
                <Box sx={{ marginBottom: '15px' }}>
                  <TextInput sx={{ width: '100%' }} label="Password" id='password' name='password' InputProps={true} />
                </Box>
                <Button type='submit' variant="outlined" sx={{ width: '100%', margin: '20px 0' }}>Login to your account</Button>
              </Form>
            </Formik>
            <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}>Not a member yet ?<button className={style.button__change__status} onClick={changeLoginUI}>Register now</button></Typography>
          </Grid>
          <Grid className={changeToSignUp ? style.hide__item : ''} sx={{ width: '100%', padding: { xs: '0', sm: '0 20%', md: '0', lg: '0' } }}>
            <Image src={logo} width='30px' height='30px' alt='logo'></Image>
            {/* <img src={logo} width='30px' height='30px' alt='logo' /> */}
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#6a6262', fontSize: '25px' }}>Sign up</Typography>
            <Typography variant='p' sx={{ fontSize: { xs: '10px', md: '14px' }, color: '#a4a4a4' }}>Share your fantastic moments with other</Typography>
            <Grid container spacing={1} sx={{ marginTop: '5px' }}>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" sx={{ width: '100%', borderColor: '#ec6308', color: '#ec6308', outlineColor: '#ec6308', display: 'flex', alignItems: 'center', fontSize: { xs: '10px', md: '12px' }, fontWeight: 'bold', justifyContent: 'center', padding: { xs: '3px 10px', md: '10px 10px' } }} onClick={handleGgLogin}><Typography component={"span"} sx={{ marginRight: '10px' }}><BsGoogle /></Typography>Sign up with Google</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '10px', md: '12px' }, fontWeight: 'bold', padding: { xs: '3px 10px', md: '10px 10px' } }} onClick={handleFbLogin}><Typography component={"span"} sx={{ marginRight: '10px' }}><FaFacebookF /></Typography>Sign up with Facebook</Button>
              </Grid>
            </Grid>
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={async (values) => {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    addDocument("users", {
                      uid: user.uid,
                      displayName: user.email,
                      photoURL: user.photoURL,
                      coverPhoto: '',
                      following: [],
                      follower: [],
                      notifications: [],
                      photo: [],
                      video: [],
                      posts: [],
                      blog: [],
                      phoneNumber: '',
                      email: '',
                      age: '',
                    })
                    toast.success("Register successfully !!")
                  })
                  .catch((error) => {
                    toast.error(error.message)
                    // setErrorMess(error)
                    // setOpen(true)
                  });
              }}
              validationSchema={validateSignup}
            >
              <Form>
                <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}><span className={style.or__tag}>OR</span></Typography>
                <Box sx={{ marginBottom: '15px' }}>
                  <TextInput sx={{ width: '100%', height: '10px', marginBottom: '10px' }} label="Email" id='email' name='email' type='email' />
                </Box>
                <Box sx={{ marginBottom: '15px' }}>
                  <TextInput sx={{ width: '100%' }} label="Password" id='password' name='password' InputProps={true} />
                </Box>
                <Box sx={{ marginBottom: '15px' }}>
                  <TextInput sx={{ width: '100%' }} label='Confirm Password' name='confirmPassword' InputProps={true} />
                </Box>
                <Button type='submit' variant="outlined" sx={{ width: '100%', margin: '10px 0' }}>Sign up</Button>
              </Form>
            </Formik>
            <Typography component="p" sx={{ width: '100%', textAlign: 'center' }}>Already have an Account ?<button className={style.button__change__status} onClick={changeLoginUI}>Sign in</button></Typography>
          </Grid>
        </Grid>
        <Grid className={changeToSignUp ? style.item__left__changed : style.item__left} sx={{ display: { xs: 'none', md: 'block' }, width: '50%', height: '100%', padding: '30px 50px', position: 'absolute', left: 0, top: 0, transition: '.3s ease-in-out' }}>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}