const { test } = require('./utils');

module.exports = eva => {
  test(eva, [
    'begin',
    ['var', 'x', 9],
    ['var', 'y', 10],
    ['*', 'x', 'y'],
  ], 90, "Value of block is last expression in the block.")
  test(eva,
    ['begin',
      ['var', 'x', 9],
      ['begin',
        ['var', 'x', 10],
        'x'
      ],
      'x'
    ], 9, "Declaration in inner block should not inferre with outher block")
};

