'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    what: DataTypes.STRING,
    when: DataTypes.DATEONLY,
    how: DataTypes.INTEGER,
    who: DataTypes.ENUM('Nils', 'Vio'),
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
  };
  return Expense;
};