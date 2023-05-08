var express = require('express');
var router = express.Router();
const dayjs = require('dayjs');

const userPosts = [
  {
    id: 1,
    title: '포스트 제목 예시입니다',
    content: '포스트 본문입니다.',
    createdAt: dayjs().format('YYYY년 MM월 DD일').toString(),
    updatedAt: dayjs().format('YYYY년 MM월 DD일').toString(),
  }
]

router.get('/',(req, res) => {
  res.render('board', {
    title: '게시판',
    userPosts
  })
})


router.get('/write',(req, res) => {
  res.render('board-write-post', {
    title: '게시글 작성',
  })
})

router.get('/:id',(req, res) => {
  const { id } = req.params;
  const userPost = userPosts.find((post) => post.id === +id)
  // dynamic route..
  res.render('board-detail', {
    title: '게시글 상세',
    userPost,
  })
})



module.exports = router;