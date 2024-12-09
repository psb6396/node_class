const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models')
//models/index.js
require('dotenv').config()
//env파일을 사용하기 위한 라이브러리

//라우터 모듈 불러오기
const indexRouter = require('./routes') //index.js
const usersRouter = require('./routes/users') //user.js
const commentsRouter = require('./routes/comments') //comments.js

const app = express()
app.set('port', process.env.PORT || 8000)

//데이터 베이스 연결 설정
sequelize
   .sync({ force: false })
   //기존 테이블의 초기화 여부 . false-> 초기화 안함
   //실행할때마다 comment,user테이블 다시실행됨 -> 데이터 날라갈수도 있음
   .then(() => {
      console.log('데이터 베이스 연결 성공')
   })
   .catch((err) => {
      console.log(`데이터베이스 연결 실패:${err}`)
   })

//공통 미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
//정적 파일 제공
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우터 연결
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

//에러처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`)
   error.status = 404 //not found
   next(error)
})

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'

   //에러 정보를 브라우저로 전달
   res.status(status).send(`
      <h1>Error ${status}</h1>
      <p>${message}</p>
      `)
})

app.listen(app.get('port'), () => {
   console.log(`서버 작동중. http://localhost:8000`)
})
