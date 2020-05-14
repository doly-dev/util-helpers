import {
  expect
} from 'chai';

import isBusinessLicense from '../../src/isBusinessLicense'

describe('isBusinessLicense', () => {
  it('非字符串 => false', () => {
    expect(isBusinessLicense(true)).to.be.equal(false);
    expect(isBusinessLicense(123)).to.be.equal(false);
  });
  it('"310115600985533" => true', () => {
    expect(isBusinessLicense('310115600985533')).to.be.equal(true);
  });
  it('"310115600985" => false', () => {
    expect(isBusinessLicense('310115600985')).to.be.equal(false);
  });
  it('宽松模式，"310115600985" => false', () => {
    expect(isBusinessLicense('310115600985', { loose: true })).to.be.equal(false);
  });
  it('"310115600985535" => false', () => {
    expect(isBusinessLicense('310115600985535')).to.be.equal(false);
  });
  it('宽松模式，"310115600985535" => true', () => {
    expect(isBusinessLicense('310115600985535', { loose: true })).to.be.equal(true);
  });
})