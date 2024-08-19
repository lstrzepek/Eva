const assert = require('assert');

function test(eva, expr, expected) {
  assert.strictEqual(eva.eval(expr), expected);
}

module.exports = {test}
