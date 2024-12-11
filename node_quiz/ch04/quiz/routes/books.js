const express = require('express')
const { Book } = require('../models/book')

const router = express.Router()

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const books = await Book.findAll()
         res.json(books)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         const book = await Book.create({
            title: req.body.title,
            genre: req.body.genre,
         })
         console.log(book) // 생성된 댓글 로그 출력
         res.status(201).json(book) // 상태 코드 201과 함께 생성된 댓글 JSON 응답
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

router.route('/:id').patch(async (req, res, next) => {
   try {
      const modified_book = await Book.update({
         title: req.body.title,
         genre: req.body.genre,
      })
      if (modified_book[0] === 0) {
         // 수정된 데이터가 없을 경우
         return res.status(404).json({ message: '책을 찾을 수 없습니다.' })
      }
      res.json({ message: '책스펙이 수정되었습니다.', result }) // 성공 응답
   } catch (err) {
      console.error(err)
      next(err)
   }
})
