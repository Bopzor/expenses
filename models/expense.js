'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    cost: DataTypes.FLOAT,
    buyer: DataTypes.ENUM('Nils', 'Vio'),
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
  };
  return Expense;
};