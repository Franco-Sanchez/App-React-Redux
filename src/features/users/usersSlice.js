import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('fakeApi/users')
  return response.users
}) 

const usersSlice = createSlice({
  name: 'users',
  initialState: { 
    list: [],
    status: 'idle',
    error: null 
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, _action) => {
      state.status = 'pending'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.list = action.payload
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default usersSlice.reducer;