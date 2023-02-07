const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const User = sequelize.define('Users', attributes, {
    tableName: 'users',
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.Sales, { foreignKey: 'userId', as: 'salesUser' });
    User.hasMany(models.Sales, { foreignKey: 'sellerId', as: 'salesSeller' });
  };
  return User;
};