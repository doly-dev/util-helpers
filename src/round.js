import divide from './divide';
import times from './times';
import { isNumber, isString, isNaN } from './utils/type';

/**
 * 四舍五入，支持设置精度
 *
 * @static
 * @alias module:Math.round
 * @since 3.1.0
 * @param {number|string} num 要四舍五入的数字
 * @param {number} [precision=0] 四舍五入的精度
 * @returns {number} 四舍五入的数字
 * @example
 *
 * round(4.006);
 * // => 4
 *
 * round(4.006, 2);
 * // => 4.01
 *
 * round(4060, -2);
 * // => 4100
 */
function round(num, precision = 0) {
  // 兼容处理，如果参数为非数字或字符串时，直接返回
  if ((!isNumber(num) || isNaN(num)) && !isString(num)) {
    // @ts-ignore
    return num;
  }

  const base = Math.pow(10, precision);
  return divide(Math.round(times(num, base)), base);
}

export default round;
