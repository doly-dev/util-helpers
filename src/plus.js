import { digitLength } from './utils/math.util';
import times from './times';

/**
 * 精确加法，支持多个数相加
 *
 * @static
 * @alias module:Math.plus
 * @since 3.1.0
 * @param {number|string} num1 相加的第一个数
 * @param {number|string} num2 相加的第二个数
 * @param {...number|string} others 相加的其余数
 * @returns {number} 总和
 * @example
 *
 * plus(0.1, 0.2);
 * // => 0.3
 *
 * plus(0.1, 0.2, 0.3);
 * // => 0.6
 *
 * plus(0.1, 0.2, 0.3, 0.4);
 * // => 1
 */
function plus(num1, num2, ...others) {
  if (others.length > 0) {
    // @ts-ignore
    return plus(plus(num1, num2), ...others);
  }
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

export default plus;
