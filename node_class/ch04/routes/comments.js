const express = require('express')
const Comment = require('../models/comment')

const router = express.Router()

// localhost:8000/comments
router.post('/', async (req, res, next) => {
   try {
      const comment = await Comment.create({
         commenter: req.body.id, // 댓글 작성자 id
         comment: req.body.comment, // 댓글 내용
      })
      console.log(comment)
      res.status(201).json(comment)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// n
// 댓글 수정
router
   .route('/:id')

   //댓글 수정
   .patch(async (req, res, next) => {
      try {
         const result = await Comment.update(
            {
               comment: req.body.comment, //수정할 댓글 내용
            },
            {
               where: { commenter: req.params.id }, //수정할 댓글 id
            }
         )
         if (result[0] === 0) {
            //수정된 데이터가 없을 경우 patch함수를 끝내면서 json객체 response
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
         }
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
      } catch (error) {
         console.log('에러입니다.')
         console.error(error)
         next(error)
      }
   })

   //댓글 삭제
   .delete(async (req, res, next) => {
      try {
         const result = await Comment.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            //삭제된 데이터가 없을 경우
            return res.status(404).json({ message: '댓글을 참을 수 없습니다.' })
         }

         res.json({ message: '댓글이 삭제되었습니다', result })
      } catch {
         console.error(err)
         next(err)
      }
   })

module.exports = router
