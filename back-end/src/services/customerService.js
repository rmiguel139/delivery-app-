const Joi = require('joi');
const { Products, Sales, SalesProducts } = require('../database/models');
const { throwUnauthorizedError } = require('./utils');

const customerService = {
  async validateRole(role) {
    if (role !== 'customer') throwUnauthorizedError();
  },

  async statusFinish({ id }) {
    await Sales.update({ status: 'Entregue' }, { where: { id } });
    return { status: 'Entregue' };
  },

  async getAll() {
    const products = await Products.findAll({ raw: true });
    return products;
  },

  async validateBodySale(body) {
    const schema = Joi.object({
      sellerId: Joi.number().required(),
      totalPrice: Joi.number().precision(2).required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      products: Joi.array().required().items(
        Joi.object({
          id: Joi.number().required(),
          quantity: Joi.number().required(),
        }),
      ),
    });
    const data = await schema.validateAsync(body);
    return data;
  },

  async createSale(data) {
    const response = await Sales.create(
      { status: 'Pendente', ...data },
      { raw: true },
    );
    return response.toJSON();
  },

  async createSalesProducts(saleId, data) {
    const obj = data.map(({ id, quantity }) => ({ saleId, productId: id, quantity }));
    await SalesProducts.bulkCreate(obj, { validate: true });
  },

  async validateParamsId(params) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const data = await schema.validateAsync(params);
    return data;
  },

  async getSale({ id }) {
    const response = await Sales.findByPk(id, { raw: true });
    return response;
  },

  async getSalesByUserId({ id }) {
    const response = await Sales.findAll({
      where: { userId: id } },
    {
      raw: true,
      attributes: { exclude: ['userId', 'sellerId', 'deliveryAddress', 'deliveryNumber'] },
    });
    const array = response.map((resp) => resp.toJSON());
    console.log('respo: ', array);
    return array;
  },

  async getProducts(id) {
    const response = await SalesProducts.findAll(
      { where: { saleId: id } }, { raw: true },
    );
    const array = response.map((resp) => resp.toJSON());
    const data = await Promise.all(array.map((item) => (
      Products.findByPk(item.productId,
        { raw: true,
          attributes: { exclude: ['urlImage'] },
        })
    )));
    const products = data.map((each) => {
      const result = array.find((item) => item.productId === each.id).quantity;
      const product = { ...each };
      product.quantity = result;
      product.subTotal = result * each.price;
      return product;
    });
    return products;
  },
};

module.exports = customerService;