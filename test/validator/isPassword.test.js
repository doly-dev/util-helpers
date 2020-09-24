import {
  expect
} from 'chai';

import isPassword from '../../src/isPassword'

describe('isPassword', () => {
  it('非字符串 => false', () => {
    expect(isPassword(true)).to.be.equal(false);
    expect(isPassword(123)).to.be.equal(false);
  });
  it('1级强度 "1234787" => true', () => {
    expect(isPassword('1234787', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "a1234787" => true', () => {
    expect(isPassword('a1234787', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "ab1234787" => true', () => {
    expect(isPassword('ab1234787', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "1a234787" => true', () => {
    expect(isPassword('1a234787', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "a1_234787" => true', () => {
    expect(isPassword('a1_234787', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "abc" => true', () => {
    expect(isPassword('abc', {level: 1})).to.be.equal(true);
  });
  it('1级强度 "*_ )" => false', () => {
    expect(isPassword('*_ )', {level: 1})).to.be.equal(false);
  });
  it('1级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`" => true', () => {
    expect(isPassword('!@#$%^&*()-=_+[]\|{},./?<>~`', {level: 1})).to.be.equal(true);
  });
  it('2级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`" => false', () => {
    expect(isPassword('!@#$%^&*()-=_+[]\|{},./?<>~`', {level: 2})).to.be.equal(false);
  });

  it('2级强度 "a12345678" => true', () => {
    expect(isPassword('a12345678')).to.be.equal(true);
  });
  it('2级强度 "a1_234787" => true', () => {
    expect(isPassword('a1_234787')).to.be.equal(true);
  });
  it('2级强度 "aa_234787" => true', () => {
    expect(isPassword('aa_234787')).to.be.equal(true);
  });

  it('3级强度 "a12345678" => false', () => {
    expect(isPassword('a12345678', { level: 3 })).to.be.equal(false);
  });
  it('3级强度 "Aa12345678" => true', () => {
    expect(isPassword('Aa12345678', { level: 3 })).to.be.equal(true);
  });
  it('3级强度，忽略大小写 "Aa12345678" => false', () => {
    expect(isPassword('Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(false);
  });
  it('3级强度，忽略大小写 "_Aa12345678" => true', () => {
    expect(isPassword('_Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(true);
  });
  it('3级强度，忽略大小写 " _Aa12345678" => false', () => {
    expect(isPassword(' _Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(false);
  });
  it('3级强度，忽略大小写 "_Aa一二三45678" => false', () => {
    expect(isPassword('_Aa一二三45678', { level: 3, ignoreCase: true })).to.be.equal(false);
  });
})