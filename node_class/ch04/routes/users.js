const express = require('express')

const User = require('../models/user')

const router = express.Router()

router
   .route('/')
   //get 요청 : 모든 사용자 조회
   .get(async (req, res, next) => {})
   //post 요청 : 사용자 등록
   .post(async (req, res, next) => {
      try {
         console.log('req.body', req.body)
         const user = await User.create({
            name: req.body.name, //클라이언트에서 받은 값들을 컬럼값으로 지정
            age: req.body.age,
            married: req.body.married,
         })
         console.log(user) //생성된 사용자 데이터 출력
         res.status(201).json(user) //상태코드 201과 함께 json객체형태로 생성된 사용자 전달
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
