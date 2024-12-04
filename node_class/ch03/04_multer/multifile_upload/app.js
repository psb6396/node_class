const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

try {
   fs.readdirSync('uploads') //uploads 폴더가 있는지 확인
} catch (error) {
   console.log('upload 폴더가 없어 uploads 폴더가 생성합니다.')
   fs.mkdirSync('uploads') //uploads 폴더 설정
}

const upload = multer({
   //업로드파일 저장 경로 설정
   storage: multer.diskStorage({
      //업로드 파일 저장 경로 설정
      destination(req, file, done) {
         done(null, 'uploads/') //uploads 폴더에 저장
      },
      //저장할 파일 이름 설정
      filename(req, file, done) {
         //file.originalname = dog.png
         // ext = .png

         //done(null, 어떤 파일명으로 저장할건지)
         //path.basename(file.originalname, ext) = dog
         const ext = path.extname(file.originalname) //파일 확장자 추출
         done(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),

   //업로드 파일 크기 제한(5MB)
   limits: { fileSize: 5 * 1024 * 1024 },
})

app.get('/upload', (req, res) => {
   res.sendFile(path.join(__dirname, 'multipart.html'))
})

app.post('/upload', upload.array('many'), (req, res) => {
   console.log(req.files) //업로드된 파일 정보 출력
   res.send('파일 업로드 완료')
})

app.listen(app.get('port'), () => {
   console.log('서버가 작동중입니다.')
})
