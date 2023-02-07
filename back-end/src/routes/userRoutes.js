const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.get('/sellers', userController.getSellers);

module.exports = userRoute;
