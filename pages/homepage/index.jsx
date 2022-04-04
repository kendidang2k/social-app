import Link from "next/link"
import { auth } from "../../firebase/config";
import { useRouter } from 'next/router';
import { useContext, useEffect } from "react";
import CreatePost from "../../components/CreatePost";
import { Grid } from "@mui/material";
import PostList from "../../components/PostList";
import FriendRequest from "../../components/FriendRequest";
import MoreFriend from "../../components/MoreFriend";
import StoryList from "../../components/StoryList";
import Image from 'next/image'
import SuggestGroup from "../../components/SuggestGroup";
import TopBlog from "../../components/TopBlog";
import { AppContext } from "../../context/AppProvider";
import { PostContext } from "../../context/PostProvider";

export default function Homepage() {

  const { currentUserPost } = useContext(PostContext);

  return (
    <Grid container sx={{ paddingBottom: '200px', display: { xs: 'flex', md: 'flex' }, flexFlow: { xs: 'column-reverse', md: 'row' }, maxWidth: '960px', margin: 'auto' }}>
      <Grid item xs={12} md={8} sx={{ height: '100%', padding: { xs: '0 10px', md: '25px 0 0 0' } }}>
        <StoryList />
        <CreatePost />
        <PostList postList={currentUserPost} />
      </Grid>
      <Grid item xs={12} md={4} sx={{ padding: { xs: '0 10px', md: '25px 15px 0 10px' } }}>
        <FriendRequest />
        <MoreFriend />
        <SuggestGroup />
        <TopBlog />
      </Grid>
    </Grid >
  )
}
