const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRoute = Router();

sellerRoute.get('/orders', sellerController.getOrdersBySellerId);
sellerRoute.get('/orders/:id', sellerController.getOrderById);
sellerRoute.get('/orders/prepare/:id', sellerController.prepareStatus);
sellerRoute.get('/orders/dispatch/:id', sellerController.dispatchStatus);

module.exports = sellerRoute;