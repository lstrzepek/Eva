export class Environment {
  constructor(record = {}) {
    this.record = record;
  }

  define(name, value) {
    this.record[name] = value;
    return value;
  }

  lookup(name) {
    if (Object.getOwnPropertyDescriptor(this.record, name) === undefined)
      throw $`Variable ${name} is undefined in current scope`;
    return this.record[name];
  }
}
