const express = require('express')
const Author = require('../models/author')
const Book = require('../models/book')
const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
      const users = await Author.findAll() // 모든 사용자 데이터를 가져옴
      res.json(users) // JSON 형태로 클라이언트에 응답
   } catch (err) {
      console.error(err)
      next(err) // 에러를 다음 미들웨어로 전달
   }
})

router.get('/:id/books', async (req, res, next) => {
   try {
      const authorWithBooks = await Author.findOne({
         where: { id: req.params.id },
         include: {
            model: Book,
         },
      })
      if (!authorWithBooks) {
         return res.status(404).json({ message: 'Author not found' })
      }
      res.json(authorWithBooks)
   } catch (error) {
      console.error(err)
      next(err)
   }
})

module.exports = router
