/**
 * 参考: https://github.com/nefe/number-precision/blob/master/src/index.ts
 *
 * 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from './constants';
import devWarn from './devWarn';
import { isNumber, isString, isSymbol } from './type';

/**
 * 值是否为有效的数值
 * 
 * @deprecated 已废弃
 * @param {*} value 待检测的值
 * @returns {boolean} 是否为有效的数值
 */
export function isEffectiveNumeric(value = '') {
  if (isNumber(value) && !isNaN(value)) {
    return true;
  }

  // 避免空字符串 或 带空格的字符串
  if (isString(value)) {
    const fmtStrValue = value.trim();

    // 带空格的字符串也不转换数字
    // Number(' ') => 0
    if (fmtStrValue === value) {
      const numValue = fmtStrValue ? Number(fmtStrValue) : NaN;
      if (!isNaN(numValue)) {
        return true;
      }
    }
  }

  devWarn(`${value} is not a valid number.`);

  return false;
}

/**
 * 将值转换为有效数值
 * 
 * @param {*} value 要转换的值
 * @returns {number|string} 有效数值
 */
export function transformEffectiveNumber(value) {
  /** @type {string|number|undefined} */
  let ret;
  if (isString(value)) {
    ret = value.trim(); // ' 15'  ' 15  ' 兼容 Number(string) 处理

    if (ret === '') {
      ret = Number(ret);
    } else if (Number.isNaN(Number(ret))) { // string如果可以转换为number，默认不转换为number类型
      ret = Number.NaN;
    }
  } else if (isSymbol(value)) {
    ret = Number.NaN;
  } else if (!isNumber(value)) {
    // 其余非数字类型通过 Number 转换

    // 例如 Symbol 包装器对象将会报错
    // symObj = Object(Symbol());
    // Number(symObj); // TypeError: Cannot convert a Symbol value to a number
    try {
      ret = Number(value);
    } catch (err) {
      ret = Number.NaN;
      console.error(err);
    }
  } else {
    ret = value;
  }

  if (Number.isNaN(ret)) {
    return Number.NaN;
  }

  // @ts-ignore
  return ret;
}

/**
 * 是否为科学计数法数字
 *
 * @param {string} num 检查值
 * @returns {boolean}
 */
export function isScientificNumber(num) {
  return /\d+\.?\d*e[\+\-]*\d+/i.test(num);
}

/**
 * 把错误的数据转正
 *
 * @param {number} num 输入数
 * @param {number} [precision=12] 小数点的精度
 * @returns {number}
 * @example
 *
 *  strip(0.09999999999999998)=0.1
 */
export function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}

/**
 * 计算数字的小数点长度，支持科学记数法
 *
 * @param {number|string} num 输入数
 * @returns {number} 小数点长度
 */
export function digitLength(num) {
  // Get digit length of e
  const eSplit = num.toString().split(/e/i);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 *
 * @param {number|string} num 输入数
 * @returns {number}
 */
export function float2Fixed(num) {
  const strNum = String(num);
  if (!isScientificNumber(strNum)) {
    return Number(strNum.replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(+num * Math.pow(10, dLen)) : +num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {number} num 输入数
 * @returns
 */
export function checkBoundary(num) {
  if (+num > MAX_SAFE_INTEGER || +num < MIN_SAFE_INTEGER) {
    devWarn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
  }
}

/**
 * 去掉左边数字0
 *
 * @param {string} num 数字字符串
 * @returns {string}
 */
export function trimLeftZero(num) {
  const reg = /^([+-])?(0+)([0-9\.]+)$/;
  const result = reg.exec(num);

  let sign;

  if (result) {
    sign = result[1] || '';
    return sign + (result[3][0] === '.' ? '0' + result[3] : result[3]);
  }

  return num;
}

/**
 * 科学计数法转换成普通数字
 *
 * JavaScript在以下情景会自动将数值转换为科学计数法：
 *  1.小数点前的数字个数大于等于22位
 *  2.小数点前边是0，小数点后十分位（包含十分位）之后连续零的个数大于等于6个
 *
 * @param {string | number} num 科学计数法数字
 * @returns {string | number} 转换后的数字字符串
 */
export function scientificToNumber(num) {
  const strNum = String(num);

  if (!isScientificNumber(strNum)) {
    return num;
  }

  /** @type string */
  let ret;

  const zero = '0';
  const parts = strNum.toLowerCase().split('e');
  const e = parts.pop(); // 存储指数
  // @ts-ignore
  const l = Math.abs(e); // 取绝对值，l-1就是0的个数
  // @ts-ignore
  const sign = e / l; //判断正负
  const coeff_array = parts[0].split('.'); // 将系数按照小数点拆分

  // 如果是小数
  if (sign === -1) {
    // 整数部分
    const intVal = trimLeftZero(coeff_array[0]);

    // 整数部分大于科学计数后面部分
    // 如: 10e-1, 10.2e-1
    if (intVal.length > l) {
      const thanLen = intVal.length - l;
      const dec = coeff_array[1] || '';

      ret = intVal.slice(0, thanLen);

      // 处理 10e-1, 100e-1
      if (intVal.slice(thanLen) !== '0' || dec) {
        ret += '.' + intVal.slice(thanLen) + dec;
      }
    } else {
      // 整数部分小于等于科学计数后面部分
      // 如: 1e-1, 0.2e-1, 1.2e-2, 1.2e-1
      ret = zero + '.' + new Array(l - intVal.length + 1).join(zero) + coeff_array.join('');
    }
  } else {
    // 小数部分
    const dec = coeff_array[1] || '';

    // 如果是整数，将整数除第一位之外的非零数字计入位数，相应的减少0的个数
    if (l - dec.length < 0) {
      ret = trimLeftZero(coeff_array[0] + dec.substring(0, l)) + '.' + dec.substring(l);
    } else {
      // 拼接字符串，如果是整数，不需要拼接小数点
      ret = coeff_array.join('') + new Array(l - dec.length + 1).join(zero);
    }
  }

  return trimLeftZero(ret);
}

