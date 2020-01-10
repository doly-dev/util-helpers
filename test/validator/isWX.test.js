import {
  expect
} from 'chai';

import isWX from '../../src/isWX'

describe('isWX', () => {
  it('非字符串 => false', () => {
    expect(isWX(true)).to.be.equal(false);
    expect(isWX(123)).to.be.equal(false);
  });
  it('"a12345" => true', () => {
    expect(isWX('a12345')).to.be.equal(true);
  });
  it('"1234" => false', () => {
    expect(isWX('1234')).to.be.equal(false);
  });
})