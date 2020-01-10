import {
  expect
} from 'chai';

import isError from '../../src/utils/type/isError'

describe('isError', () => {
  it('new Error => true', () => {
    expect(isError(new Error)).to.be.equal(true);
  });
  it('Error => false', () => {
    expect(isError(Error)).to.be.equal(false);
  });
})