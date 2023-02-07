const Joi = require('joi');
const { Sales, SalesProducts, Products } = require('../database/models');
const { throwUnauthorizedError } = require('./utils');

const sellerService = {
  async validateRole(role) {
    if (role !== 'seller') throwUnauthorizedError();
  },

  async statusPrepare({ id }) {
    await Sales.update({ status: 'Preparando' }, { where: { id } });
    return { status: 'Preparando' };
  },

  async statusDispatch({ id }) {
    await Sales.update({ status: 'Em Trânsito' }, { where: { id } });
    return { status: 'Em Trânsito' };
  },

  async validateParamsId(params) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const data = await schema.validateAsync(params);
    return data;
  },

  async getSalesBySellerId({ id }) {
    const response = await Sales.findAll({
      where: { sellerId: id } },
    {
      raw: true,
      attributes: { exclude: ['userId', 'sellerId'] },
    });
    const array = response.map((resp) => resp.toJSON());
    return array;
  },

  async getSale({ id }) {
    const response = await Sales.findByPk(id, { raw: true });
    return response;
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

module.exports = sellerService;