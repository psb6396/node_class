import { Pagination } from '@mui/material'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      post: null,
      Pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default postSlice.reducer
