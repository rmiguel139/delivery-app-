const { Router } = require('express');
const customerController = require('../controllers/customerController');

const customerRoute = Router();

customerRoute.post('/checkout', customerController.createSale);
customerRoute.get('/products', customerController.getAll);
customerRoute.get('/orders', customerController.getOrdersByUserId);
customerRoute.get('/orders/:id', customerController.getOrderById);
customerRoute.get('/orders/finish/:id', customerController.finishStatus);

module.exports = customerRoute;