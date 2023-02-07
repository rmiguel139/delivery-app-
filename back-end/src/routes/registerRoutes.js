const { Router } = require('express');
const registerController = require('../controllers/registerController');

const registerRoute = Router();

registerRoute.post('/', registerController.register);

module.exports = registerRoute;
