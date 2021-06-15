import { isPassword } from '../../src'

describe('isPassword', () => {
  it('should be defined', () => {
    expect(isPassword).toBeDefined();
  });

  it('非字符串', () => {
    expect(isPassword(true)).toBe(false);
    expect(isPassword(123)).toBe(false);
  });
  it('1级强度 "1234787" => true', () => {
    expect(isPassword('1234787', { level: 1 })).toBe(true);
  });
  it('1级强度 "a1234787" => true', () => {
    expect(isPassword('a1234787', { level: 1 })).toBe(true);
  });
  it('1级强度 "ab1234787" => true', () => {
    expect(isPassword('ab1234787', { level: 1 })).toBe(true);
  });
  it('1级强度 "1a234787" => true', () => {
    expect(isPassword('1a234787', { level: 1 })).toBe(true);
  });
  it('1级强度 "a1_234787" => true', () => {
    expect(isPassword('a1_234787', { level: 1 })).toBe(true);
  });
  it('1级强度 "abc" => true', () => {
    expect(isPassword('abc', { level: 1 })).toBe(true);
  });
  it('1级强度 "*_ )" => false', () => {
    expect(isPassword('*_ )', { level: 1 })).toBe(false);
  });
  it('1级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`" => true', () => {
    expect(isPassword('!@#$%^&*()-=_+[]\|{},./?<>~`', { level: 1 })).toBe(true);
  });
  it('2级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`" => false', () => {
    expect(isPassword('!@#$%^&*()-=_+[]\|{},./?<>~`', { level: 2 })).toBe(false);
  });

  it('2级强度 "a12345678" => true', () => {
    expect(isPassword('a12345678')).toBe(true);
  });
  it('2级强度 "a1_234787" => true', () => {
    expect(isPassword('a1_234787')).toBe(true);
  });
  it('2级强度 "aa_234787" => true', () => {
    expect(isPassword('aa_234787')).toBe(true);
  });

  it('3级强度 "a12345678" => false', () => {
    expect(isPassword('a12345678', { level: 3 })).toBe(false);
  });
  it('3级强度，不忽略大小写 "Aa12345678" => true', () => {
    expect(isPassword('Aa12345678', { level: 3 })).toBe(true);
  });
  it('3级强度，忽略大小写 "Aa12345678" => false', () => {
    expect(isPassword('Aa12345678', { level: 3, ignoreCase: true })).toBe(false);
  });
  it('3级强度，忽略大小写 "_Aa12345678" => true', () => {
    expect(isPassword('_Aa12345678', { level: 3, ignoreCase: true })).toBe(true);
  });
  it('3级强度，非法字符 " _Aa12345678" => false', () => {
    expect(isPassword(' _Aa12345678', { level: 3, ignoreCase: true })).toBe(false);
  });
  it('3级强度，非法字符 "_Aa一二三45678" => false', () => {
    expect(isPassword('_Aa一二三45678', { level: 3, ignoreCase: true })).toBe(false);
  });

  it('3级强度，自定义特殊字符1', () => {
    expect(isPassword('_Aa一二三45678', { level: 3, ignoreCase: true, special: '_一二三' })).toBe(true);
  });
  it('3级强度，自定义特殊字符2', () => {
    expect(isPassword('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '_一二三' })).toBe(false);
  });
})