import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function AddPostForm() {
  const [formData, setFormData] = useState({ user: '', title: '', content: '' })
  const [isDisable, setIsDisable] = useState(true);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(state => state.users.list);
  const dispatch = useDispatch();

  const handleChange = ({ name, value }) => setFormData({ ...formData, [name]: value })

  const handleSubmit = async () => {
    if(!isDisable) {
      try {
      setAddRequestStatus('pending');
      const resultAction = await dispatch(addNewPost(formData));
      unwrapResult(resultAction);
      setFormData({ user: '', title:'', content: '' }) 
      } catch (e) {
        console.error(`Failed to save the post: ${e}`)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  useEffect(() => {
    setIsDisable((!formData.user || !formData.title || !formData.content) && addRequestStatus === 'idle')
  }, [formData, addRequestStatus])

  const userOptions = users.map(user => <option key={user.id} value={user.id}>{ user.name }</option>)

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          name="title"
          placeholder="What's on your mind?"
          id="postTitle"
          value={formData.title}
          onChange={(e) => handleChange(e.target)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select 
          name="user"
          id="postAuthor"
          value={formData.user}
          onChange={(e) => handleChange(e.target)}>
            <option value='' disabled>Select an Author</option>
            {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea 
          name="content"
          id="postContent"
          value={formData.content}
          onChange={(e) => handleChange(e.target)}
        />
        <button disabled={isDisable} type="button" onClick={handleSubmit}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm;