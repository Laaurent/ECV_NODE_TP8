const express = require('express');
const router = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
  getOneComment,
  getManyComments,
} = require('../handlers/comments.handler.js');

router.post('/', createComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/:id', getOneComment);
router.get('/', getManyComments);

module.exports = router;
