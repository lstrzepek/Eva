const { resolve } = require("path");

class Environment {
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
  }

  define(name, value) {

    this.record[name] = value;
    //console.log(value)
    return value;
  }

  lookup(name) {
    return this.resolve(name).record[name];
  }

  assign(name, value) {
    this.resolve(name).record[name] = value;
    return value;
  }


  resolve(name) {
    if (this.record.hasOwnProperty(name)) {
      return this
    }
    else {
      if (this.parent === null) {
        throw new ReferenceError(`Variable "${name}" is not defined.`);
      }
      return this.parent.resolve(name);
    }
  }
}

module.exports = Environment
