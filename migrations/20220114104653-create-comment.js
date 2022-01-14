'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      content: {
        type: Sequelize.STRING
      },
      authorId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id',
        }
      },
      date: {
        type: Sequelize.DATE
      },
      postId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'posts'
          },
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
