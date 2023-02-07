const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateBodyLogin(req.body);
    const user = await loginService.getByUserOrThrows(data);
    const { password, id, ...dataUser } = user;
    const token = await loginService.makeToken({ user });
    res.json({ ...dataUser, token });
  },
};

module.exports = loginController;
