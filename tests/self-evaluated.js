const {test} = require('./utils');

module.exports = eva => {
  test(eva, 5, 5)
  test(eva, '"Hello"', 'Hello');
};

