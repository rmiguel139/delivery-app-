const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorHandlerMiddleware = require('../middleware/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoutes');
const registerRoute = require('../routes/registerRoutes');
const customerRoute = require('../routes/customerRoutes');
const userRoute = require('../routes/userRoutes');
const sellerRoute = require('../routes/sellerRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', userRoute);

app.use('/register', registerRoute);

app.use('/customer', customerRoute);

app.use('/seller', sellerRoute);

app.use('/images', express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandlerMiddleware);

module.exports = app;
