import { isSymbol, isNaN } from 'ut2';

/**
 * 检测值是否为有效数值，支持隐式转换。如果返回 true ，表示可以通过 Number() 转为数字。
 *
 * @alias module:Validator.isValidNumber
 * @since 4.17.2
 * @param {*} value 待检测的值
 * @param {boolean} [strict=false] 严格模式，默认`false`。如果为 true ，仅支持字符串和数字类型，不处理其他类型隐式转换，且空字符串返回 false 。
 * @returns {boolean} 值是否为有效数值
 * @example
 *
 * isValidNumber(null); // true
 * isValidNumber(true); // true
 * isValidNumber(''); // true
 * isValidNumber(1234); // true
 * isValidNumber('1234'); // true
 * isValidNumber(' 1234 '); // true
 * isValidNumber(' 1234 '); // true
 *
 * isValidNumber(undefined); // false
 * isValidNumber('0.10.1'); // false
 *
 * // 严格模式
 * isValidNumber(null, true); // false
 * isValidNumber(true, true); // false
 * isValidNumber('', true); // false
 * isValidNumber(1234, true); // true
 * isValidNumber('1234', true); // true
 * isValidNumber(' 1234 ', true); // true
 * isValidNumber(' 1234 ', true); // true
 */
function isValidNumber(value: any, strict = false) {
  let ret: number;

  if (strict) {
    ret = typeof value === 'string' && value !== '' ? Number(value) : value;
  } else {
    if (typeof value === 'number') {
      ret = value;
    } else if (isSymbol(value)) {
      // 例如 Symbol 包装器对象将会报错
      // symObj = Object(Symbol());
      // Number(symObj); // TypeError: Cannot convert a Symbol value to a number
      ret = Number.NaN;
    } else {
      ret = Number(value);
    }
  }

  return typeof ret === 'number' && !isNaN(ret);
}

export default isValidNumber;
