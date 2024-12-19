import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState, useEffect } from 'react'
import { getProfileIdThunk, getProfileThunk } from '../../features/pageSlice'
import { useParams } from 'react-router-dom'
import { followUserThunk } from '../../features/userSlice'
// import {} from '../../features/userSlice'

const MyProfile = ({ auth }) => {
   const { id } = useParams() //게시물의 이름 클릭시 path 파라미터에 사용자 id존재, navbar 이름 클릭시 path 파라미터에 사용자 id X
   const [followers, setFollowers] = useState(0) //팔로워수
   const [followings, setFollowings] = useState(0) //팔로잉수
   const [follow, setFollow] = useState(false) //팔로우 여부

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.page)

   const fetchProfileData = useCallback(() => {
      if (id) {
         //게시물의 이름을 클릭해서 들어온 경우
         dispatch(getProfileIdThunk(id))
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followers.length)
            })
            .catch((error) => {
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      } else {
         dispatch(getProfileThunk())
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followers.length)
            })
            .catch((error) => {
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      }
   }, [dispatch, id])

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData, follow])

   const onClickFollow = useCallback(
      (id) => {
         dispatch(followUserThunk(id))
            .unwrap()
            .then((result) => {
               alert('팔로우되었습니다!')
               setFollow((prev) => !prev) //follow상태 true로 변경
            })
            .catch((error) => {
               console.error('팔로우 중 오류 발생:', error)
               alert('팔로우를 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <>
         {user && (
            <Card sx={{ minWidth: 275 }}>
               <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                     {user.email}
                  </Typography>
                  <Typography variant="h5" component="div">
                     {user.nick}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>자기소개</Typography>
                  <Typography variant="body2">
                     {followers} Followers &nbsp;&nbsp;&nbsp; {followings} Followings
                  </Typography>
               </CardContent>
               <CardActions sx={{ p: 2 }}>
                  <Button
                     variant="contained"
                     onClick={() => {
                        onClickFollow(`${user.id}`)
                     }}
                     //내 페이지거나 (메뉴바에서 이름을 클릭한 경우) || 로그인한 사람의 id와 내 페이지의 path 파라미터 :id가 같거나(게시물에서 내 이름을 클릭한 경우) || 이미 팔로우를 한 사용자의 경우

                     /* 
                        나를 팔로우한 사람의 데이터
                        user.Followers = [
                           {id:1, nick:'하서' ..}
                           {id:2, nick:'지은' ..}
                        ]
                        
                        f.id = 나를 팔로우한 사람의 id
                     */
                     disabled={!id || String(auth.id) === String(id) || user.Followers.filter((f) => f.id === auth.id).length > 0 ? true : false}
                  >
                     Follow
                  </Button>
               </CardActions>
            </Card>
         )}
      </>
   )
}

export default MyProfile
