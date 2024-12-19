const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')

// 사용자를 팔로우하는 라우트 localhost:8000/user/:id/follow
router.post('/:id/follow', isLoggedIn, async (req, res) => {
   try {
      //로그인한 사용자의 user객체를 가져온다

      const user = await User.findOne({ where: { id: req.user.id } })
      if (user) {
         await user.addFollowing(parseInt(req.params.id, 10))
         res.json({ success: true, message: '사용자를 성공적으로 팔로우했습니다.' })
      } else {
         res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' })
      }
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '특정 사용자 정보를 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
