'use strict';

const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const author = await User.findOne();

     await queryInterface.bulkInsert('posts', [
        {
          id: uuidv4(),
          updatedAt: new Date(),
          createdAt: new Date(),
          date: new Date(),
          title: 'Awesome post 1',
          content: 'Lorem ipsum',
          authorId: author.id,
        },
        {
          id: uuidv4(),
          updatedAt: new Date(),
          createdAt: new Date(),
          date: new Date(),
          title: 'Awesome post 2',
          content: 'Ipsum Lorem',
          authorId: author.id,
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
