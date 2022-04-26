import { ButtonBase, CircularProgress, Grid } from '@mui/material';
import { collection, onSnapshot, orderBy, query, where, limit, startAfter, startAt } from 'firebase/firestore';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppProvider';
import { StoreContext } from '../context/StoreProvider';
import { db } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';
import PostItem from './PostItem';


export default function PostList({ currentUser }) {

  const [lastDataPost, setLastDataPost] = useState(null)
  const [postList, setPostList] = useState([])
  const [loadMore, setLoadMore] = useState(true)
  const { allPosts } = useContext(AppContext);
  const postRerenderCondition = allPosts;
  const { isUpdateByCreate } = useContext(StoreContext)


  // const { isUpdateByCreate, setIsUpdateByCreate } = useContext(StoreContext)
  const [limitDoc, setLimitDoc] = useState(5)

  console.log("loadMore", loadMore)

  useEffect(() => {
    const getPostByFollowing = () => {
      const postRef = null;
      if (lastDataPost != null) {
        postRef = query(collection(db, "posts"), orderBy('createdAt', 'desc'), startAfter(lastDataPost.createdAt), limit(limitDoc))
      } else {
        postRef = query(collection(db, "posts"), orderBy('createdAt', 'desc'), limit(limitDoc))
      }
      // console.log('limitDoc', limitDoc);
      onSnapshot(postRef, (querySnapshot) => {
        const tempDataArray = [];
        // console.log("teamldata after create", tempDataArray);
        const postArrayUser = currentUser.following;
        if (postArrayUser.includes(currentUser.docid)) {
          console.log("existed");
        } else {
          postArrayUser.push(currentUser.docid)
        }
        querySnapshot.forEach((doc) => {
          if (postArrayUser.includes(doc.data().publisherID)) {
            tempDataArray.push({ docid: doc.id, ...doc.data() })
            // console.log("tempDataArray:", tempDataArray)
          }
        })
        setPostList(tempDataArray)
        setLastDataPost(tempDataArray[tempDataArray.length - 1])
        // console.log("postList:", postList)
      })
    }

    getPostByFollowing();
    // return () => {
    //   isMounted = false;
    // };
  }, [currentUser.following, loadMore, allPosts, currentUser])

  return (
    postList ?
      <Grid sx={{ marginTop: '10px' }} id="post__list">
        {
          postList && postList.map((postItem) => {
            return (
              <PostItem postItem={postItem} key={postItem.docid} />
            )
          })
        }
        <ButtonBase onClick={() => { setLoadMore(!loadMore); setLimitDoc(limitDoc + 5) }}>load more</ButtonBase>
      </Grid>
      :
      <Grid sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <CircularProgress />
      </Grid>
  )
}
