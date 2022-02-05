const { StatusCodes } = require('http-status-codes');

module.exports = {
  missingParams: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Missing current or total parameters',
  },
  notNumber: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Current and total pages must be numbers greater than zero',
  },
  invalidTotal: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Total page must be greater or equal to current page',
  },
};
