import { createSlice } from '@reduxjs/toolkit';

const list = [
  { id: '1', name: 'Tianna Jenkins' },
  { id: '2', name: 'Kevin Grant' },
  { id: '3', name: 'Madison Price' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState: { list },
  reducers: {}
})

export default usersSlice.reducer;