'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    // On ajoute une méthode dans User pour pouvoir check facilement le password
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: {
          name: 'authorId',
          type: DataTypes.UUID,
        }
      });
      User.hasMany(models.Comment, {
        foreignKey: {
          name: 'authorId',
          type: DataTypes.UUID,
        }
      });
      User.belongsTo(models.Role);
    }
  };
  User.init({
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    github_url: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    hooks: { // On rajoute des hooks sequelize pour automatiquement hasher le password
      beforeCreate: async (user, options) => {
        if (user.password) {
         const salt = await bcrypt.genSaltSync(10, 'secret');
         user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async  (user, options) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'secret');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    modelName: 'User',
  });
  return User;
};
