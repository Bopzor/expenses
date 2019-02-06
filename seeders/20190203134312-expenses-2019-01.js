'use strict';

const expenses = require('../parseCSV.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(`inserting ${expenses.length} expenses`);
    return queryInterface.bulkInsert('Expenses', expenses, {})
      .catch(console.log);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Expenses', null, {})
      .catch(console.log);
  },
};