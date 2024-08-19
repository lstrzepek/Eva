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
    if (Object.getOwnPropertyDescriptor(this.record, name) === undefined){
      if(this.parent !== null){
        return this.parent.lookup(name);
      }
      throw `Variable "${name}" is undefined in current scope`;
    }
    return this.record[name];
  }
}

module.exports = Environment
