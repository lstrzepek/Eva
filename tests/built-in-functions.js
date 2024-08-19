const {test} = require('./utils');

module.exports = eva => {
  test(eva, ['+', 3, 2], 5)
  test(eva, ['-', 3, 2], 1)
  test(eva, ['-', 3], -3)
  test(eva, ['*', 3, 2], 6)
  test(eva, ['/', 3, 2], 1.5)
};

