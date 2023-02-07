'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      saleId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sale_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id',
        },
      },
      productId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: { type: Sequelize.INTEGER },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};