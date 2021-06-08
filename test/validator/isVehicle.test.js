import {
  expect
} from 'chai';

import isVehicle from '../../src/isVehicle'


describe('isVehicle', () => {
  it('非字符串', () => {
    expect(isVehicle(true)).to.be.equal(false);
    expect(isVehicle(123)).to.be.equal(false);
  });
  it('"BL12345" => true', () => {
    expect(isVehicle('京L12345')).to.be.equal(true);
  });
  it('"BL1234警" => true', () => {
    expect(isVehicle('京L12345')).to.be.equal(true);
  });
  it('"京L1234领" => true', () => {
    expect(isVehicle('京L12345')).to.be.equal(true);
  });
  it('"京L12345" => true', () => {
    expect(isVehicle('京L12345')).to.be.equal(true);
  });
  it('"粤BD12345" => true', () => {
    expect(isVehicle('粤BD12345')).to.be.equal(true);
  });
  it('"粤BF12345" => true', () => {
    expect(isVehicle('粤BF12345')).to.be.equal(true);
  });
  it('"粤B12345D" => true', () => {
    expect(isVehicle('粤B12345D')).to.be.equal(true);
  });
  it('"粤B12345F" => true', () => {
    expect(isVehicle('粤B12345F')).to.be.equal(true);
  });
})