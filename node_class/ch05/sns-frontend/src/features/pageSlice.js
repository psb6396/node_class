import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, getProfileId } from '../api/snsApi'

// 내 프로필 정보 가져오기
export const getProfileThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
   try {
      const response = await getProfile()
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필 정보 불러오기 실패')
   }
})

// 특정인 프로필 정보 가져오기
export const getProfileIdThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
   try {
      const response = await getProfileId()
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정인 프로필 정보 불러오기 실패')
   }
})

const pageSlice = createSlice({
   name: 'page',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //내 프로필 가져오기
      builder
         .addCase(getProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(getProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //특정인의 프로필 가져오기
      builder
         .addCase(getProfileIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfileIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(getProfileIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default pageSlice.reducer
