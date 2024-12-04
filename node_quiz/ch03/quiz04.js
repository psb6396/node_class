const express = require('express')
const app = express()

app.get('/', (req, res) => {
   throw new Error('Something went wrong!')
})

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(err.status).send({ error: err.message })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
