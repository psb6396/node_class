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
         console.log('파일이 없음')
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
            
            r[0] = HashTagInstace1
            r[0] = HashTagInstace2
        */
         // HashTagInstace를 통해 post와의 관계를 설정학고 이 과정에서 postHashtag 테이블의 postId와 hashtagId 컬럼에 값이 추가됨

         await post.addHashtags(result.map((r) => r[0]))
      }
      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            userId: post.userId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.' })
   }
})

//게시물 수정 localhost:8000/post/:id
router.put('/:id', isLoggedIn, async (req, res) => {
   try {
      //게시물 존재 여부 확인
      // select * from post where id = ? and UserId = ?
      const post = await Post.findOne({ where: { id: req.params.id, userId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      //게시물 수정
      await post.update({
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : post.img, //수정된 이미지 파일이 있으면 교체 없으면 기존 값 유지
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ where: { title: tag.slice(1) } })))

         await post.addHashtags(result.map((r) => r[0]))
      }

      //업데이트 된 게시물 다시 조회
      const updatedPost = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'], //user테이블의 id,nick컬럼값만 가져옴
            },
            {
               model: Hashtag,
               attributes: ['title'], //hashtags 테이블의 title 컬럼 값만 가져옴
            },
         ],
      })

      res.json({
         success: true,
         post: updatedPost,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.' })
   }
})

//게시물 삭제 localhost:8000/post/:id
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      // 삭제 게시물 존재 여부 확인
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }
      //게시물 삭제
      await post.destroy()

      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.' })
   }
})

//특정 게시물 불러오기(id로 게시물 조회) localhost:8000/post/:id
router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         post,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물을 불러오는 중에 오류가 발생했습니다.' })
   }
})

//전체 게시물 불러오기(페이징 기능) localhost:8000/post?page=1&limit=3
router.get('/', async (req, res) => {
   try {
      //parseInt('08') -> 일부 브라우저에서 NaN 반환
      //parseInt('08',10) -> 10진수 8을 반환
      const page = parseInt(req.query.page, 10) || 1 //page번호(기본값:1)
      const limit = parseInt(req.query.limit, 10) || 3 //한페이지당 나타낼 레코드 갯수
      const offset = (page - 1) * limit //오프겟 계산

      //게시물의 전체 갯수 가져오기
      //select count(*) from post
      const count = await Post.count()

      //게시물 레코드를 가져오기
      /*
         page:1, limit:3, offset:0  -> 0개의 레코드를 건너뛰고 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 0

         page:2, limit:3, offset:3  -> 3개의 레코드를 건너뛰고 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 3

         page:3, limit:3, offset:6  -> 6개의 레코드를 건너뛰고 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 6
      */

      const posts = await Post.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']], //최신날짜 순으로 가져온다.
         //게시글을 작성한 사람과 게시글에 작성된 해시태그를 같이 가져온다.
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '게시물이 성공적으로 불러와졌습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물리스트를 불러오는 중에 오류가 발생했습니다.' })
   }
})

module.exports = router
