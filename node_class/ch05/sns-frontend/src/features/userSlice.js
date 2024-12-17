import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const postSlice = createSlice({
   name: 'user',
   initialState: {
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default userSlice.reducer
