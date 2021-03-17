import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns';

const reactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const list = [
  { id: '1', 
    date: sub(new Date(), { minutes: 10 }).toISOString(), 
    user: '1', 
    title: 'First Post', 
    content: 'Hello!',
    reactions
  },
  { id: '2', 
    date: sub(new Date(), { minutes: 5 }).toISOString(), 
    user: '1', title: 'Second Post', 
    content: 'More text!',
    reactions
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: { list },
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.list = [...state.list, action.payload]
      },
      prepare: (user, title, content) => (
        { payload: { id: nanoid(), date: new Date().toISOString(), user, title, content, reactions } }
      ) 
    },
    updatePost: {
      reducer: (state, action) => {
        state.list = state.list.map((post) => post.id === action.payload.id ? action.payload : post)
      },
      prepare: (id, title, content) => ({ payload: { id, title, content } })
    },
    addReaction: {
      reducer: (state, action) => {
        const existingPost = state.list.find(post => post.id === action.payload.post)
        if(existingPost) existingPost.reactions[action.payload.reaction]++
      },
      prepare: (post, reaction) => ({ payload: { post, reaction } })
    }
  }
})

export const { addPost, updatePost, addReaction } = postsSlice.actions
export default postsSlice.reducer
