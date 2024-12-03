const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//5. 에러처리 미들웨어: 에러처리를 위해 사용하는 미들웨어

app.get('/', (req, res) => {
   res.send('환영합니다.')
})

// 강제로 에러발생 시킴
app.get('/error', (req, res, next) => {
   const err = new Error('에러 발생') //강제로 ㅇㅔ러 발생
   err.status = 500 //http 상태코드 지정
   next(err) //에러처리 미들웨어로 이동(에러객체때매 알아서 노드가 해줌)
})

app.use((err, req, res, next) => {
   console.error('Error:', err.message)
   res.status(err.status).json({
      error: {
         message: err.message,
      },
   })
})

app.listen(app.get('port'), () => {
   console.log('서버가 작동중입니다.')
})
