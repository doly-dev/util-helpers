import {
  expect
} from 'chai';

import isSocialCreditCode from '../../src/isSocialCreditCode'

describe('isSocialCreditCode', () => {
  it('非字符串 => false', () => {
    expect(isSocialCreditCode(true)).to.be.equal(false);
    expect(isSocialCreditCode(123)).to.be.equal(false);
  });
  it('"91350100M000100Y4A3" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y4A3')).to.be.equal(true);
  });
  it('"91350100M000100Y4AB" => false', () => {
    expect(isSocialCreditCode('91350100M000100Y4AB')).to.be.equal(false);
  });
  it('宽松模式，"91350100M000100Y4AB" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y4AB', { loose: true })).to.be.equal(true);
  });
})