const Eva = require('../eva');

const tests = [
  require('./self-evaluated.js'),
  require('./built-in-functions.js'),
  require('./variables.js'),
  require('./blocks.js'),
  require('./if-expression.js')
];
try {
  const eva = new Eva();
  tests.forEach(test => test(eva));
  console.log('All assertions passed!')
}
catch (err) {
  console.error(err);
}

