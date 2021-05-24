import { config } from './utils/config';

const regNumber = /[\d]/;
const regLowerCaseLetter = /[a-z]/;
const regUpperCaseLetter = /[A-Z]/;
const regAllNumberAndLetter = /[\d|a-z]/ig;

/**
 * 是否包含数字
 * 
 * @private
 * @param {string} val 检查的值
 * @returns {boolean} 是否包含数字
 */
function hasNumber(val) {
  return regNumber.test(val);
}

/**
 * 是否包含小写字母
 * 
 * @private
 * @param {string} val 检测的值
 * @returns {boolean} 是否包含小写字母
 */
function hasLowerCaseLetter(val) {
  return regLowerCaseLetter.test(val);
}

/**
 * 是否包含大写字母
 * 
 * @private
 * @param {string} val 检测的值
 * @returns {boolean} 是否包含大写字母
 */
function hasUpperCaseLetter(val) {
  return regUpperCaseLetter.test(val);
}

/**
 * 是否为十六进制
 * 
 * @private
 * @param {string} val 检测的值
 * @returns {boolean} 是否为十六进制
 */
function hasHex(val) {
  return val.indexOf('\\x') > -1 || val.indexOf('\\u') > -1;
}

/**
 * 是否包含特殊字符
 * 
 * @private
 * @param {string} val 检测的值
 * @param {string} [chars] 特殊字符
 * @returns {boolean} 是否包含特殊字符
 */
function hasSpecialCharacter(val, chars = '') {
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

/**
 * 是否包含非法字符
 * 
 * @private
 * @param {string} val 检测的值
 * @param {string} chars 非法字符
 * @returns {boolean} 是否包含非法字符
 */
function hasUnallowableCharacter(val, chars = '') {
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
 * 验证密码（数字、大小写字母、特殊字符、非法字符）
 * 
 * @see 参考 {@link https://baike.baidu.com/item/ASCII#3|ASCII}
 * @static
 * @alias module:Validator.validatePassword
 * @since 3.7.0
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {number} [options.level=2] 密码强度 1-包含一种字符 2-包含两种字符 3-包含三种字符。（大写字母、小写字母、数字、特殊字符）
 * @param {boolean} [options.ignoreCase=false] 是否忽略大小写，为 ture 时，大小写字母视为一种字符
 * @param {string} [options.special="!@#$%^&*()-=_+[]\|{},./?<>~"] 支持的特殊字符
 * @returns 验证结果
 * @example
 * 
 * validatePassword('a12345678');
 * // => 
 * {
 *   validated: true, // 验证结果，根据密码强度、是否包含非法字符得出
 *   level: 2, // 强度级别
 *   containes: {
 *     number: true, // 包含数字
 *     lowerCaseLetter: true, // 包含小写字母
 *     upperCaseLetter: false, // 包含大写字母
 *     specialCharacter: false, // 包含特殊字符
 *     unallowableCharacter: false // 包含非法字符
 *   }
 * }
 * 
 * validatePassword('a12345678', {level: 3});
 * // => 
 * {
 *   validated: false,
 *   level: 2,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: false,
 *     specialCharacter: false,
 *     unallowableCharacter: false
 *   }
 * }
 * 
 * validatePassword('_Aa一二三45678', {level: 3, ignoreCase: true});
 * // => 
 * {
 *   validated: false,
 *   level: 3,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: true,
 *     specialCharacter: true,
 *     unallowableCharacter: true
 *   }
 * }
 * 
 * // 自定义特殊字符
 * validatePassword('_Aa一二三45678', {level: 3, ignoreCase: true, special: '_一二三'});
 * // => 
 * {
 *   validated: true,
 *   level: 3,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: true,
 *     specialCharacter: true,
 *     unallowableCharacter: false
 *   }
 * }
 */
function validatePassword(value, {
  level = 2,
  ignoreCase = false,
  special = "\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E"
} = {}) {
  let valStr = value;

  if (typeof value !== 'string') {
    if (!config.disableWarning) {
      console.warn(`[validatePassword] value must be a string.`);
    }
    valStr = '';
  }

  let currentLevel = 0;

  // 包含数字
  const containesNumber = hasNumber(valStr);
  // 包含小写字母
  const containesLowerCaseLetter = hasLowerCaseLetter(valStr);
  // 包含大写字母
  const containesUpperCaseLetter = hasUpperCaseLetter(valStr);
  // 包含特殊字符
  const containesSpecialCharacter = hasSpecialCharacter(valStr, special);
  // 包含非法字符
  const containesUnallowableCharacter = hasUnallowableCharacter(valStr, special);

  if (containesNumber) {
    currentLevel += 1;
  }

  if (ignoreCase) { // 不区分大小写
    if (containesLowerCaseLetter || containesUpperCaseLetter) {
      currentLevel += 1;
    }
  } else { // 区分大小写
    if (containesLowerCaseLetter) {
      currentLevel += 1;
    }
    if (containesUpperCaseLetter) {
      currentLevel += 1;
    }
  }

  if (containesSpecialCharacter) {
    currentLevel += 1;
  }

  // 验证结果
  const validated = currentLevel >= level && !containesUnallowableCharacter;

  return {
    validated,
    level: currentLevel,
    containes: {
      number: containesNumber,
      lowerCaseLetter: containesLowerCaseLetter,
      upperCaseLetter: containesUpperCaseLetter,
      specialCharacter: containesSpecialCharacter,
      unallowableCharacter: containesUnallowableCharacter
    }
  }
}

export default validatePassword;