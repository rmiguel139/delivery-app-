const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
  },
  sellerId: {
    type: Sequelize.INTEGER,
    field: 'seller_id',
  },
  totalPrice: {
    type: Sequelize.DECIMAL(9, 2),
    field: 'total_price',
  },
  deliveryAddress: {
    type: Sequelize.STRING,
    field: 'delivery_address',
  },
  deliveryNumber: {
    type: Sequelize.STRING,
    field: 'delivery_number',
  },
  saleDate: {
    type: Sequelize.DATE,
    field: 'sale_date',
    defaultValue: Sequelize.NOW,
  },
  status: {
    type: Sequelize.STRING,
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Sale = sequelize.define('Sales', attributes, {
    tableName: 'sales',
    timestamps: false,
  });
  Sale.associate = (models) => {
    Sale.belongsTo(models.Users, { foreignKey: 'userId', as: 'saleUserId' });
    Sale.belongsTo(models.Users, { foreignKey: 'sellerId', as: 'saleSellerId' });
  };
  return Sale;
};