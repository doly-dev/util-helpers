import {
  expect
} from 'chai';

import isBankCard from '../../src/isBankCard'

describe('isBankCard', () => {
  it('非字符串 => false', () => {
    expect(isBankCard(true)).to.be.equal(false);
    expect(isBankCard(123)).to.be.equal(false);
  });
  it('"6228480402564890018" => true', () => {
    expect(isBankCard('6228480402564890018')).to.be.equal(true);
  });
  it('"6228480402564890" => true', () => {
    expect(isBankCard('6228480402564890')).to.be.equal(true);
  });
  it('"123456789" => false', () => {
    expect(isBankCard('123456789')).to.be.equal(false);
  });
  it('宽松模式 "123456789" => true', () => {
    expect(isBankCard('123456789', { loose: true })).to.be.equal(true);
  });
  it('宽松模式 "123456789012345678901234567890" => true', () => {
    expect(isBankCard('123456789012345678901234567890', { loose: true })).to.be.equal(true);
  });
  it('宽松模式 "1234567890123456789012345678901" => false', () => {
    expect(isBankCard('1234567890123456789012345678901', { loose: true })).to.be.equal(false);
  });
})