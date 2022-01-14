'use strict';

const { User, Role, Post } = require('../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const guestRole = await Role.findOne({
      where: { name: 'guest' }
    });

    const author = await User.findOne({
      where: { roleId: guestRole.id }
    });

    const post = await Post.findOne();

     await queryInterface.bulkInsert('comments', [
        {
          id: uuidv4(),
          updatedAt: new Date(),
          createdAt: new Date(),
          date: new Date(),
          content: 'Trop nul ton post',
          authorId: author.id,
          postId: post.id,
        },
        {
          id: uuidv4(),
          updatedAt: new Date(),
          createdAt: new Date(),
          date: new Date(),
          content: 'Tous des pourris',
          authorId: author.id,
          postId: post.id,
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
