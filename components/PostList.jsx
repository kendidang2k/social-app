import { Grid } from '@mui/material';
import React from 'react'
import { postList } from '../mock/postList'
import PostItem from './PostItem';

const postListData = postList;

export default function PostList() {

  return (
    <Grid sx={{ marginTop: '10px' }}>
      {
        postListData && postListData.map((postItem) => {
          return <PostItem postItem={postItem} key={postItem.postId} />
        })
      }
    </Grid>
  )
}
