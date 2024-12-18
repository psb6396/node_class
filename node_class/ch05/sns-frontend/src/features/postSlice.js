import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, updatePost, deletePost, getPostById, getPosts } from '../api/snsApi'

//게시물 등록 Thunk
export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

//게시물 수정 Thunk
export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {})

//게시물 삭제 Thunk
export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deletePost(id)
      return id //삭제 성공 후 삭제된 게시물의 id 만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

//특정 게시물 가져오기
export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {})

//전체게시물 리스트 가져오기
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 리스트 불러오기')
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      post: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //게시물 리스트 불러오기
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //게시물 삭제
      builder
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
            //게시물 리스트가 있는 메인 페이지를 새로고침 하지 않아도 state가 변경되면서 재렌더링이 발생하면 게시물이 삭제된 것처럼 보인다.(실제 db에서도 삭제됨)
            state.posts = state.posts.filter((post) => post.id !== action.payload) //삭제된 게시물을 posts state에서 제거
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
