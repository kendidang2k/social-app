import Link from "next/link"
import { auth } from "../../firebase/config";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import CreatePost from "../../components/CreatePost";
import { Grid } from "@mui/material";
import PostList from "../../components/PostList";
import FriendRequest from "../../components/FriendRequest";
import MoreFriend from "../../components/MoreFriend";
import StoryList from "../../components/StoryList";
import Image from 'next/image'

export default function Homepage() {

  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/login')
  }

  return (
    <Grid container sx={{ paddingBottom: '200px', display: { xs: 'flex', md: 'flex' }, flexFlow: { xs: 'column-reverse', md: 'row' }, maxWidth: '960px', margin: 'auto' }}>
      <Grid item xs={12} md={8} sx={{ height: '100%', padding: { xs: '0 10px', md: '25px 0 0 0' } }}>
        {/* <img src="https://cdn.dealtoday.vn/img/s630x420/5748c7943636479aad344c38d4f7ec2d.jpg?sign=y3ViLPcWTLsQHlGCB-odcA" alt="Test Image"></img> */}
        <StoryList />
        <CreatePost />
        <PostList />
      </Grid>
      <Grid item xs={12} md={4} sx={{ padding: { xs: '0 10px', md: '25px 15px 0 10px' } }}>
        <FriendRequest />
        <MoreFriend />
        <button onClick={handleSignOut}>Sign out</button>
      </Grid>
    </Grid >
  )
}
