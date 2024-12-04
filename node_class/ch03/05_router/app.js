const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev')) //로그 남기기

// 라우팅 : 경로를 지정하는 과정
const indexRouter = require('./routes/index') //index.js
const userRouter = require('./routes/user') //user.js

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(app.get('port'), () => {
   console.log(`서버작동중  http://localhost:${app.get('port')}`)
})
