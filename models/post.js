'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {as: 'author'});
      Post.hasMany(models.Comment, {
        foreignKey: {
          name: 'postId',
          type: DataTypes.UUID,
        }
      });
    }
  };
  Post.init({
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
