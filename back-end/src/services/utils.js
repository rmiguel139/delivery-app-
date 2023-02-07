const formatDate = (date) => {
  const dd = (`0${date.getDate()}`).slice(-2);
  const mm = (`0${date.getMonth() + 1}`).slice(-2);
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const throwValidationError = (message = 'Erro de validação') => {
  const err = new Error(message);
  err.name = 'ValidationError';
  throw err;
};

const throwConflictError = (message = 'Conflict') => {
  const err = new Error(message);
  err.name = 'Conflict';
  throw err;
};

const throwUnauthorizedError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'Unauthorized';
  throw err;
};

const throwNotFoundError = (message = 'Not found') => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

module.exports = {
  throwValidationError,
  throwConflictError,
  throwUnauthorizedError,
  throwNotFoundError,
  formatDate,
};