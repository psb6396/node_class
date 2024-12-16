const express = require('express')
const router = express.Router()

//게시물 등록 localhost:8000/post
router.post('/', async (req, res) => {})

//게시물 수정 localhost:8000/post/:id
router.put('/:id', async (req, res) => {})

//게시물 삭제 localhost:8000/post/:id
router.delete('/:id', async (req, res) => {})

//특정 게시물 불러오기(id로 게시물 조회) localhost:8000/post/:id
router.get('/:id', async (req, res) => {})

//전체 게시물 불러오기(페이징 기능) localhost:8000/post/
router.get('/', async (req, res) => {})

module.exports = router
