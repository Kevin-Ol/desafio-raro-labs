const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const validatePagination = require('../validations/pagination');
const paginationService = require('../services/pagination');

module.exports = (req, res, next) => {
  const { current, total } = req.query;

  const { error, currentNumber, totalNumber } = validatePagination({ current, total });

  if (error) {
    return next(error);
  };

  const pagination = paginationService(currentNumber, totalNumber);
  const uuid = uuidv4();
  
  return res.status(StatusCodes.OK).json({ uuid, pagination });
};
