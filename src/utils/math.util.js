/**
 * 参考: https://github.com/nefe/number-precision/blob/master/src/index.ts
 * 
 * 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from './constants';

/**
 * 是否为科学计数法数字
 * 
 * @param {String} num 检查值
 * @returns {Boolean}
 */
function isScientificNumber(num) {
  return /\d+\.?\d*e[\+\-]*\d+/i.test(num);
}

/**
 * 把错误的数据转正
 * 
 * @param {Number} num 输入数
 * @param {Number} [precision=12] 小数点的精度
 * @returns {Number}
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
 * @param {Number} num 输入数
 * @returns {Number} 小数点长度
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
 * @param {Number} num 输入数
 * @returns {Number}
 */
export function float2Fixed(num) {
  if (!isScientificNumber(num.toString())) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {Number} num 输入数
 * @returns {Boolean}
 */
export function checkBoundary(num) {
  if (+num > MAX_SAFE_INTEGER || +num < MIN_SAFE_INTEGER) {
    console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
  }
}