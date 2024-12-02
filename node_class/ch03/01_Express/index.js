const express = require('express')

const app = express()
app.set('port', 8000) // 서버에 포트 지정

// app.get() -> read 요청
// app.post() -> create 요청
// app.delete() -> 삭제 요청
// app.put() -> 전체 수정 요청
// app.patch() -> 일부 수정 요청

app.get('/', (req, res) => {
   res.send('안녕! node!')
})

app.get('/test', (req, res) => {
   res.send('안녕! test!')
})

//서버를 동작시킴
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중입니다. http://localhost:${app.get('port')}`)
})
