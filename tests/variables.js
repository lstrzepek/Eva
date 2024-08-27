const { test } = require('./utils');

module.exports = eva => {
  test(eva, ['var', 'x', 2], 2)
  test(eva, 'x', 2)
  test(eva, ['var', 'x', ['*', 2, 3]], 6)
  test(eva, ['set', 'x', 10], 10)
  test(eva, 'x', 10)
};

