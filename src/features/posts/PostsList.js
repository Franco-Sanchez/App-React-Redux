import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, fetchPosts } from './postsSlice';
import PostExcerpt from './PostExcerpt';

function PostsList() {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error)
  const dispatch = useDispatch();

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  let content;

  if(postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if(postStatus === 'succeeded') {
    // uso el slice() para hacer una copia de mi array de posts y no mutarlo cuando llamo al sort()
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
  } else if(postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList; 