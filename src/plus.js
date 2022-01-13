import { digitLength } from './utils/math.util';
import times from './times';
import { isNumber, isNaN, isString } from './utils/type';

/**
 * 精确加法，支持多个数相加
 *
 * @static
 * @alias module:Math.plus
 * @since 3.1.0
 * @param {...number|string} nums 相加的数
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
function plus(...nums) {
  const [num1, num2, ...rest] = nums;

  if (rest.length > 0) {
    return plus(plus(num1, num2), ...rest);
  }

  // 兼容处理，如果第2个参数为非数字或字符串时，返回第一个参数
  if ((!isNumber(num2) || isNaN(num2)) && !isString(num2)) {
    // @ts-ignore
    return num1;
  }

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

export default plus;
