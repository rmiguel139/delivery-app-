const userService = require('../services/userService');

const userController = {
  async getSellers(_req, res) {
    const sellers = await userService.getSellers();
    res.json(sellers);
  },
};

module.exports = userController;
