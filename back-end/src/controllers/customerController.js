const customerService = require('../services/customerService');
const loginService = require('../services/loginService');
const userService = require('../services/userService');
const { formatDate } = require('../services/utils');

const customerController = {
  async getAll(req, res) {
    const token = await loginService.validateToken(req.headers);
    await loginService.readToken(token);
    const products = await customerService.getAll();
    res.json(products);
  },

  async createSale(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    const user = await userService.getByEmailOrThrows(email);
    const data = await customerService.validateBodySale(req.body);
    const { products, ...sale } = data;
    const { id } = await customerService.createSale({ userId: user.id, ...sale });
    await customerService.createSalesProducts(id, products);
    res.status(201).json({ saleId: id });
  },

  async finishStatus(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { role, email } } = payload;
    await userService.getByEmailOrThrows(email);
    customerService.validateRole(role);
    const data = await customerService.validateParamsId(req.params);
    const sale = await customerService.getSale(data);
    const response = await customerService.statusFinish(sale);
    res.json(response);
  },

  async getOrderById(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    await userService.getByEmailOrThrows(email);
    const data = await customerService.validateParamsId(req.params);
    const { sellerId, totalPrice, status, saleDate, id } = await customerService.getSale(data);
    const sellerName = await userService.getName(sellerId);
    const products = await customerService.getProducts(id);
    const objResponse = {
      id,
      sellerName,
      totalPrice,
      status,
      saleDate: formatDate(saleDate),
      products,    
    };
    res.json(objResponse);
  },

  async getOrdersByUserId(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    const user = await userService.getByEmailOrThrows(email);
    const array = await customerService.getSalesByUserId(user);
    const response = array.map((each) => ({
      id: each.id,
      totalPrice: each.totalPrice,
      saleDate: formatDate(each.saleDate), 
      status: each.status,
    }));
    res.json(response);
  },
};

module.exports = customerController;
