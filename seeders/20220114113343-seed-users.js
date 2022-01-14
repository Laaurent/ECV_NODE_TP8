'use strict';

const { Role } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {


  const admin = await Role.findOne({
    where: { name: 'admin' }
  });
  const user = await Role.findOne({
    where: { name: 'user' }
  });
  const guest = await Role.findOne({
    where: { name: 'guest' }
  });

  const salt = await bcrypt.genSaltSync(10, 'a');

  const adminPassword = bcrypt.hashSync('admin', salt);
  const guestPassword = bcrypt.hashSync('guest', salt);
  const userPassword = bcrypt.hashSync('user', salt);


   await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        firstname: 'Jean-Michel',
        lastname: 'Admin',
        roleId: admin.id,
        email: 'jm@admin.com',
        password: adminPassword,
        github_url: 'https://github.com/jm-admin',
      },
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        firstname: 'Jean-Claude',
        lastname: 'User',
        roleId: user.id,
        email: 'jc@user.com',
        password: userPassword,
        github_url: 'https://github.com/jc-user',
      },
      {
        id: uuidv4(),
        updatedAt: new Date(),
        createdAt: new Date(),
        firstname: 'Jean-Marie',
        lastname: 'Guest',
        roleId: guest.id,
        password: guestPassword,
        email: 'jm@guest.com',
        github_url: 'https://github.com/jm-guest',
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
