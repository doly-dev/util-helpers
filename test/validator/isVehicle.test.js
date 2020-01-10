import {
  expect
} from 'chai';

import isVehicle from '../../src/isVehicle'


describe('isVehicle', () => {
  it('非字符串 => false', () => {
    expect(isVehicle(true)).to.be.equal(false);
    expect(isVehicle(123)).to.be.equal(false);
  });
  it('"京L88888" => true', () => {
    expect(isVehicle('京L88888')).to.be.equal(true);
  });
  it('"333333" => false', () => {
    expect(isVehicle('333333')).to.be.equal(false);
  });
})