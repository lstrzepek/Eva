const { test } = require('./utils');

module.exports = eva => {
  test(eva,
    ['begin',
      ['var', 'value', 5],
      ['var', 'x', 1],
      ['if', ['>', 'value', 2],
        ['begin',
          ['set', 'x', 9],
        ]]], 9, "Value of if block is last expression in the block.")
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

