import { validatePassword } from '../../src';

describe('validatePassword', () => {
  it('should be defined', () => {
    expect(validatePassword).toBeDefined();
  });

  it('非字符串', () => {
    // @ts-ignore
    expect(validatePassword(true)).toEqual({
      validated: false,
      level: 0,
      containes: {
        number: false,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    // @ts-ignore
    expect(validatePassword(1234)).toEqual({
      validated: false,
      level: 0,
      containes: {
        number: false,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
  });

  it('1级强度', () => {
    expect(validatePassword('1234787', { level: 1 })).toEqual({
      validated: true,
      level: 1,
      containes: {
        number: true,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('a1234787', { level: 1 })).toEqual({
      validated: true,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('ab1234787', { level: 1 })).toEqual({
      validated: true,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('1a234787', { level: 1 })).toEqual({
      validated: true,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('a1_234787', { level: 1 })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('abc', { level: 1 })).toEqual({
      validated: true,
      level: 1,
      containes: {
        number: false,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('!@#$%^&*()-=_+[]|{},./?<>~`', { level: 1 })).toEqual({
      validated: true,
      level: 1,
      containes: {
        number: false,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });

    // 非法字符
    expect(validatePassword('*_ )', { level: 1 })).toEqual({
      validated: false,
      level: 1,
      containes: {
        number: false,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: true
      }
    });
  });

  it('2级强度', () => {
    expect(validatePassword('!@#$%^&*()-=_+[]|{},./?<>~`', { level: 2 })).toEqual({
      validated: false,
      level: 1,
      containes: {
        number: false,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('a12345678', { level: 2 })).toEqual({
      validated: true,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('a1_234787', { level: 2 })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('aa_234787', { level: 2 })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
  });

  it('3级强度', () => {
    expect(validatePassword('a12345678', { level: 3 })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('Aa12345678', { level: 3 })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
  });

  it('忽略大小写', () => {
    expect(validatePassword('Aa12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 1,
      containes: {
        number: true,
        lowerCaseLetter: false,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('aa12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: false,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('AA12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: false,
        upperCaseLetter: true,
        specialCharacter: false,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('_Aa12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('_ Aa12345678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: true,
        unallowableCharacter: true
      }
    });
    expect(validatePassword('_Aa一二三45678', { level: 3, ignoreCase: true })).toEqual({
      validated: false,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: true,
        unallowableCharacter: true
      }
    });
  });

  it('自定义特殊字符', () => {
    expect(validatePassword('_Aa一二三45678', { level: 3, ignoreCase: true, special: '_一二三' })).toEqual({
      validated: true,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: true,
        unallowableCharacter: false
      }
    });
    expect(validatePassword('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '_一二三' })).toEqual({
      validated: false,
      level: 3,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: true,
        unallowableCharacter: true
      }
    });
    expect(validatePassword('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '四五六' })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: false,
        unallowableCharacter: true
      }
    });
    expect(validatePassword('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '' })).toEqual({
      validated: false,
      level: 2,
      containes: {
        number: true,
        lowerCaseLetter: true,
        upperCaseLetter: true,
        specialCharacter: false,
        unallowableCharacter: true
      }
    });
  });
});
