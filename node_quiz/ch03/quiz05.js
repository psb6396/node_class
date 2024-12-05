const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

app.get('/setId', (req, res) => {
   // 1시간 동안 유효하고 name: id, value: user1인 쿠키를 만든다
   res.cookie('name', 'id', {signed: false, maxAge: 1000 * 60 * 60})
   res.cookie('value','user1',{signed: false, maxAge: 1000 * 60 * 60})
})

app.get('/getId', (req, res) => {
   // 쿠키 value값 읽어서 화면에 출력하기
   console.log('cookies:', req.cookies)
   res.send(`쿠키: ${req.cookies.age}`)
})

app.listen(8000, () => console.log('Server running on http://localhost:8000'))
