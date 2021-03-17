import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';

function AddPostForm() {
  const [formData, setFormData] = useState({ id: nanoid(), user: '', title: '', content: '' })
  const [isDisable, setIsDisable] = useState(true);

  const users = useSelector(state => state.users.list);
  const dispatch = useDispatch();

  const handleChange = ({ name, value }) => setFormData({ ...formData, [name]: value })

  const handleSubmit = () => {
    dispatch(addPost(formData.user, formData.title, formData.content))
    setFormData({ id: nanoid(), user: '', title:'', content: '' })
  }

  useEffect(() => {
    setIsDisable(!formData.user || !formData.title || !formData.content)
  }, [formData])

  const userOptions = users.map(user => <option key={user.id} value={user.id}>{ user.name }</option>)

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          name="title"
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