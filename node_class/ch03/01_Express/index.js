const express = require('express')
require('dotenv').config() //env 파일을 사용하기 위한 라이브러리 로드

const app = express()
app.set('port', process.env.PORT || 3000) // 서버에 포트 지정

// app.get() -> read 요청
// app.post() -> create 요청
// app.delete() -> 삭제 요청
// app.put() -> 전체 수정 요청
// app.patch() -> 일부 수정 요청

app.get('/', (req, res) => {
   res.send('안녕! node!')
})

app.get('/hello', (req, res) => {
   res.send('안녕! nodesadfasdf!')
})

app.get('/test', (req, res) => {
   res.send('안녕! test!')
})

//서버를 동작시킴
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중입니다. http://localhost:${app.get('port')}`)
})
