import {
  expect
} from 'chai';

import isTelephone from '../../src/isTelephone'


describe('isTelephone', () => {
  it('非字符串', () => {
    expect(isTelephone(true)).to.be.equal(false);
    expect(isTelephone(123)).to.be.equal(false);
  });
  it('"22033212" => true', () => {
    expect(isTelephone('22033212')).to.be.equal(true);
  });
  it('"021-22033212" => true', () => {
    expect(isTelephone('021-22033212')).to.be.equal(true);
  });
  it('"021-22033212-123" => true', () => {
    expect(isTelephone('021-22033212-123')).to.be.equal(true);
  });
  it('"13000000000" => false', () => {
    expect(isTelephone('13000000000')).to.be.equal(false);
  });
})