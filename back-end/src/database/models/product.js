const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.DECIMAL },
  urlImage: {
    type: Sequelize.STRING,
    field: 'url_Image',
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Product = sequelize.define('Products', attributes, {
    tableName: 'products',
    timestamps: false,
  });
  return Product;
};