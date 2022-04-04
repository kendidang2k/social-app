import Head from "next/head"
import Grid from '@mui/material/Grid';
import Homepage from "./homepage";
import AuthProvider from "../context/AuthProvider";
import StoreProvider from "../context/StoreProvider";
import AppProvider from "../context/AppProvider";

export default function index() {

  return (<div className="">
    <Head>
      <title>Heyo Social</title>
      <link rel="icon" href="/favicon.ico"></link>
    </Head>

    {/* <Homepage/> */}
    

  </div>
  )
}
