import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const postSlice = createSlice({
   name: 'page',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default pageSlice.reducer
