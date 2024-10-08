const Environment = require('./Environment');
//import assert from 'assert';

/**
 * Expr :|
 *       | Number
 *       | String
 *       | [ +, Expr, Expr ]
 *
 *
 */
class Eva {
  constructor(env = GlobalEnvironment) {
    this.globalEnv = env;
  }

  eval(expr, env = this.globalEnv) {
    // Self-evaluation expressions
    if (this._isNumber(expr)) {
      return expr;
    }

    if (this._isString(expr)) {
      return expr.slice(1, -1);
    }

    // Variable declaration:
    // ['var', 'x', 10]
    if (expr[0] === 'var') {
      const [_, name, value] = expr;
      return env.define(name, this.eval(value, env));
    }
    // Variable assignment:
    // ['set', 'x', 100]
    if (expr[0] === 'set') {
      const [_, name, value] = expr;
      return env.assign(name, value);
    }
    // Blocks
    // ['begin',
    //    ['var', 'x', 4],
    //    ['var', 'y', 6],
    //    ['*', 'x', 'y']
    //  ]
    if (expr[0] === 'begin') {
      const newEnv = new Environment({}, env);
      return this._evalBlock(expr, newEnv);
    }
    // if expressions
    // ['if', ['>','x',5],['-', 'x',2]]
    if (expr[0] === 'if') {
      const [_, predicate, body] = expr;
      if (this.eval(predicate, env) === true) {
        const newEnv = new Environment({}, env);
        return this._evalBlock(body, newEnv);
      }
      return false;
    }
    // Variable lookup
    if (this._isVariableName(expr, env)) {
      return env.lookup(expr);
    }
    // Function calls
    if (Array.isArray(expr)) {
      const fn = this.eval(expr[0], env);
      const args = expr.slice(1).map(a => this.eval(a, env));
      if (typeof fn === 'function') {
        return fn(...args)
      }
    }
    throw `Unimplemented: ${JSON.stringify(expr)}`;
  }

  _isNumber(expr) {
    return typeof expr === 'number';
  }
  _isString(expr) {
    return typeof expr === 'string' && expr[0] === '"' && expr.slice(-1) === '"';
  }
  _isVariableName(expr) {
    return typeof expr === 'string' //TODO: Add regexp
  }
  _evalBlock(expr, env) {
    let result;
    const [_, ...body] = expr;
    body.forEach(e => {
      result = this.eval(e, env);
    });
    return result;
  }
}

var GlobalEnvironment = new Environment({
  "true": true,
  "false": false,
  '+'(op1, op2) {
    return op1 + op2;
  },
  '-'(op1, op2 = null) {
    if (op2 === null) {
      return -op1;
    }
    return op1 - op2;
  },
  '*'(op1, op2) {
    return op1 * op2;
  },
  '/'(op1, op2) {
    return op1 / op2;
  },
  '>'(op1, op2) {
    return op1 > op2;
  },
  '<'(op1, op2) {
    return op1 < op2;
  },
  '>='(op1, op2) {
    return op1 >= op2;
  },
  '<='(op1, op2) {
    return op1 <= op2;
  },
})

//
//const eva = new Eva();
//assert.strictEqual(eva.eval(5), 5);
//assert.strictEqual(eva.eval('"Hello"'), 'Hello');
//assert.strictEqual(eva.eval(['+', 3, 2]), 5);
//assert.strictEqual(eva.eval(['+', ['+', 10, 2], 5]), 17);
//
//assert.strictEqual(eva.eval(['var', 'x', 10]), 10);
//assert.strictEqual(eva.eval('x'), 10);
//assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true);
//assert.strictEqual(eva.eval('isUser'), true);
//console.log('All assertions passed!');

module.exports = Eva;
