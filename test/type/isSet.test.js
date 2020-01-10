import {
  expect
} from 'chai';

import isSet from '../../src/utils/type/isSet'

describe('isSet', () => {
  it('new Set => true', () => {
    expect(isSet(new Set)).to.be.equal(true);
  });
  it('new WeakSet => false', () => {
    expect(isSet(new WeakSet)).to.be.equal(false);
  });
})