import { Container } from '@mui/material'
import PostForm from '../components/post/PostForm'

const PostCreatePage = () => {
   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <PostForm />
      </Container>
   )
}

export default PostCreatePage
