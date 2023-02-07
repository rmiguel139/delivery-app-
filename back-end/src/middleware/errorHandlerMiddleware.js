const errors = {
  ValidationError: 400,
  Unauthorized: 401,
  NotFoundError: 404,
  Conflict: 409,
};

/**
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const errorHandlerMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  console.log(err);
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;