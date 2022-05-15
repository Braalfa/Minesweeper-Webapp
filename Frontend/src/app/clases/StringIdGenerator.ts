export class StringIdGenerator {

    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    nextId = [0]

    constructor() {
    }
  
    next() {
      const r = [];
      for (const char of this.nextId) {
        r.unshift(this.chars[char]);
      }
      this._increment();
      return r.join('');
    }
  
    _increment() {
      for (let i = 0; i < this.nextId.length; i++) {
        const val = ++this.nextId[i];
        if (val >= this.chars.length) {
          this.nextId[i] = 0;
        } else {
          return;
        }
      }
      this.nextId.push(0);
    }
  
    *[Symbol.iterator]() {
      while (true) {
        yield this.next();
      }
    }
  }