const loginService = require('../services/loginService');
const registerService = require('../services/registerService');

const registerController = {
  async register(req, res) {
    const data = await registerService.validateBodyRegister(req.body);
    await registerService.getByUserOrThrows(data);
    const user = await registerService.createUser(data);
    const { password, id, ...dataUser } = user;
    const token = await loginService.makeToken({ user });
    res.status(201).json({ ...dataUser, token });
  },
};

module.exports = registerController;