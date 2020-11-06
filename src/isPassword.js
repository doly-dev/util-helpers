const regNumber = /[\d]/;
const regLetter = /[a-z]/i;
const regLowerCaseLetter = /[a-z]/;
const regUpperCaseLetter = /[A-Z]/;
const regAllNumberAndLetter = /[\d|a-z]/ig;

// 是否包含数字
function hasNumber(val) {
  return regNumber.test(val);
}

// 是否包含小写字母
function hasLowerCaseLetter(val) {
  return regLowerCaseLetter.test(val);
}

// 是否包含大写字母
function hasUpperCaseLetter(val) {
  return regUpperCaseLetter.test(val);
}

// 是否包含大写字母
function hasLetter(val) {
  return regLetter.test(val);
}

// 是否为十六进制
function hasHex(val) {
  return val.indexOf('\\x') > -1 || val.indexOf('\\u') > -1;
}

// 是否包含特殊字符
function hasSpecial(val, chars = '') {
  if (!chars) {
    return false;
  }

  const specialChars = val.replace(regAllNumberAndLetter, '');
  const regChars = hasHex(chars) ? new RegExp(`[${chars}]`) : null;

  if (regChars) {
    return regChars.test(specialChars);
  }

  let ret = false;
  specialChars.split('').some((charItem) => {
    if (chars.indexOf(charItem) > -1) {
      ret = true;
    }
    return ret;
  });
  return ret;
}

// 是否包含非法字符
function hasDisabled(val, chars = '') {
  const specialChars = val.replace(regAllNumberAndLetter, '');

  if (!chars && specialChars) {
    return true;
  }

  const regChars = hasHex(chars) ? new RegExp(`[^${chars}]`) : null;
  if (regChars) {
    return regChars.test(specialChars);
  }
  let ret = false;
  specialChars.split('').some((charItem) => {
    if (chars.indexOf(charItem) === -1) {
      ret = true;
    }
    return ret;
  });
  return ret;
}

/**
 * 检测值是否符合密码强度
 * 注意该校验只校验是否存在不同字符(大小写字母、数字、特殊符号)，不判断长度
 * 
 * @see {@link https://baike.baidu.com/item/ASCII#3|ASCII}
 * @static
 * @alias module:Validator.isPassword
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @param {object} [options] 配置项
 * @param {number} [options.level=2] 密码强度 1-包含一种字符 2-包含两种字符 3-包含三种字符。（大写字母、小写字母、数字、特殊字符）
 * @param {boolean} [options.ignoreCase=false] 是否忽略大小写，为 ture 时，大小写字母视为一种字符
 * @param {string} [options.special=!@#$%^&*()-=_+[]\|{},./?<>~] 支持的特殊字符
 * @returns {boolean} 值是否符合密码强度
 * @example
 * 
 * isPassword('a12345678');
 * // => true
 * 
 * isPassword('a12345678', {level: 3});
 * // => false
 * 
 * isPassword('Aa12345678', {level: 3});
 * // => true
 * 
 * isPassword('Aa12345678', {level: 3, ignoreCase: true});
 * // => false
 * 
 * isPassword('_Aa12345678', {level: 3, ignoreCase: true});
 * // => true
 * 
 * // 仅支持 数字、字母、特殊字符，其他字符如中文字符是校验不通过的
 * isPassword('_Aa一二三45678', {level: 3, ignoreCase: true});
 * // => false
 * 
 * isPassword(' _Aa12345678', {level: 3, ignoreCase: true});
 * // => false
 */
function isPassword(value, {
  level = 2,
  ignoreCase = false,
  special = "\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E"
} = {}) {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  let currentLevel = 0;

  if (hasNumber(value)) {
    currentLevel += 1;
  }

  if (ignoreCase) { // 不区分大小写
    if (hasLetter(value)) {
      currentLevel += 1;
    }
  } else { // 区分大小写
    if (hasLowerCaseLetter(value)) {
      currentLevel += 1;
    }
    if (hasUpperCaseLetter(value)) {
      currentLevel += 1;
    }
  }

  if (hasSpecial(value, special)) {
    currentLevel += 1;
  }
  return currentLevel >= level && !hasDisabled(value, special);
}

export default isPassword;