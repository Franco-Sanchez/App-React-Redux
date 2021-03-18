import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { selectPostById } from './postsSlice';

function SinglePostPage({ match }) {
  const { postId } = match.params

  const post = useSelector(state => selectPostById(state, postId));

  const PostNotFound = () => <h2>Post not found</h2>

  const PostFound = () => (
    <article className="post">
      <h2>{post.title}</h2>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content}</p>
      <ReactionButtons post={post} />
      <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
    </article>
  )

  return (
    <section>
      { post ? <PostFound /> : <PostNotFound /> }
    </section>
  )
}

export default SinglePostPage;