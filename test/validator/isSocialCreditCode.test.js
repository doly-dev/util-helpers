import {
  expect
} from 'chai';

import isSocialCreditCode from '../../src/isSocialCreditCode'

describe('isSocialCreditCode', () => {
  it('非字符串 => false', () => {
    expect(isSocialCreditCode(true)).to.be.equal(false);
    expect(isSocialCreditCode(123)).to.be.equal(false);
  });
  it('"92310115MA1LAG5R9M" => true', () => {
    expect(isSocialCreditCode('92310115MA1LAG5R9M')).to.be.equal(true);
  });
  it('"91350100M000100Y43" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y43')).to.be.equal(true);
  });
  it('"91350100M0001" => false', () => {
    expect(isSocialCreditCode('91350100M0001')).to.be.equal(false);
  });
  it('"91350100M000100Y4A" => false', () => {
    expect(isSocialCreditCode('91350100M000100Y4A')).to.be.equal(false);
  });
  it('宽松模式，"91350100M000100Y4AB" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y4A', { loose: true })).to.be.equal(true);
  });
})