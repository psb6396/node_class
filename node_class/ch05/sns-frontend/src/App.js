import './styles/common.css'
import Navbar from './components/shared/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'
import MyPage from './pages/MyPage'
function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인상태 가져오기

   //새로고침시 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/create" element={<PostCreatePage />} />
            <Route path="/posts/edit/:id" element={<PostEditPage />} />
            <Route path="/my" element={<MyPage auth={user} />} />
            <Route path="/my/:id" element={<MyPage auth={user} />} />
         </Routes>
      </>
   )
}

export default App
