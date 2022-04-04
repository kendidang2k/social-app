import { Grid } from '@mui/material';
import React from 'react'
// import { postList } from '../mock/postList'
import PostItem from './PostItem';


export default function PostList({ postList }) {

  const postListData = postList;

  return (
    <Grid sx={{ marginTop: '10px' }}>
      {
        postListData && postListData.map((postItem) => {
          return <PostItem postItem={postItem} key={postItem.docid} />
        })
      }
    </Grid>
  )
}
