'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deck', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      card_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'cards',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      index: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('decks');
  }
};