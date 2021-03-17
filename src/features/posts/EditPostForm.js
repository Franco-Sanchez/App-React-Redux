import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updatePost } from './postsSlice';


function EditPostForm({ match }) {
  const { postId } = match.params;
  const history = useHistory();

  const post = useSelector(state => state.posts.list.find(post => post.id === postId))
  const [formData, setFormData] = useState({ id: post.id, title: post.title, content: post.content })
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  const handleChange = ({name, value}) => setFormData({ ...formData, [name]: value })

  const handleSubmit = () => {
    dispatch(updatePost(formData.id, formData.title, formData.content))
    history.push(`/posts/${post.id}`)
  }
  
  useEffect(() => {
    setIsDisable(!formData.title || !formData.content);
  }, [formData])

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          name="title"
          id="postTitle"
          placeholder="What's on your mind?"
          value={formData.title}
          onChange={ (e) => handleChange(e.target) }
        />
        <label htmlFor="postContent">Content:</label>
        <textarea 
          name="content"
          id="postContent"
          value={formData.content}
          onChange={ (e) => handleChange(e.target) }
        />
        <button disabled={isDisable} type="button" onClick={handleSubmit}>Save Post</button>
      </form>
    </section>
  )
}

export default EditPostForm;