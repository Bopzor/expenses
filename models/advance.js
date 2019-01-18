'use strict';
module.exports = (sequelize, DataTypes) => {
  const Advance = sequelize.define('Advance', {
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    cost: DataTypes.INTEGER,
    buyer: DataTypes.ENUM('Nils', 'Vio'),
  }, {});
  Advance.associate = function (models) {
    // associations can be defined here
  };
  return Advance;
};