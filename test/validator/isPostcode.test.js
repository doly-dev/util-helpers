import {
  expect
} from 'chai';

import isPostcode from '../../src/isPostcode'


describe('isPostcode', () => {
  it('非字符串', () => {
    expect(isPostcode(true)).to.be.equal(false);
    expect(isPostcode(123)).to.be.equal(false);
  });
  it('"101111" => true', () => {
    expect(isPostcode('101111')).to.be.equal(true);
  });
  it('"123" => false', () => {
    expect(isPostcode('123')).to.be.equal(false);
  });
})