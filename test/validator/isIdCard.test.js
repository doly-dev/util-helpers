import {
  expect
} from 'chai';

import isIdCard from '../../src/isIdCard'


describe('isIdCard', () => {
  it('非字符串', () => {
    expect(isIdCard(true)).to.be.equal(false);
    expect(isIdCard(123)).to.be.equal(false);
  });
  it('"320311770706001" => true', () => {
    expect(isIdCard('320311770706001')).to.be.equal(true);
  });
  it('"130701199310302288" => true', () => {
    expect(isIdCard('130701199310302288')).to.be.equal(true);
  });
  it('"130701199310" => false', () => {
    expect(isIdCard('130701199310')).to.be.equal(false);
  });
})