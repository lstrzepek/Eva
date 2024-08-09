import assert from 'assert';
import { Environment } from './environment.mjs';

const global = new Environment({
  "true": true,
  "false": false
});
class Eva {

  eval(expr, env = global) {
    // Self-evaluation expressions
    if (isNumber(expr)) {
      return expr;
    }

    if (isString(expr)) {
      return expr.slice(1, -1);
    }

    // Math operations
    if (expr[0] === '+') {
      return this.eval(expr[1], env) + this.eval(expr[2], env);
    }
    // Variable assignment
    if (expr[0] === 'var') {
      const [_, name, value] = expr;
      return env.define(name, eval(value, env));
    }
    // Variable lookup
    if (isVariableName(expr, env)) {
      return env.lookup(expr);
    }

    throw `Unimplemented: ${JSON.stringify(expr)}`;
  }

}

function isNumber(expr) {
  return typeof expr === 'number';
}
function isString(expr) {
  return typeof expr === 'string' && expr[0] === '"' && expr.slice(-1) === '"';
}
function isVariableName(expr, env) {
  return typeof expr === 'string' //TODO: Add regexp
}

const eva = new Eva();
assert.strictEqual(eva.eval(5), 5);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval(['+', 3, 2]), 5);
assert.strictEqual(eva.eval(['+', ['+', 10, 2], 5]), 17);

assert.strictEqual(eva.eval(['var', 'x', 10]), 10);
assert.strictEqual(eva.eval('x'), 10);
assert.strictEqual(eva.eval(['var', 'x', 'true']), true);
console.log('All assertions passed!');
