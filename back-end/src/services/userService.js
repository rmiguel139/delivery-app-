const { Users } = require('../database/models');
const { throwNotFoundError } = require('./utils');

const userService = {
  async getSellers() {
    const data = Users.findAll({
      where: { role: 'seller' },
      attributes: { exclude: ['password', 'email', 'role'] },
      raw: true,      
    });
    return data;
  },
  async getByEmailOrThrows(email) {
    const user = await Users.findOne({
      where: { email },
      raw: true,
    });
    if (!user) throwNotFoundError();
    return user;
  },
  async getName(id) {
    const response = await Users.findByPk(id, {
      raw: true,
      attributes: { exclude: ['id', 'email', 'password', 'role'] },
    });
    return response.name;
  },
};

module.exports = userService;
