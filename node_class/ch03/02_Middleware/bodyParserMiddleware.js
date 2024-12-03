const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//4. body - parser 미들웨어
// request 데이터를 json객체로 받아올 수 있게 해줌
app.use(express.json())
// form태그에서 입력한 데이터를 'name=하서&age=50' 이런 형식으로 전달
app.use(express.urlencoded({ extended: true })) //url-encoded 요청 처리

app.get('/', (req, res) => {
   //submit.html 페이지 response
   res.sendFile(path.join(__dirname, '/submit.html'))
})

app.post('/submit', (req, res) => {
   //request, response 할때는 header + body 형태로 데이터가 전송된다.
   //header 영역: request,
   console.log(req.body) //form 태그에서 입력한 데이터가 들어있음
})

app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log('서버가 작동중입니다.')
})
