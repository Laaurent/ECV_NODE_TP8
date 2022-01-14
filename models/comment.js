'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {as: 'author'});
      Comment.belongsTo(models.Post);
    }
  };
  Comment.init({
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true,
    },
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
