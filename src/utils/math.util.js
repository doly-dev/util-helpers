/**
 * 参考: https://github.com/nefe/number-precision/blob/master/src/index.ts
 * 
 * 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from './constants';
import { config } from './config';

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
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * 
 * @param {number|string} num 输入数
 * @returns {number}
 */
export function float2Fixed(num) {
  if (!isScientificNumber(num.toString())) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip((+num) * Math.pow(10, dLen)) : +num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {number} num 输入数
 * @returns
 */
export function checkBoundary(num) {
  if (+num > MAX_SAFE_INTEGER || +num < MIN_SAFE_INTEGER) {
    if (!config.disableWarning) {
      console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
  }
}

/**
 * 去掉左边数字0
 * 
 * @param {string} num 数字字符串
 * @returns {string}
 */
function trimLeftZero(num) {
  const reg = /^([+-])?(0+)([1-9\.]+)$/;
  const result = reg.exec(num);

  let sign;

  if (result) {
    sign = result[1] || '';
    return sign + result[3];
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
 * @returns {string} 转换后的数字字符串
 */
export function scientificToNumber(num) {
  if (isScientificNumber(num.toString())) {
    const zero = '0';
    const parts = String(num).toLowerCase().split('e');
    const e = parts.pop(); // 存储指数
    // @ts-ignore
    const l = Math.abs(e); // 取绝对值，l-1就是0的个数
    // @ts-ignore
    const sign = e / l; //判断正负
    const coeff_array = parts[0].split('.');   // 将系数按照小数点拆分

    //如果是小数
    if (sign === -1) {
      //拼接字符串，如果是小数，拼接0和小数点
      num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    } else {
      const dec = coeff_array[1];

      //如果是整数，将整数除第一位之外的非零数字计入位数，相应的减少0的个数
      if (l - dec.length < 0) {
        num = trimLeftZero(coeff_array[0] + dec.substr(0, l)) + '.' + dec.substr(l);
      } else {
        //拼接字符串，如果是整数，不需要拼接小数点
        num = coeff_array.join('') + new Array(l - dec.length + 1).join(zero);
      }
    }
  }
  // @ts-ignore
  return num;
}