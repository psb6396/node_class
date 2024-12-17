import { Container } from '@mui/material'
import PostForm from '../components/post/PostForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createPostThunk } from '../features/postSlice'

const PostCreatePage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (postdata) => {
         //postData: 사용자가 입력한 게시물데이터
         /*
        postData = {
            content : '여행중입니다',
            hashtags: '#여행 #맛집',
            img: 파일객체,
        }
        */
         dispatch(createPostThunk(postdata))
            .unwrap()
            .then(() => {
               navigate('/') //게시물 등록 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 등록 에러:', error)
               alert('게시물 등록에 실패했습니다.', error)
            })
      },
      [dispatch, navigate]
   )
   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <PostForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default PostCreatePage
