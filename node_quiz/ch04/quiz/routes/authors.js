const express = require('express')
const Author = require('../models/author')

const router = express.Router()

//localhost:8000/authors
router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const authors = await Author.findAll() //모든 작가 조회
         res.json(authors)
      } catch (err) {
         console.errro(err)
         next(err)
      }
   })

   .post(async (req, res, next) => {
      // 작가 생성
      try {
         const author = await Author.create({
            name: req.body.name,
            age: req.body.age,
         })
         console.log(author)
         res.status(201).json(author)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

//PATCH /authors/작가 :id
// router.get()
router
   .route('/:id')
   .patch(async (req, res, next) => {
      try {
         const modified_author = await Author.update(
            {
               name: req.body.name,
               age: req.body.age,
            },
            {
               where: { id: req.params.id },
            }
         )
         if (modified_author[0] === 0) {
            return res.status(404).json({ message: '작가를 찾을 수 없다.' })
         }
         res.json({ message: '작가 정보가 수정되었습니다.', modified_author })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Author.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            //
            return res.status(404).json({ message: '작가를 찾을 수 없습니다.' })
         }
         res.json({ message: '작가가 삭제되었습니다.', result }) // 성공 응답
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
