'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('roles', [
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        name: 'admin',
      },
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        name: 'guest',
      },
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        name: 'user',
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
