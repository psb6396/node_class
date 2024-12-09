const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

//라우터 모듈 불러오기
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')

const app = express()
app.set('port', process.env.PORT || 3000)

//데이터베이스 연결 설정
sequelize
   .sync({ force: false }) // 기존 테이블을 초기화 할지 여부 -> 초기화 X
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(`데이터베이스 연결 실패: ${err}`)
   })

//공통 미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//라우터 연결
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

//에러 처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 가 없습니다`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버 에러'

   res.status(status).send(`
         <h1>Error ${status}</h1>
         <p>${message}</p>
      `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
