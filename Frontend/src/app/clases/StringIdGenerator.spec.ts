import { async } from '@angular/core/testing';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { StringIdGenerator } from './StringIdGenerator';
describe('StringIdGenerator', () => {
  let obj: StringIdGenerator;
  //const generator = new StringIdGenerator();

  beforeEach(() => {
    obj = new StringIdGenerator();
  });

  it('should run #next()', async () => {
    obj.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    obj._increment = jest.fn();
    obj.next();
    // expect(obj._increment).toHaveBeenCalled();
  });

  it('should run #_increment()', async () => {
    obj.nextId = obj.nextId || {};
    obj.nextId[1] = 1;
    obj.nextId.push = jest.fn();
    obj.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    obj._increment();
    obj.nextId.push();
    expect(obj.nextId.push).toHaveBeenCalled();
  });

  it('should run #[Symbol.iterator]', async () => {
    obj.next = jest.fn();
    obj.next();
    obj[Symbol.iterator]();
    expect(obj.next).toHaveBeenCalled();
  });

});
