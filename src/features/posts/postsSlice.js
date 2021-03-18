import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await client.post('/fakeApi/posts', { post: initialPost })
  return response.post 
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updatePost: {
      reducer: (state, action) => {
        state.list = state.list.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )
      },
      prepare: (id, date, user, title, content, reactions) => ({
        payload: { id, date, user, title, content, reactions },
      }),
    },
    addReaction: {
      reducer: (state, action) => {
        const existingPost = state.list.find(
          (post) => post.id === action.payload.post
        )
        if (existingPost) existingPost.reactions[action.payload.reaction]++
      },
      prepare: (post, reaction) => ({ payload: { post, reaction } }),
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, _action) => {
      state.status = 'pending'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.list = action.payload
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.list = [...state.list, action.payload]
    }
  }
})

export const { updatePost, addReaction } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.list

export const selectPostById = (state, postId) =>
  state.posts.list.find((post) => post.id === postId)

export default postsSlice.reducer;