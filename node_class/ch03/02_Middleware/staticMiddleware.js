const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//3. static 미들웨어 사용: 정적파일에 바로 접근가능하게 하는 미들웨어
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
   res.send('홈페이지')
})
app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log('서버가 작동중입니다.')
})
