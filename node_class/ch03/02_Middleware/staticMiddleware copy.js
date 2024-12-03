const express = require('express')

require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.send('홈페이지')
})
app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log('서버가 작동중입니다.')
})
