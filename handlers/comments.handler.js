const { Comment } = require("../models");
const createError = require("http-errors");

const createComment = async (req, res, next) => {
   const { content, date, author_id, post_id } = req.body;
   const comment = await Comment.create({
      content,
      date,
      postId: post_id,
      authorId: author_id,
   });

   return comment ? res.json(comment) : next(createError(500));
};

const updateComment = async (req, res, next) => {
   const updateSuccess = await Comment.update(
      {
         ...req.body,
      },
      {
         where: {
            id: req.params.id,
         },
      }
   );

   if (updateSuccess) {
      const comment = await Comment.findByPk(req.params.id);
      return res.json(comment);
   } else {
      return next(createError(500));
      /* res.status(500).json({
         status: 500,
         message: "Server error",
      }); */
   }
};

const deleteComment = async (req, res, next) => {
   const deleteSuccess = await Comment.destroy({
      where: {
         id: req.params.id,
      },
   });

   if (deleteSuccess) {
      return res.status(204).json();
   } else {
      return next(createError(500));
      /* res.status(500).json({
         status: 500,
         message: "Server error",
      }); */
   }
};

const getOneComment = async (req, res, next) => {
   const comment = await Comment.findByPk(req.params.id);

   if (!comment) {
      return next(createError(404));
      /* return res.status(404).json({
         status: 404,
         message: "Resource not found",
      }); */
   }

   return res.json(Comment);
};

const getManyComments = async (req, res, next) => {
   const comments = await Comment.findAll();
   return comments ? res.json(comments) : next(createError(500));
};

module.exports = {
   createComment,
   updateComment,
   deleteComment,
   getOneComment,
   getManyComments,
};
