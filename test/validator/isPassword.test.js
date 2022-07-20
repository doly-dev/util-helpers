import { isPassword } from '../../src';

describe('isPassword', () => {
  it('should be defined', () => {
    expect(isPassword).toBeDefined();
  });

  it('incorrect', () => {
    expect(isPassword(true)).toBe(false);
    expect(isPassword(123)).toBe(false);
  });

  it('密码强度', () => {
    expect(isPassword('1234787', { level: 1 })).toBe(true);
    expect(isPassword('a1234787', { level: 1 })).toBe(true);
    expect(isPassword('ab1234787', { level: 1 })).toBe(true);
    expect(isPassword('1a234787', { level: 1 })).toBe(true);
    expect(isPassword('a1_234787', { level: 1 })).toBe(true);
    expect(isPassword('abc', { level: 1 })).toBe(true);
    expect(isPassword('*_ )', { level: 1 })).toBe(false);
    expect(isPassword('!@#$%^&*()-=_+[]|{},./?<>~`', { level: 1 })).toBe(true);
    expect(isPassword('!@#$%^&*()-=_+[]|{},./?<>~`', { level: 2 })).toBe(false);
    expect(isPassword('a12345678')).toBe(true);
    expect(isPassword('a1_234787')).toBe(true);
    expect(isPassword('aa_234787')).toBe(true);
    expect(isPassword('a12345678', { level: 3 })).toBe(false);
    expect(isPassword('Aa12345678', { level: 3 })).toBe(true);
  });

  it('忽略大小写', () => {
    expect(isPassword('Aa12345678', { level: 3, ignoreCase: true })).toBe(false);
    expect(isPassword('_Aa12345678', { level: 3, ignoreCase: true })).toBe(true);

    // 含非法字符
    expect(isPassword(' _Aa12345678', { level: 3, ignoreCase: true })).toBe(false);
    expect(isPassword('_Aa一二三45678', { level: 3, ignoreCase: true })).toBe(false);
  });

  it('自定义特殊字符', () => {
    expect(isPassword('_Aa一二三45678', { level: 3, ignoreCase: true, special: '_一二三' })).toBe(true);
    expect(isPassword('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '_一二三' })).toBe(false);
  });
});
