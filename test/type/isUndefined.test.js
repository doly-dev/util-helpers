import {
  expect
} from 'chai';

import isUndefined from '../../src/utils/type/isUndefined'

describe('isUndefined', () => {
  it('undefined => true', () => {
    expect(isUndefined(undefined)).to.be.equal(true);
  });
  it('void 0 => true', () => {
    expect(isUndefined(void 0)).to.be.equal(true);
  });
  it('null => false', () => {
    expect(isUndefined(null)).to.be.equal(false);
  });
})