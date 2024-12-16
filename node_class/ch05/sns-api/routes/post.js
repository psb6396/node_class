const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { Post, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const fs = require('fs')

//uploads폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

//이미지 업로드를 위한 multer 설정
const upload = multer({
   //저장할 위치와 파일명 지정
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') //uploads폴더에 저장
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname) //파일 확장자 추출
         //파일명 설정: 기존이름 + 업로드 날짜시간 + 확장자
         //dog.jpg
         //ex) dog + 5131331321 + .jpg
         cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),
   // 파일의 크기 제한
   limits: { fileSize: 5 * 1024 * 1024 },
})

//게시물 등록 localhost:8000/post
// <input type='file' name=img />
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log(req.file)
      if (!req.file) {
         //업로드된 파일이 없거나 무언가 이상이 생겨서 파일정보가 넘어오지 않는 경우
      }
      //게시물 생성
      const post = await Post.create({
         content: req.body.content,
         img: `/${req.file.filename}`, //이미지 url(파일명)
         UserId: req.user.id, //작성자 id
      })

      //게시물 내용에서 해시태그 추출
      //req.body.hashtags = '즐거운 #여행 #맛집'
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g) // #을 기준으로 해시태그 추출

      //추출된 해시태그가 있으면
      if (hashtags) {
         //   Promise.all : 여러개의 비동기 작업을 병렬로 처리. 모든 해시태그가 데이터베이스에서 생성되거나 찾아질때까지 기다림
         // 병렬처리 : 동시에 여러작업을 실행
         // Hashtag.findOrCreate({ where: {title: '여행'}})
         // Hashtag.findOrCreate({ where: {title: '맛집'}})
         // 위의 두 작업이 비동기적으로 동시에 실행됨 -> 장점: 속도가 빨라짐
         //findOrCreate: where 절에서 찾는 값이 존재하는지 확인하고 없으면 create
         const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ where: { title: tag.slice(1) } }))) //#을 제외한

         //posthashtag 관계 테이블에 연결 데이터 추가
         /*
            HashTagInstance1 = [
                id: 1,
                title: 여행,
                createdAt: '2024-12-16T 10:10:10'
            ]

            result = [
                [HashTagInstace1, true] // #여행 해시태그가 새로 생성됨
                [HashTagInstace2, true] // #맛집 해시태그가 새로 생성됨
            ]
        */
         await post.addHashtags(result.map((r) => r[0]))
      }
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.' })
   }
})

//게시물 수정 localhost:8000/post/:id
router.put('/:id', async (req, res) => {})

//게시물 삭제 localhost:8000/post/:id
router.delete('/:id', async (req, res) => {})

//특정 게시물 불러오기(id로 게시물 조회) localhost:8000/post/:id
router.get('/:id', async (req, res) => {})

//전체 게시물 불러오기(페이징 기능) localhost:8000/post/
router.get('/', async (req, res) => {})

module.exports = router
