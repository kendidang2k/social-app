import Head from "next/head"
import Grid from '@mui/material/Grid';
import Homepage from "./homepage";
import AuthProvider from "../context/AuthProvider";
import StoreProvider from "../context/StoreProvider";

export default function index() {

  return (<div className="">
    <Head>
      <title>Heyo Social</title>
      <link rel="icon" href="/favicon.ico"></link>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka&display=swap" rel="stylesheet"></link>
    </Head>

    {/* <Homepage/> */}
    <AuthProvider>
      <StoreProvider>

      </StoreProvider>
    </AuthProvider>

  </div>
  )
}
