const express = require('express');
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost,
  getOnePost,
  getManyPosts,
} = require('../handlers/posts.handler.js');

router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getOnePost);
router.get('/', getManyPosts);

module.exports = router;
