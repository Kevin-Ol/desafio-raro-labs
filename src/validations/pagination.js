const errorTypes = require('../utils/errorTypes');

module.exports = ({ current, total }) => {
  if (!current || !total) {
    return { error: errorTypes.missingParams };
  }

  const currentNumber = parseInt(current);
  const totalNumber = parseInt(total);

  if (isNaN(currentNumber) || isNaN(totalNumber) || currentNumber < 0) {
    return { error: errorTypes.notNumber };
  };

  if (totalNumber < currentNumber) {
    return { error: errorTypes.invalidTotal };
  };

  return { currentNumber, totalNumber };
};
