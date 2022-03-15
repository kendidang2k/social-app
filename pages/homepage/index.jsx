import Link from "next/link"
import { auth } from "../../firebase/config";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import CreatePost from "../../components/CreatePost";
import { Grid } from "@mui/material";


export default function Homepage() {

  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/login')
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <CreatePost />
        <Link href="/posts">
          <a>Post List</a>
        </Link>
      </Grid>
      <Grid item xs={4}></Grid>
      <button onClick={handleSignOut}>Sign out</button>
    </Grid>
  )
}
