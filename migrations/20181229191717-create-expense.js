'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      what: {
        type: Sequelize.STRING,
      },
      when: {
        type: Sequelize.DATEONLY,
      },
      how: {
        type: Sequelize.INTEGER,
      },
      who: {
        type: Sequelize.ENUM('Nils', 'Vio'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Expenses');
  }
};