const express = require('express')
const router = express.Router() //라우터(경로를 지정해주는 라이브러리)를 가져온다

// localhost:8000/user
router.get('/', (req, res) => {
   res.send('Hello, User')
})

// localhost:8000/user/test
// router.get('/test', (req, res) => {
//    res.send('Hello, Usertest')
// })

router.get('/:id', (req, res) => {
   console.log(req.params, req.query)
   console.log(req.query.page)
   console.log(req.query.lang)
   res.send('Hello, User' + req.params.id)
})

router.get('/cate/:id', (res, req) => {
   res.send('GET /user/cate/' + req.params.id)
})

// router.get('/cate/abc', (req, res) => {
//    res.send('')
// })

// router.post('/cate/abc', (req, res) => {
//    res.send('')
// }) 인경우 아래와 같이 하나로 작성가능

router
   .route('/cate/abc')
   .get((res, res) => {
      res.send('')
   })
   .post((res, req) => {
      res.send('')
   })

module.exports = router
