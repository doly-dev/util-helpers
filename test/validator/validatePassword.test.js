import {
  expect
} from 'chai';

import validatePassword from '../../src/validatePassword';

function checkEqual(value, opts, equalObj) {
  const result = validatePassword(value, opts);
  // console.log(result);
  const { validated, level, containes } = equalObj;
  const { number, lowerCaseLetter, upperCaseLetter, specialCharacter, unallowableCharacter } = containes;

  expect(result.validated).to.be.equal(validated);
  expect(result.level).to.be.equal(level);
  expect(result.containes.number).to.be.equal(number);
  expect(result.containes.lowerCaseLetter).to.be.equal(lowerCaseLetter);
  expect(result.containes.upperCaseLetter).to.be.equal(upperCaseLetter);
  expect(result.containes.specialCharacter).to.be.equal(specialCharacter);
  expect(result.containes.unallowableCharacter).to.be.equal(unallowableCharacter);
}

describe('validatePassword', () => {
  it('非字符串', () => {
    checkEqual(true, {}, {
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
    checkEqual(1234, {}, {
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
  it('1级强度 "1234787"', () => {
    checkEqual('1234787', { level: 1 }, {
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
  });
  it('1级强度 "a1234787"', () => {
    checkEqual('a1234787', { level: 1 }, {
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
  });
  it('1级强度 "ab1234787"', () => {
    checkEqual('ab1234787', { level: 1 }, {
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
  });
  it('1级强度 "1a234787"', () => {
    checkEqual('1a234787', { level: 1 }, {
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
  });
  it('1级强度 "a1_234787"', () => {
    checkEqual('a1_234787', { level: 1 }, {
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
  it('1级强度 "abc"', () => {
    checkEqual('abc', { level: 1 }, {
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
  });
  it('1级强度 "*_ )"', () => {
    checkEqual('*_ )', { level: 1 }, {
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
  it('1级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`"', () => {
    checkEqual('!@#$%^&*()-=_+[]\|{},./?<>~`', { level: 1 }, {
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
  });
  it('2级强度 "!@#$%^&*()-=_+[]\|{},./?<>~`"', () => {
    checkEqual('!@#$%^&*()-=_+[]\|{},./?<>~`', { level: 2 }, {
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
  });

  it('2级强度 "a12345678"', () => {
    checkEqual('a12345678', { level: 2 }, {
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
  });
  it('2级强度 "a1_234787"', () => {
    checkEqual('a1_234787', { level: 2 }, {
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
  it('2级强度 "aa_234787"', () => {
    checkEqual('aa_234787', { level: 2 }, {
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

  it('3级强度 "a12345678"', () => {
    checkEqual('a12345678', { level: 3 }, {
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
  });
  it('3级强度，不忽略大小写 "Aa12345678"', () => {
    checkEqual('Aa12345678', { level: 3 }, {
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
  it('3级强度，忽略大小写 "Aa12345678"', () => {
    checkEqual('Aa12345678', { level: 3, ignoreCase: true }, {
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
  });
  it('3级强度，忽略大小写 "_Aa12345678" => true', () => {
    checkEqual('_Aa12345678', { level: 3, ignoreCase: true }, {
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
  });
  it('3级强度，非法字符 "_ Aa12345678"', () => {
    checkEqual('_ Aa12345678', { level: 3, ignoreCase: true }, {
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
  it('3级强度，非法字符 "_Aa一二三45678"', () => {
    checkEqual('_Aa一二三45678', { level: 3, ignoreCase: true }, {
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

  it('3级强度，自定义特殊字符1', () => {
    checkEqual('_Aa一二三45678', { level: 3, ignoreCase: true, special: '_一二三' }, {
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
  });
  it('3级强度，自定义特殊字符2', () => {
    checkEqual('_Aa一二三45678=', { level: 3, ignoreCase: true, special: '_一二三' }, {
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
})