const sellerService = require('../services/sellerService');
const loginService = require('../services/loginService');
const userService = require('../services/userService');
const { formatDate } = require('../services/utils');

const sellerController = {
  async prepareStatus(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { role, email } } = payload;
    await userService.getByEmailOrThrows(email);
    sellerService.validateRole(role);
    const data = await sellerService.validateParamsId(req.params);
    const sale = await sellerService.getSale(data);
    const response = await sellerService.statusPrepare(sale);
    res.json(response);
  },

  async dispatchStatus(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { role, email } } = payload;
    await userService.getByEmailOrThrows(email);
    sellerService.validateRole(role);
    const data = await sellerService.validateParamsId(req.params);
    const sale = await sellerService.getSale(data);
    const response = await sellerService.statusDispatch(sale);
    res.json(response);
  },

  async getOrdersBySellerId(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    const seller = await userService.getByEmailOrThrows(email);
    const array = await sellerService.getSalesBySellerId(seller);
    const response = array.map((each) => ({
      id: each.id,
      totalPrice: each.totalPrice,
      saleDate: formatDate(each.saleDate), 
      status: each.status,
      deliveryAddress: each.deliveryAddress,
      deliveryNumber: each.deliveryNumber,
    }));
    res.json(response);
  },

  async getOrderById(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    await userService.getByEmailOrThrows(email);
    const data = await sellerService.validateParamsId(req.params);
    const { totalPrice, status, saleDate, id } = await sellerService.getSale(data);
    const products = await sellerService.getProducts(id);
    const objResponse = {
      id,
      totalPrice,
      status,
      saleDate: formatDate(saleDate),
      products,    
    };
    res.json(objResponse);
  },
};

module.exports = sellerController;
