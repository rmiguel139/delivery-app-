const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const md5 = require('md5');
const fs = require('fs');
const { Users } = require('../database/models');
const { throwNotFoundError, throwUnauthorizedError } = require('./utils');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const loginService = {
  async validateBodyLogin(body) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6),
    });
    const data = await schema.validateAsync(body);
    return data;
  },
  async validateToken(headers) {
    const { authorization } = headers;
    if (!authorization) throwUnauthorizedError('Token not found');
    let token = '';
    if (authorization.split(' ').length > 1) [, token] = authorization.split(' ');
    else token = authorization;
    return token;
  },
  async makeToken(data) {
    const token = Jwt.sign({ data }, secret, { algorithm: 'HS256', expiresIn: '20d' });
    return token;
  },
  async readToken(token) {
    try {
      const { data } = Jwt.verify(token, secret);
      return data;
    } catch (error) {
      throwUnauthorizedError('Expired or invalid token');
    }
  },
  async getByUserOrThrows(data) {
    const { email, password } = data;
    const user = await Users.findOne({
      where: { email },
      raw: true,
    });
    if (!user) throwNotFoundError();
    if (md5(password) !== user.password) throwNotFoundError();
    return user;
  },
};

module.exports = loginService;
